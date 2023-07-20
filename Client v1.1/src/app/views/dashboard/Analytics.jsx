import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import ProjectTable from "./shared/ProjectTable";
import StatCards from "./shared/StatCards";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "0px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

//PARTNERS

const images = [
  {
    id: 1,
    src: "../assets/images/partners/add.png",
    imageUrl: "/addProject",
    title: "add",
    legende: "Add a New Project",
  },
  {
    id: 2,
    src: "../assets/images/partners/viewAll.png",
    imageUrl: "/projects",
    title: "view",
    legende: "View all Projects",
  },
  {
    id: 3,
    src: "../assets/images/partners/pcs.png",
    imageUrl: "https://www.pcsglobal.com",
    title: "ifm",
  },
  {
    id: 4,
    src: "../assets/images/partners/pcs.png",
    imageUrl: "https://www.pcsglobal.com",
    title: "schneider",
  },
  {
    id: 5,
    src: "../assets/images/partners/pride.png",
    imageUrl: "https://www.pridemilling.co.za/",
    title: "Image 5",
  },
  {
    id: 6,
    src: "../assets/images/partners/sas.png",
    imageUrl: "https://simplifiedas.co.za/",
    title: "Image 6",
  },
];

const Analytics = () => {
  const { palette } = useTheme();
  const [numberOfUsers, setNumberOfUsers] = useState([]);
  const getData = async () => {
    const { data } = await axios.get("http://localhost:4050/numberOfGuests");
    setNumberOfUsers(data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const [remainingTime, setRemainingTime] = useState("");
  useEffect(() => {
    // Set the target date to May 10, 2023 at 8:00 PM
    const targetDate = new Date("June 07, 2023 10:00:00").getTime();

    // Update the remaining time every second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Calculate days, hours, minutes, and seconds remaining
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format the remaining time as a string
      const remainingTimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setRemainingTime(remainingTimeString);

      // Stop the interval when the target date is reached
      if (distance < 0) {
        clearInterval(interval);
        setRemainingTime("Target date reached!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get the current date
  const [dateTime, setDateTime] = useState(new Date());

  // Format the current date as "Month Day, Year"
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <ContentBox
        className="analytics"
        sx={{
          m: 0,
          background: "linear-gradient(to right bottom, #FFF4F4, #F9F5F6)",
        }}
      >
        <Grid container spacing={3} sx={{ p: 2 }}>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: { xs: "16px", md: "32px" },
            }}
          >
            <img
              src="../assets/images/partners/dash1.png"
              alt="PCS"
              width="100%"
              height="auto"
              sx={{ maxWidth: { xs: "360px", md: "720px", lg: "100%" } }}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <StatCards
              remainingTime={remainingTime}
              currentDate={`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}
              numberOfClients={numberOfUsers}
            />

            {/* <H4>Ongoing Projects</H4>
            <RowCards /> */}
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid item key={image.id} xs={6} sm={6} md={4}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea
                      component="a"
                      href={image.imageUrl}
                      target="_blank"
                    >
                      <CardMedia
                        component="img"
                        height="112"
                        image={image.src}
                        alt={image.title}
                      />
                      <Typography
                        style={{ textAlign: "center", paddingBottom: 2 }}
                      >
                        {image.legende}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            {/* <AwardTable /> */}
          </Grid>

          <Grid item lg={12} md={8} sm={12} xs={12}>
            {/* <PrizeTable /> */}
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {/* <LeaderboardTable /> */}
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ProjectTable />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
