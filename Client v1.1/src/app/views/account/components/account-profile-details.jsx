import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import useAuth from "app/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
const AccountProfileDetails = ({
  first_name,
  surname,
  email,
  title,
  phone_number,
  company_name,
  job_title,
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [values, setValues] = useState({
    first_name: user.first_name,
    surname: user.surname,
    email: user.email,
    title: user.title,
    phone_number: user.phone_number,
    company_name: user.company_name,
    job_title: user.job_title,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4050/users/${user.id}`, values);
      setOpen(true);
    } catch (error) {
      console.error("Update failed:", error);
    }
    console.log("Update here");
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onError={() => null}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your title"
                label="Title"
                name="title"
                onChange={handleChange}
                required
                value={values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the First name"
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="surname"
                helperText="Please specify the Last name"
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                onChange={handleChange}
                type="number"
                value={values.phone_number}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                onChange={handleChange}
                required
                value={values.job_title}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Company / Organisation"
                name="company_name"
                onChange={handleChange}
                required
                value={values.company_name}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Updated successfully
            </Alert>
          </Collapse>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
