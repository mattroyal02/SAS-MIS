import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Table,
  Typography,
  styled,
} from "@mui/material";
import { GridCellModes } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: "white", fontSize: 15 },
  "& .icon": {
    opacity: 0.75,
    fontSize: "54px",
    color: "white",
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "24px",
  fontWeight: "500",
  color: "white",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  width: 1200,
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

function EditToolbar(props) {
  const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } =
    props;

  const handleSaveOrEdit = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    if (cellMode === "edit") {
      setCellModesModel({
        ...cellModesModel,
        [id]: {
          ...cellModesModel[id],
          [field]: { mode: GridCellModes.View },
        },
      });
    } else {
      setCellModesModel({
        ...cellModesModel,
        [id]: {
          ...cellModesModel[id],
          [field]: { mode: GridCellModes.Edit },
        },
      });
    }
  };

  const handleCancel = () => {
    if (!selectedCellParams) {
      return;
    }
    const { id, field } = selectedCellParams;
    setCellModesModel({
      ...cellModesModel,
      [id]: {
        ...cellModesModel[id],
        [field]: { mode: GridCellModes.View, ignoreModifications: true },
      },
    });
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
      }}
    >
      <Button
        onClick={handleSaveOrEdit}
        onMouseDown={handleMouseDown}
        disabled={!selectedCellParams}
        variant="outlined"
      >
        {cellMode === "edit" ? "Save" : "Edit"}
      </Button>
      <Button
        onClick={handleCancel}
        onMouseDown={handleMouseDown}
        disabled={cellMode === "view"}
        variant="outlined"
        sx={{ ml: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(["edit", "view"]).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};

const GameView = () => {
  let authInfo = useAuth();
  console.log("User Info", authInfo.user);
  const [data, setData] = useState([]);

  //Getting tokens (Level) from the DB to populate Grids
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/tokens");
    console.log("Hello", data);
    setData(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  //Getting number of users
  const [numberOfUsers, setNumberOfUsers] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNumberOfUsers = useCallback(async () => {
    const { data } = await axios.get("http://localhost:4050/users");
    console.log("Users :>> ", data);
    calculateUserRank(authInfo.user.id, data);
    setNumberOfUsers(data.length);
  });
  useEffect(() => {
    getNumberOfUsers();
  }, [getNumberOfUsers]);

  //Getting Rank of a user
  const [userRank, setUserRank] = useState(null);
  const calculateUserRank = (userId, users) => {
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    const userIndex = sortedUsers.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      const userRank = userIndex + 1;
      setUserRank(userRank);
    } else {
      setUserRank(null);
    }
  };

  useEffect(() => {
    getNumberOfUsers();
  }, [authInfo.user.id, getNumberOfUsers]);

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red", fontSize: "12px" }} aria-label="recipe">
            {authInfo.user.score}
          </Avatar>
        }
        action={
          <Link to={`/dashboard/default`}>
            <IconButton aria-label="more details">
              <Icon>open_in_new</Icon>
            </IconButton>
          </Link>
        }
        title={
          <Typography variant="h5" fontWeight="bold">
            {`My Score: ${authInfo.user.score} Points`}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >{`My Rank: ${userRank} out of ${numberOfUsers} participants`}</Typography>
        }
      />
      <Grid container spacing={3} sx={{ p: 2 }}>
        {data.map((item) => {
          const isDone = authInfo.user.tokens.some(
            (token) => token.id === item.id
          );
          return (
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StyledCard
                elevation={6}
                sx={{
                  background:
                    "linear-gradient(to right bottom, #110E2A, #2E389F)",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="auto"
                  image="/assets/images/xCGameCard.png"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ color: "white" }}
                  >
                    <Small>Level {item.id}</Small>
                  </Typography>
                  <Typography variant="body2" color="white">
                    {item.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  {isDone ? (
                    <Button variant="contained" color="success" size="small">
                      Completed
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" color="warning" size="small">
                        Pending
                      </Button>
                      <Link to={`/levels/${item.id}`} className="buyNow">
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          sx={{ m: 2 }}
                        >
                          Click here to Play
                        </Button>
                      </Link>
                    </>
                  )}
                </CardActions>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default GameView;
