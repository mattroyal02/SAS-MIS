import ContactUsForm from "./shared/ContactUsForm";
import React, { useEffect, useRef, useState } from "react";
import Heading from "./sections/headingPages/Heading";
import Specials from "./sections/headingPages/Specials";
import Testimonials from "./sections/headingPages/Testimonials";
import About from "./sections/headingPages/About";
import "./Styles.css";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import Layout1Sidenav from "../../components/MatxLayout/Layout1/Layout1Sidenav";
import Layout1Topbar from "../../components/MatxLayout/Layout1/Layout1Topbar";
import SidenavTheme from "../../components/MatxTheme/SidenavTheme/SidenavTheme";
import SecondarySidebar from "../../components/SecondarySidebar/SecondarySidebar";
import { sidenavCompactWidth, sideNavWidth } from "app/utils/constant";
import { MatxSuspense } from "app/components";
import useSettings from "app/hooks/useSettings";
import { ThemeProvider, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MovieCard from "./shared/BigCard";
import { SimpleSlider } from "./shared/SimpleSlider";
import {
  Avatar,
  Box,
  Card,
  Icon,
  Button,
  Paper,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Container,
  Collapse,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  CardHeader,
  Grid,
} from "@mui/material";

import { red } from "@mui/material/colors";
import { Fragment } from "react";

const Layout1Root = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
}));

