import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Paragraph } from "app/components/Typography";
import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

const Title = styled("span")(() => ({
  fontSize: "1.25rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  notchedOutline: {
    borderColor: "white !important",
  },
});

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

// inital login credentials
const initialValues = {
  tokenCode: "00000000",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  tokenCode: Yup.string()
    .matches(
      /^\d{8}$/,
      "Invalid token format. Please enter 8 digit, Eg: 01234567."
    )
    .required("8 digit token is required"),
});

const ReportView = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { ReportId } = useParams();
  const classes = useStyles();
  let authInfo = useAuth();
  console.log("User Info", authInfo.user);
  //Another way to do it.
  // const param = useParams();
  // const id = param.id;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:4050/reports/${ReportId}`
    );
    // console.log("Hellooooo", data);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //Getting number of users
  const [responseReceived, setResponseReceived] = useState([]);

  const handleFormSubmit = (values) => {
    try {
      setLoading(true);
      axios
        .post("http://localhost:4050/attempt", {
          userId: authInfo.user.id,
          tokenId: data.id,
          code: values.tokenCode,
        })
        .then((response) => {
          setResponseReceived(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setOpen(true);
      setLoading(false);
    } catch (e) {
      console.log("ERROR", e);
      setLoading(false);
    }
  };

  console.log("responseReceived.status :>> ", responseReceived.status);

  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          px: 4,
        }}
      >
        <Card
          sx={{
            background: "linear-gradient(to right bottom, #2E389F, #110E2A)",
          }}
        >
          <CardHeader
            title={
              <>
                <Typography variant="h5" fontWeight="bold" color="white">
                  {`Level ${data.id}`}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  <b>My Score:</b> {authInfo.user.score} Points
                </Typography>
              </>
            }
          />

          <CardContent>
            <Card
              sx={{
                p: 2,
                background:
                  "linear-gradient(to right bottom, #483D8B, #2E389F)",
              }}
            >
              {" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Level Description:
              </Title>
              <SubTitle sx={{ color: "white" }}>{data.description}</SubTitle>{" "}
              <br /> <br />{" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Hint:
              </Title>{" "}
              <SubTitle sx={{ color: "white" }}>{data.hint}</SubTitle>
            </Card>

            <Grid
              item
              sm={12}
              xs={12}
              sx={{
                mt: 2,
                p: 4,
                background:
                  "linear-gradient(to right bottom, #2E389F, #483D8B  )",
                borderRadius: 2,
              }}
            >
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
                            type="tokenCode"
                            name="tokenCode"
                            label="Enter your token code"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.tokenCode}
                            onChange={handleChange}
                            helperText={touched.tokenCode && errors.tokenCode}
                            error={Boolean(
                              errors.tokenCode && touched.tokenCode
                            )}
                            sx={{ mb: 3 }}
                            InputLabelProps={{
                              style: { color: "white" },
                            }}
                            InputProps={{
                              style: { color: "white" },
                              classes: {
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                      <FlexBox gap={1} alignItems="center" sx={{ mb: 2 }}>
                        <Paragraph fontSize={13} sx={{ color: "white" }}>
                          Enter 8 digit code here to earn points.
                        </Paragraph>
                      </FlexBox>

                      <Box sx={{ width: "100%" }}>
                        {responseReceived.status === 200 ? (
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
                              Congratulations you have recceived{" "}
                              {responseReceived.score} points.
                            </Alert>
                          </Collapse>
                        ) : responseReceived.status === 400 ? (
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
                              {responseReceived.message}
                            </Alert>
                          </Collapse>
                        ) : (
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
                              An error occured, please try again!
                            </Alert>
                          </Collapse>
                        )}
                      </Box>
                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{
                          mb: 2,
                          mt: 1,
                          background: "#89BE41",
                          color: "white",
                        }}
                      >
                        Submit
                      </LoadingButton>
                    </form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
};

export default ReportView;
