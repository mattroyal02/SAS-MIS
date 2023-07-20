import { makeStyles } from "@material-ui/core";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";
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
const Top3AwardTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/users");
    // console.log("Hello", data);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  // const sortedData = data.sort((a, b) => b.score - a.score);

  const rows = data.map((row, index) => {
    return {
      id: index + 1,
      names: `${row.first_name} ${row.surname}`,
      score: row.score,
    };
  });

  return (
    <Grid container spacing={2}>
      {/* First Row */}
      <Grid item xs={12} sm={12}>
        <Grid container justifyContent="center">
          <Grid item>
            {/* Content of the first column */}
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="../assets/images/xC_1st.png"
                title="1st"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {rows[0]?.names}
                </Typography>
                <Typography variant="body2" color="black">
                  Leading the race
                </Typography>
                <Typography variant="body2" color="black">
                  Score: {rows[0]?.score} Points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* Content of the second column */}
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="../assets/images/xC_2nd.png"
                title="2nd"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {rows[1]?.names}
                </Typography>
                <Typography variant="body2" color="black">
                  Runner Up
                </Typography>
                <Typography variant="body2" color="black">
                  Score: {rows[1]?.score} Points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            {/* Content of the third column */}
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="../assets/images/xC_3rd.png"
                title="3rd"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {rows[2]?.names}
                </Typography>
                <Typography variant="body2" color="black">
                  Third Place
                </Typography>
                <Typography variant="body2" color="black">
                  Score: {rows[2]?.score} Points
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Top3AwardTable;