const LayoutContainer = styled(Box)(({ width, secondarySidebar }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: width,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  marginRight: secondarySidebar.open ? 50 : 0,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Title = styled("span")(() => ({
  fontSize: "1.75rem",
  fontWeight: "600",
  marginRight: ".5rem",
  textTransform: "capitalize",
  padding: "1rem",
  color: "#9664a6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1.125rem",
  padding: "1rem",
  color: "#6473a6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const Slogan = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  padding: "1rem",
  color: "#9370DB",
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const AboutUsPage = () => {
  //SIDE TOP NAV BAR

  const { settings, updateSettings } = useSettings();
  const { layout1Settings, secondarySidebar } = settings;
  const topbarTheme = settings.themes[layout1Settings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout1Settings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case "full":
        return sideNavWidth;

      case "compact":
        return sidenavCompactWidth;

      default:
        return "0px";
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.layout1Settings.leftSidebar.mode;
    if (settings.layout1Settings.leftSidebar.show) {
      let mode = isMdScreen ? "close" : sidebarMode;
      updateSettings({ layout1Settings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <>
      <Layout1Root className={layoutClasses}>
        {showSidenav && sidenavMode !== "close" && (
          <SidenavTheme>
            <Layout1Sidenav />
          </SidenavTheme>
        )}

        <LayoutContainer
          width={sidenavWidth}
          secondarySidebar={secondarySidebar}
        >
          {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
            <ThemeProvider theme={topbarTheme}>
              <Layout1Topbar fixed={true} className="elevation-z8" />
            </ThemeProvider>
          )}

          {settings.perfectScrollbar && (
            <StyledScrollBar>
              {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                  <Layout1Topbar />
                </ThemeProvider>
              )}

              <Box flexGrow={1} position="relative">
                <MatxSuspense>
                  <Outlet />
                </MatxSuspense>
              </Box>

              {/* {settings.footer.show && !settings.footer.fixed && <Footer />} */}
            </StyledScrollBar>
          )}

          {!settings.perfectScrollbar && (
            <ContentBox>
              {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
                <ThemeProvider theme={topbarTheme}>
                  <Layout1Topbar />
                </ThemeProvider>
              )}
              {/* INSERT PAGE HERE */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card sx={{ m: 1, p: 1, alignItems: "center" }}>
                  <Title>About BIOCOM Africa </Title>
                  <div>
                    <SubTitle>
                      Taking the <b>SEARCH</b> out of <b>RESEARCH</b>
                    </SubTitle>
                  </div>
                </Card>

                <Card
                  sx={{
                    m: 1,
                    p: 1,
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card sx={{ maxWidth: 780 }}>
                      <CardMedia
                        component="img"
                        height="780"
                        width="800"
                        image="../assets/images/mission5.png"
                        alt=""
                        sx={{ objectFit: "contain" }}
                      />
                      {/* <CardMedia
                          component="img"
                          height="780"
                          image="../assets/images/mission4.png"
                          alt=""
                          sx={{ objectFit: "contain" }}
                        /> */}
                    </Card>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    m: 1,
                    p: 1,
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Card sx={{ maxWidth: 1200 }}>
                      <CardContent sx={{ m: 1, p: 1 }}>
                        <Title>Our Vision</Title>
                        <CardMedia
                          component="img"
                          height="780"
                          image="../assets/images/mission.png"
                          alt=""
                          sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              fontSize: "1.75rem",
                              fontWeight: "600",
                              marginRight: ".5rem",
                              textTransform: "capitalize",
                              padding: "1rem",
                              color: "#9664a6",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            Our Vision
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            We are committed to ensure that our customers should
                            receive the best products in the shortest possible
                            time to enable you to continue with expert research.
                            Additionally, we also strive to help with any
                            research related needs our customers might have.
                          </Typography>
                        </CardContent>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </Grid>

              {/* <Box flexGrow={1} position="relative">
                <MatxSuspense>
                  <Outlet />
                </MatxSuspense>
              </Box> */}

              <Box sx={{ mt: 4, p: 2 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ maxWidth: 500 }}>
                      <CardMedia
                        component="img"
                        height="auto"
                        image="https://via.placeholder.com/500x300"
                        alt="team"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Our Team
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed et mi nec lorem tincidunt molestie. Proin
                          eget justo venenatis, commodo sem ac, congue quam.
                          Pellentesque quis tellus blandit, sollicitudin enim
                          ac, semper ex. Morbi vel maximus magna eu semper
                          hendrerit. Nulla quis odio euismod, mollis sapien vel,
                          vestibulum ipsum. In vestibulum, nibh a gravida
                          interdum, mauris quam malesuada tellus, vel varius
                          magna tellus ac ipsum.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ maxWidth: 500 }}>
                      <CardMedia
                        component="img"
                        height="auto"
                        image="https://via.placeholder.com/500x500"
                        alt="ceo"
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          CEO
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed et mi nec lorem tincidunt molestie. Proin
                          eget justo venenatis, commodo sem ac, congue quam.
                          Pellentesque quis tellus blandit, sollicitudin enim
                          ac, semper exmaximus magna eu semper hendrerit. Nulla
                          quis odio euismod, mollis sapien vel, vestibulum
                          ipsum. In vestibulum, nibh a gravida interdum, mauris
                          quam malesuada tellus, vel varius magna tellus ac
                          ipsum.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
              {/* {settings.footer.show && !settings.footer.fixed && <Footer />} */}
            </ContentBox>
          )}

          {/* {settings.footer.show && settings.footer.fixed && <Footer />} */}
        </LayoutContainer>
        {settings.secondarySidebar.show && <SecondarySidebar />}
      </Layout1Root>
    </>
  );
};

export default AboutUsPage;

// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
//   Icon,
//   IconButton,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// import { Span } from "app/components/Typography";

// const StyledLink = styled(Link)({
//   textDecoration: "none",
//   color: "inherit",
// });

// const AboutUsPage = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           {
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2, display: { sm: "none" } }}
//               onClick={toggleMenu}
//             >
//               <MenuIcon />
//             </IconButton>
//           }
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             BIOCOM Africa
//           </Typography>
//           <StyledLink to="/home">
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ mr: 2, display: { xs: "none", md: "block" } }}
//             >
//               Home
//             </Typography>
//           </StyledLink>
//           <StyledLink to="/aboutUs">
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ mr: 2, display: { xs: "none", md: "block" } }}
//             >
//               About Us
//             </Typography>
//           </StyledLink>
//           <StyledLink to="/contactUs">
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ mr: 2, display: { xs: "none", md: "block" } }}
//             >
//               Contact Us
//             </Typography>
//           </StyledLink>
//           <StyledLink to="/session/signin">
//             <Icon>login</Icon>
//             {/* <Span sx={{ pl: 1, textTransform: "capitalize" }}>Login</Span> */}
//           </StyledLink>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
//         <List sx={{ width: "200px" }}>
//           <StyledLink to="/home">
//             <ListItem button onClick={toggleMenu}>
//               <ListItemIcon>
//                 <Icon>home</Icon>
//               </ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>
//           </StyledLink>
//           <StyledLink to="/aboutUs">
//             <ListItem button onClick={toggleMenu}>
//               <ListItemIcon>
//                 <Icon>info</Icon>
//               </ListItemIcon>
//               <ListItemText primary="About Us" />
//             </ListItem>
//           </StyledLink>
//           <StyledLink to="/contactUs">
//             <ListItem button onClick={toggleMenu}>
//               <ListItemIcon>
//                 <Icon>contact_mail</Icon>
//               </ListItemIcon>
//               <ListItemText primary="Contact Us" />
//             </ListItem>
//           </StyledLink>
//           <StyledLink to="/session/signin">
//             <ListItem button onClick={toggleMenu}>
//               <ListItemIcon>
//                 <Icon>login</Icon>
//               </ListItemIcon>
//               <ListItemText primary="Login" />
//             </ListItem>
//           </StyledLink>
//         </List>
//       </Drawer>
//       <Box sx={{ mt: 4, p: 2 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 component="img"
//                 height="auto"
//                 image="https://via.placeholder.com/500x300"
//                 alt="team"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Our Team
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//                   et mi nec lorem tincidunt molestie. Proin eget justo
//                   venenatis, commodo sem ac, congue quam. Pellentesque quis
//                   tellus blandit, sollicitudin enim ac, semper ex. Morbi vel
//                   maximus magna eu semper hendrerit. Nulla quis odio euismod,
//                   mollis sapien vel, vestibulum ipsum. In vestibulum, nibh a
//                   gravida interdum, mauris quam malesuada tellus, vel varius
//                   magna tellus ac ipsum.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card sx={{ maxWidth: 500 }}>
//               <CardMedia
//                 component="img"
//                 height="auto"
//                 image="https://via.placeholder.com/500x500"
//                 alt="ceo"
//                 sx={{ objectFit: "contain" }}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   CEO
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
//                   et mi nec lorem tincidunt molestie. Proin eget justo
//                   venenatis, commodo sem ac, congue quam. Pellentesque quis
//                   tellus blandit, sollicitudin enim ac, semper exmaximus magna
//                   eu semper hendrerit. Nulla quis odio euismod, mollis sapien
//                   vel, vestibulum ipsum. In vestibulum, nibh a gravida interdum,
//                   mauris quam malesuada tellus, vel varius magna tellus ac
//                   ipsum.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default AboutUsPage;
