import { makeStyles } from "@material-ui/core";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./index.css";

const useStyles = makeStyles({
  footer: {
    color: "white",
  },
});

const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1.8rem",
  fontWeight: "800",
  textTransform: "capitalize",
  color: "white",
}));
const PrizeTable = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/users");
    // console.log("Hello", data);
    setData(data);
  };
  useEffect(() => {
    getData();
    const socket = io("http://localhost:4050");
    socket.on("done", (arg) => {
      console.log("atrempt done", arg);
      getData();
    });
  }, []);

  const columns = [
    {
      field: "id",
      flex: 1,
      headerName: "Rank",
      width: 20,
      headerClassName: "header",
    },
    {
      field: "names",
      headerName: "Name(s)",
      width: 100,
      flex: 1,
      headerClassName: "header",
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "score",
      flex: 1,
      headerName: "Score",
      description: "Cummulative score.",
      // width: 80,
      sortable: true,
      renderCell: (params) => (
        <Button variant="contained" color="success" size="medium">
          {params.value}
        </Button>
      ),
      headerClassName: "header",
    },
  ];

  const sortedData = data.sort((a, b) => b.score - a.score);

  const rows = sortedData.map((row, index) => {
    return {
      id: index + 1,
      names: `${row.first_name} ${row.surname}`,
      score: row.score,
    };
  });

  return (
    <Card
      elevation={3}
      sx={{
        pt: "20px",
        backgroundImage: "linear-gradient(to bottom, #1C105C, #110830)",
        opacity: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardHeader>
        <Title>Prizes & Gifts</Title>
      </CardHeader>

      <Grid
        container
        spacing={2}
        sx={{
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          lg={4}
          md={4}
          sm={10}
          xs={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: { xs: "2px", md: "32px" },
          }}
        >
          <img
            src="../assets/images/prizes/prize1.png"
            alt="PCS"
            width="100%"
            height="auto"
            sx={{ maxWidth: { xs: "360px", md: "720px", lg: "100%" } }}
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          sm={10}
          xs={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: { xs: "2px", md: "32px" },
          }}
        >
          <img
            src="../assets/images/prizes/prize2.png"
            alt="PCS"
            width="100%"
            height="auto"
            sx={{ maxWidth: { xs: "360px", md: "720px", lg: "100%" } }}
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          sm={10}
          xs={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: { xs: "2px", md: "32px" },
          }}
        >
          <img
            src="../assets/images/prizes/prize3.png"
            alt="PCS"
            width="100%"
            height="auto"
            sx={{ maxWidth: { xs: "360px", md: "720px", lg: "100%" } }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrizeTable;
