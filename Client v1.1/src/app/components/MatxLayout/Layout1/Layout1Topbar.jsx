import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { MatxMenu } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { topBarHeight } from "app/utils/constant";
import React from "react";
import { Link } from "react-router-dom";
import { Span } from "../../../components/Typography";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "transparent", // Set the background color to transparent
  },
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  console.log("user :>> ", user);
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
          <StyledIconButton to="/home">
            <img src="../assets/images/pcs2.png" alt="" width="100px" />
          </StyledIconButton>

          {/* <img
            src="../assets/images/xC23_3.png"
            alt="Loading..."
            // height="72px"
            width="160px"
          /> */}
          {/* <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox> */}
        </Box>

        <Box display="flex" alignItems="center">
          {/* <MatxSearchBox /> */}

          {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider> */}

          {/* <ShoppingCart /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                {user ? (
                  <>
                    <Hidden xsDown>
                      <Span>
                        Hi <strong>{user.first_name}</strong>
                      </Span>
                    </Hidden>
                    <Avatar
                      src="/assets/images/pmcRound.png"
                      sx={{ cursor: "pointer" }}
                    />
                  </>
                ) : (
                  <>
                    <Hidden xsDown>
                      <StyledItem>
                        <Link to={`/session/signin`}>
                          <Icon> login </Icon>
                          <strong>Signin/ Registers</strong>
                        </Link>
                      </StyledItem>
                    </Hidden>

                    <Avatar
                      src="/assets/images/pcsRoundLogo.png"
                      sx={{ cursor: "pointer" }}
                    />
                  </>
                )}
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/home">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);
