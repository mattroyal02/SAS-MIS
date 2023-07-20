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
import data from "./shared/mock.json";
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
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1.125rem",
  padding: "1rem",
  color: "#6473a6",
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
                <Card sx={{ m: 2, p: 2 }}>
                  <Title>Any query ? </Title>
                  <div>
                    <SubTitle>
                      Please fill up this short form we will contact shortly
                    </SubTitle>
                  </div>

                  <ContactUsForm />
                </Card>
              </Grid>

              <Box flexGrow={1} position="relative">
                <MatxSuspense>
                  <Outlet />
                </MatxSuspense>
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
