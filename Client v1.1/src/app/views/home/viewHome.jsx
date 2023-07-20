import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  Icon,
  IconButton,
  ThemeProvider,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MatxSuspense } from "app/components";
import useSettings from "app/hooks/useSettings";
import { sideNavWidth, sidenavCompactWidth } from "app/utils/constant";
import React, { useEffect, useRef, useState } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { Link, Outlet } from "react-router-dom";
import Layout1Sidenav from "../../components/MatxLayout/Layout1/Layout1Sidenav";
import Layout1Topbar from "../../components/MatxLayout/Layout1/Layout1Topbar";
import SidenavTheme from "../../components/MatxTheme/SidenavTheme/SidenavTheme";
import SecondarySidebar from "../../components/SecondarySidebar/SecondarySidebar";
import "./Styles.css";
import { SimpleSlider } from "./shared/SimpleSlider";

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

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

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
  fontSize: "2rem",
  fontWeight: "800",
  marginRight: ".5rem",
  textTransform: "capitalize",
  padding: "1rem",
  color: "Purple",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1.475rem",
  padding: "1rem",
  color: theme.palette.text.secondary,
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

const Analytics = () => {
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

  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };

  const [selectedMovie, setSelectedMovie] = useState(-1);

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
              <Fragment>
                <ContentBox className="analytics">
                  <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Card sx={{ m: 2 }}>
                        <Grid container rowSpacing={1} sx={{ m: 2 }}>
                          <Grid item lg={3} md={3} sm={6} xs={6} sx={{ m: 2 }}>
                            <SubTitle>Welcome to</SubTitle>
                            <div>
                              <Title>BIOCOM biotech</Title>
                            </div>
                            <div>
                              <Slogan>
                                "taking the <b>SEARCH</b> out of <b>RESEARCH</b>
                                "
                              </Slogan>
                            </div>
                          </Grid>
                          <Grid item lg={4} md={4} sm={8} xs={8} sx={{ m: 1 }}>
                            <CardMedia
                              component="img"
                              height="130"
                              image="./assets/images/biocom1.png"
                              alt="Paella dish"
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          columnSpacing={2}
                          rowSpacing={2}
                          sx={{ m: 2 }}
                        >
                          <Grid
                            item
                            lg={8}
                            md={8}
                            sm={8}
                            xs={8}
                            display="flex"
                            justifyContent="left"
                            alignItems="center"
                            // sx={{ bgcolor: "red" }}
                          >
                            <Card sx={{ maxWidth: 1000 }}>
                              <div className="des">
                                <div className="description">
                                  We believe that you should receive the best
                                  products in the shortest possible time to
                                  enable you to continue with your research. We
                                  strive to find the best solution for your
                                  application and to "take the search out of
                                  research". Search your product with our new
                                  search engine, or browse our product groups
                                  for information and articles for your
                                  application. Should you not be able to find
                                  the product you are interested in, please
                                  contact us and and we will find it for you!
                                </div>
                              </div>
                            </Card>
                          </Grid>
                          <Grid
                            item
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            sx={{ m: 1 }}
                            justifyContent="center"
                            alignItems="center"
                          >
                            <div centering>
                              <Card sx={{ m: 2, bgcolor: "#7664a6" }}>
                                <CardContent sx={{ textAlign: "center" }}>
                                  <Typography color="white">
                                    Get in touch with us?
                                  </Typography>
                                </CardContent>
                                <Box
                                  sx={{
                                    m: 1,
                                    color: "white",
                                    alignItems: "center",
                                    justify: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <Link to={`/contactUs`}>
                                    <Button
                                      variant="outlined"
                                      color="inherit"
                                      sx={{
                                        m: 1,
                                        color: "white",
                                      }}
                                    >
                                      <Icon>phone</Icon>
                                      Please click here
                                    </Button>
                                  </Link>
                                </Box>
                                <CardContent sx={{ textAlign: "center" }}>
                                  <Typography color="white">
                                    We will contact you shortly.
                                  </Typography>
                                </CardContent>
                              </Card>
                            </div>
                          </Grid>
                        </Grid>

                        <Card sx={{ p: 2, m: 2 }}>
                          <SimpleSlider />
                          <h1 />
                          {selectedMovie !== -1 && (
                            <SimpleSlider initialSlide={selectedMovie} />
                          )}
                        </Card>
                        <Grid
                          container
                          rowSpacing={1}
                          sx={{ m: 2, bgcolor: "#9664a6" }}
                        >
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            // sx={{ bgcolor: "lightGrey" }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Card
                              sx={{ maxWidth: 380, m: 1, bgcolor: "white" }}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="recipe"
                                    sx={{
                                      bgcolor: "lightgray",
                                      width: 200,
                                      height: 120,
                                    }}
                                    alt="Cape Bio Pharm"
                                    src="../assets/images/capeBioPharm1.png"
                                  ></Avatar>
                                }
                                action={
                                  <IconButton
                                    aria-label="settings"
                                    href="http://www.capebiopharms.com/commercial"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="info"
                                  >
                                    <Icon>open_in_new</Icon>
                                  </IconButton>
                                }
                                title="Discover"
                                subheader="Cape Bio Pharms"
                              />
                              <CardMedia
                                component="img"
                                height="200"
                                image="./assets/images/capeBio.png"
                                alt="Paella dish"
                              />
                              <CardContent>
                                <Typography variant="body2" color="black">
                                  Cape Bio Pharms is an exciting new (ad)venture
                                  based in Cape Town, South Africa. We are a
                                  spin-off company of the University of Cape
                                  Town aimed at commercialising the biotech
                                  developed by the Biopharming Research Unit
                                  (BRU) for the production of recombinant
                                  proteins in tobacco.
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <Button
                                  href="http://www.capebiopharms.com/commercial"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  mb={0}
                                  variant="outlined"
                                  gutterBottom
                                  sx={{ m: 1 }}
                                >
                                  <Icon>language</Icon> Visit Website
                                </Button>
                                <ExpandMore
                                  expand={expanded}
                                  onClick={handleExpandClick}
                                  aria-expanded={expanded}
                                  aria-label="show more"
                                  color="secondary"
                                >
                                  <Icon sx={{ color: "info" }}>
                                    expand_more
                                  </Icon>
                                </ExpandMore>
                              </CardActions>
                              <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                              >
                                <CardContent>
                                  <Typography paragraph color="black">
                                    <b>CapeBioPharms Story:</b>
                                  </Typography>
                                  <Typography paragraph color="black">
                                    All of our antibodies are recombinantly made
                                    via transient expression in plants. Each
                                    antibody can be customised with your choice
                                    of rabbit, human or rat backbone as well as
                                    fusion to either HRP or eGFP.
                                  </Typography>
                                  <Typography paragraph color="black">
                                    Our product pipeline focuses on a wide range
                                    of research reagents such as antibodies,
                                    fusion proteins, peptides and enzymes. All
                                    are critical research tools for life
                                    scientists around the world in search of new
                                    drugs to treat the onslaught of human and
                                    animal diseases.
                                  </Typography>
                                  <Typography paragraph color="black">
                                    Our Custom Protein Service offers life
                                    scientists the opportunity of 'doing it in
                                    plants'. Plant-based expressions allows us
                                    to quickly and economically produce
                                    proof-of-concept trials from microgram to
                                    gram quantities. 'Doing it in plants' is an
                                    ethical alternative as we do not use animals
                                    in the making of our antibodies.
                                  </Typography>

                                  <Typography color="black">
                                    Our team is a passionate group of
                                    postgraduates from multiple disciplines such
                                    as Molecular & Cell Biology, Medical
                                    Biochemistry and Human and Cell Biology.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                            </Card>
                          </Grid>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Card
                              sx={{ maxWidth: 380, m: 1, bgcolor: "white" }}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="recipe"
                                    sx={{
                                      bgcolor: "lightgray",
                                      width: 200,
                                      height: 120,
                                    }}
                                    alt="ABCAM"
                                    src="../assets/images/biolegendLogo.png"
                                  >
                                    R
                                  </Avatar>
                                }
                                action={
                                  <IconButton
                                    aria-label="settings"
                                    color="info"
                                    href="https://www.biolegend.com/en-us/kiravia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Icon>open_in_new</Icon>
                                  </IconButton>
                                }
                                title="Discover the new"
                                subheader="BioLegend"
                              />
                              <CardMedia
                                component="img"
                                height="194"
                                image="../assets/images/bioLegendHome.jpg"
                                alt="Paella dish"
                              />
                              <CardContent>
                                <Typography variant="body2" color="black">
                                  BioLegend is the leader in creating complete
                                  research solutions for immunologists. We
                                  provide expert and personalized technical
                                  support for experimental design, while
                                  developing specialized tools to isolate,
                                  immunophenotype, and characterize target cell
                                  populations.
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <Button
                                  href="https://www.biolegend.com/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  mb={0}
                                  variant="outlined"
                                  gutterBottom
                                  sx={{ m: 1, bgcolor: "auto" }}
                                >
                                  <Icon>language</Icon> Visit Website
                                </Button>
                                <ExpandMore
                                  expand={expanded2}
                                  onClick={handleExpandClick2}
                                  aria-expanded={expanded2}
                                  aria-label="show more"
                                  color="secondary"
                                >
                                  <Icon sx={{ color: "info" }}>
                                    expand_more
                                  </Icon>
                                </ExpandMore>
                              </CardActions>
                              <Collapse
                                in={expanded2}
                                timeout="auto"
                                unmountOnExit
                              >
                                <CardContent>
                                  <Typography paragraph color="black">
                                    <b>
                                      A Sparkling Advancement for Flow
                                      Cytometry:
                                    </b>
                                  </Typography>
                                  <Typography paragraph color="balck">
                                    Introducing the KIRAVIA Dyes™, a brand new
                                    fluorescent chemistry to advance
                                    applications in multicolor flow cytometry
                                    and beyond. KIRAVIA is a coined term meaning
                                    "sparkling" in Japanese. KIRAVIA Blue 520™
                                    is the first in a new family of
                                    fluorophores. This class of dyes employs a
                                    unique organic backbone that separates
                                    fluorophores to minimize quenching effects,
                                    thus allowing optimal and higher fluorophore
                                    to protein (F:P) ratios, surpassing what is
                                    possible with direct conjugations of single
                                    fluorophores like FITC.
                                  </Typography>
                                  <Typography paragraph color="black">
                                    KIRAVIA Blue 520™ is bright, on par with BD
                                    Horizon™ BB515 and, on average, is twice as
                                    bright as a FITC conjugate. KIRAVIA Blue
                                    520™ can be used for cell surface,
                                    intracellular, and intranuclear antigens. It
                                    can be used to detect antigens with a
                                    variety of abundance levels, but it would
                                    ideally be saved for an antigen with
                                    ubiquitous and/or variable expression levels
                                    in the sample, specifically when used in
                                    complex multicolor panels (e.g. activation
                                    markers like CD25 and CD127).
                                  </Typography>
                                  <Typography paragraph color="black">
                                    KIRAVIA Blue 520™ shows utility with most
                                    BioLegend fixation buffers. Similar to some
                                    fluorophores, KIRAVIA Blue 520™ can be
                                    sensitive to the nuclear permeabilization
                                    and fixation process if used as a surface
                                    stain conjugate. While a decrease in the
                                    MFI+ signal was observed when staining with
                                    the FITC and KIRAVIA Blue 520™ conjugates,
                                    the positive population could still be
                                    resolved easily. When building panels in
                                    these circumstances, the ability of a
                                    fluorophore conjugate to survive the
                                    fixation/permeabilization process will
                                    depend on the level of antigen expression
                                    and the sample type.
                                  </Typography>
                                  <Typography paragraph color="black">
                                    Fluorophores can be exposed to a variety of
                                    conditions during the course of a flow
                                    cytometry experiment. In the data that
                                    follows, we provide useful information on
                                    how heat, light, and fixative can affect the
                                    performance of KIRAVIA Blue 520™.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                            </Card>
                          </Grid>
                          <Grid
                            item
                            lg={4}
                            md={4}
                            sm={12}
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Card
                              sx={{ maxWidth: 380, m: 3, bgcolor: "white" }}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="recipe"
                                    sx={{
                                      width: 200,
                                      height: 120,
                                      bgcolor: "lightgray",
                                    }}
                                    alt="ABCAM"
                                    src="../assets/images/thermofisherLogo.png"
                                  >
                                    R
                                  </Avatar>
                                }
                                action={
                                  <IconButton
                                    aria-label="settings"
                                    color="info"
                                    href="https://www.thermofisher.com/za/en/home/life-science/antibodies/immunoassays/procartaplex-assays-luminex/procartaplex-immunoassays.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Icon>open_in_new</Icon>
                                  </IconButton>
                                }
                                title="Discover"
                                subheader="ProcartaPlex Immunoassays"
                              />
                              <CardMedia
                                component="img"
                                height="200"
                                image="./assets/images/thermo.png"
                                alt="Paella dish"
                              />
                              <CardContent>
                                <Typography variant="body2" color="black">
                                  Invitrogen ProcartaPlex immunoassays are
                                  antibody-based, magnetic bead reagent kits and
                                  panels for multiplex protein quantitation
                                  using the Luminex instrument platform.
                                </Typography>
                              </CardContent>
                              <CardActions disableSpacing>
                                <Button
                                  href="https://www.thermofisher.com/za/en/home/life-science/antibodies/immunoassays/procartaplex-assays-luminex/procartaplex-immunoassays.html"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  mb={0}
                                  variant="outlined"
                                  gutterBottom
                                  sx={{ m: 1 }}
                                >
                                  <Icon>language</Icon> Visit Website
                                </Button>
                                <ExpandMore
                                  expand={expanded3}
                                  onClick={handleExpandClick3}
                                  aria-expanded={expanded3}
                                  aria-label="show more"
                                >
                                  <Icon sx={{ color: "black" }}>
                                    expand_more
                                  </Icon>
                                </ExpandMore>
                              </CardActions>
                              <Collapse
                                in={expanded3}
                                timeout="auto"
                                unmountOnExit
                              >
                                <CardContent>
                                  <Typography paragraph color="black">
                                    Method:
                                  </Typography>
                                  <Typography paragraph>
                                    Select from 90+ preconfigured multiplex
                                    panels (2- to 80-plex), or blend singleplex
                                    kits to create custom multiplex assays.
                                  </Typography>
                                  <Typography paragraph color="white">
                                    The assays cover more than 600 cytokines,
                                    chemokines, growth factors, and other
                                    protein targets from human, mouse, rat,
                                    non-human primate, canine, and other
                                    species.
                                  </Typography>
                                  <Typography paragraph color="white">
                                    Add rice and stir very gently to distribute.
                                    Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid
                                    is absorbed, 15 to 18 minutes. Reduce heat
                                    to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice,
                                    and cook again without stirring, until
                                    mussels have opened and rice is just tender,
                                    5 to 7 minutes more. (Discard any mussels
                                    that don&apos;t open.)
                                  </Typography>
                                  <Typography color="white">
                                    Set aside off of the heat to let rest for 10
                                    minutes, and then serve.
                                  </Typography>
                                </CardContent>
                              </Collapse>
                            </Card>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                    {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                      {<UpgradeCard />}
                    </Grid> */}
                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TopSellingTable />
                    </Grid> */}
                  </Grid>
                </ContentBox>
              </Fragment>
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

export default Analytics;
