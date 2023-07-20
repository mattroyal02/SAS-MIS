import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/images/img11.jpg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const AccountProfile = ({ currentUser }) => {
  console.log("current usr", currentUser);
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
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />

          <Typography color="textPrimary" gutterBottom variant="h5">
            {currentUser.usernname}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${currentUser.firstName} ${user.lastName}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.phoneNumber}
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
