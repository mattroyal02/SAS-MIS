import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const user = {
  avatar: "/assets/images/pcs2.png",
};

const ProjectProfile = ({ currentProject }) => {
  return (
    currentProject && (
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
              {currentProject.data.name}
            </Typography>
            <Avatar
              src={user.avatar}
              sx={{
                height: 65,
                mb: 2,
                width: 285,
                borderRadius: "5%",
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h6">
              <span>Project Name: </span>
              <b>{currentProject.data.name}</b>
            </Typography>
            <Typography color="textSecondary" variant="body2">
              <span>PO Number: </span>

              <b>{currentProject.data.poNumber} </b>
            </Typography>

            <Typography color="textSecondary" variant="body1">
              <span>Voting Number: </span>
              <b>{`${currentProject.data.votingNumber}`}</b>
            </Typography>
            <Typography color="textSecondary" variant="body1">
              <span>Supplier Project Number: </span>
              <b>{currentProject.data.supplierProjectNumber}</b>
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
    )
  );
};

export default ProjectProfile;
