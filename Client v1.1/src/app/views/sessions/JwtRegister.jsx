import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const useStyles = makeStyles({
  notchedOutline: {
    borderColor: "white !important",
  },
});

const JWTRegister = styled(JustifyBox)(() => ({
  background: "linear-gradient(to right bottom, #1A2038, #1A2038)",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
  first_name: "",
  surname: "",
  title: "",
  company_name: "",
  job_title: "",
  phone_number: "",
  remember: true,
};

const title = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Ms",
    label: "Ms",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "Dr",
    label: "Dr",
  },
  {
    value: "Prof",
    label: "Prof",
  },
];

const jobTitles = [
  {
    value: "Control Systems Engineer",
    label: "Control Systems Engineer",
  },
  {
    value: "Automation Engineer",
    label: "Automation Engineer",
  },
  {
    value: "System Integrators",
    label: "System Integrators",
  },
  {
    value: "Software Developer",
    label: "Software Developer",
  },
  {
    value: "Software Engineer",
    label: "Software Engineer",
  },
  {
    value: "HMI Developer",
    label: "HMI Developer",
  },
  {
    value: "MES Engineer",
    label: "MES Engineer",
  },
  {
    value: "PLC Programmer",
    label: "PLC Programmer",
  },
  {
    value: "Process Control Engineer",
    label: "Process Control Engineer",
  },
  {
    value: "Quality Control Engineer",
    label: "Quality Control Engineer",
  },
  {
    value: "Production Supervisor",
    label: "Production Supervisor",
  },
  {
    value: "Simulation Engineer",
    label: "Simulation Engineer",
  },
  {
    value: "Engineering Manager",
    label: "Engineering Manager",
  },
  {
    value: "CEO / CTO / CIO",
    label: "CEO or CTO or CIO",
  },
  {
    value: "Technical Director",
    label: "Technical Director",
  },
];

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  phoneNumber: Yup.string()
    .matches(
      /^(0)([1-9])(\d{8})$/,
      "Invalid phone number format. Please enter in format 0123456789."
    )
    .required("Phone number is required"),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const handleFormSubmit = (values) => {
    setLoading(true);

    try {
      register(
        values.email,
        values.password,
        values.title,
        values.firstname,
        values.surname,
        values.phoneNumber,
        values.companyName,
        values.jobTitle
      );
      navigate("/");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card
        className="card"
        sx={{
          background: "linear-gradient(to right bottom, #15A675, #022861)",
        }}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={10} xs={12} sx={{ display: "flex" }}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/xC23_3.png"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={12} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          type="email"
                          name="email"
                          label="Username/Email"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                          helperText={touched.email && errors.email}
                          error={Boolean(errors.email && touched.email)}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          name="password"
                          type="password"
                          label="Password"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                          helperText={touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          sx={{ mb: 2 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={2} xs={4}>
                        <TextField
                          fullWidth
                          size="small"
                          select
                          type="text"
                          name="title"
                          label="Title"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.title}
                          onChange={handleChange}
                          helperText={touched.title && errors.title}
                          error={Boolean(errors.title && touched.title)}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        >
                          {title.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item sm={10} xs={8}>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="firstname"
                          label="Firstname"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.firstname}
                          onChange={handleChange}
                          helperText={touched.firstname && errors.firstname}
                          error={Boolean(errors.firstname && touched.firstname)}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="surname"
                          label="Surname"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.surname}
                          onChange={handleChange}
                          helperText={touched.surname && errors.surname}
                          error={Boolean(errors.surname && touched.surname)}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          type="tel"
                          name="phoneNumber"
                          label="Phone Number"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          onChange={handleChange}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          error={Boolean(
                            errors.phoneNumber && touched.phoneNumber
                          )}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          name="companyName"
                          label="Company Name"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.companyName}
                          onChange={handleChange}
                          helperText={touched.companyName && errors.companyName}
                          error={Boolean(
                            errors.companyName && touched.companyName
                          )}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          select
                          size="small"
                          type="text"
                          name="jobTitle"
                          label="Job title / Role"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.jobTitle}
                          onChange={handleChange}
                          helperText={touched.jobTitle && errors.jobTitle}
                          error={Boolean(errors.jobTitle && touched.jobTitle)}
                          sx={{ mb: 3 }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        >
                          {jobTitles
                            .sort((a, b) => a.label.localeCompare(b.label))
                            .map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{
                          padding: 0,
                          "&.Mui-checked": {
                            color: "white",
                          },
                          "&.Mui-checked .MuiSvgIcon-root": {
                            color: "#89BE41",
                          },
                        }}
                      />

                      <Paragraph fontSize={13} sx={{ color: "white" }}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{
                        mb: 2,
                        mt: 3,
                        background: "#89BE41",
                        color: "white",
                      }}
                    >
                      Regiser
                    </LoadingButton>

                    <Paragraph sx={{ color: "white" }}>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{
                          color: "#89BE41",
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
          <Grid
            item
            sm={10}
            xs={12}
            sx={{ pt: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <JustifyBox
              p={1}
              height="100%"
              sx={{
                minWidth: 320,
                justifyContent: "center",
              }}
            >
              <a href="https://pcsglobal.com">
                <img src="/assets/images/poweredBy.png" width="70%" alt="" />
              </a>
            </JustifyBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
