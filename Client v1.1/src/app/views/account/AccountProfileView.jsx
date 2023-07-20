import { Box, Grid } from "@mui/material";
import useAuth from "app/hooks/useAuth";
import AccountProfile from "./components/account-profile";
import AccountProfileDetails from "./components/account-profile-details";
import { Container } from "./styles";
import "./styles.css";

function App() {
  let authInfo = useAuth();
  console.log("authInfo.user :>> ", authInfo.user);

  return (
    <Container>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          px: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={10} md={10} xs={12}>
              <AccountProfile currentUser={authInfo.user} />
            </Grid>
            <Grid item lg={10} md={10} xs={12}>
              <AccountProfileDetails user={authInfo.user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}

export default App;
