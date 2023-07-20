import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/images/pcsRoundLogo.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const AccountProfile = ({ currentUser }) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="textPrimary" gutterBottom variant="h4">
            My Account
          </Typography>
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />

          <Typography color="textPrimary" gutterBottom variant="h6">
            {`${currentUser.title} ${currentUser.first_name} ${currentUser.surname}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {currentUser.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {currentUser.phone_number}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {currentUser.job_title}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {currentUser.company_name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      {/* <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default AccountProfile;
