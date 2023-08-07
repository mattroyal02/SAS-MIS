import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const useStyles = makeStyles({
  notchedOutline: {
    borderColor: "white !important",
  },
});

const JWTRoot = styled(JustifyBox)(() => ({
  background: "linear-gradient(to right bottom, #012E0C, #012E0C)",
  minHeight: "100% !important",
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
  email: "mattheus.royal@gmail.com",
  password: "Testing123#@!",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card
        className="card"
        sx={{
          background: "linear-gradient(to right bottom, #15A675, #022861)",
        }}
      >
        <Grid container sx={{ color: "white" }}>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/pmcRound.png" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
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
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
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
                      sx={{ mb: 1.5, color: "white" }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                        classes: { notchedOutline: classes.notchedOutline },
                      }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
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
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          InputProps={{
                            style: { color: "white" },
                            classes: { notchedOutline: classes.notchedOutline },
                          }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: "red" }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2, background: "#89BE41" }}
                    >
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{
                          color: "#89BE41",
                          marginLeft: 5,
                        }}
                        sx={{
                          padding: 0,
                          "&.Mui-checked": {
                            color: "white",
                          },
                          "&.Mui-checked .MuiSvgIcon-root": {
                            color: "red",
                          },
                        }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                    <Grid item sm={12} xs={12} sx={{ pt: 2 }}>
                      <JustifyBox
                        p={1}
                        height="100%"
                        sx={{
                          minWidth: 320,
                          justifyContent: "center",
                        }}
                      >
                        <a href="https://simplifiedas.co.za">
                          <img
                            src="/assets/images/sas2.png"
                            width="70%"
                            alt=""
                          />
                        </a>
                      </JustifyBox>
                    </Grid>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
