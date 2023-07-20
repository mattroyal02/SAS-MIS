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
import "./index.css";

import { makeStyles } from "@mui/styles";
import { Paragraph } from "app/components/Typography";
import axios from "axios";
import { Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";

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

// form field validation schema
const validationSchema = Yup.object().shape({
  tokenCode: Yup.string()
    .matches(
      /^[0-9]{8}$/,
      "Invalid token format. Please enter 8 numeric characters. Eg: 01234567."
    )
    .required("8 character token is required"),
});

const difficultyLevels = [
  {
    value: 1,
    label: "Level 1 - Easy",
  },
  {
    value: 2,
    label: "Level 2 - Medium",
  },
  {
    value: 3,
    label: "Level 3 - Hard",
  },
  {
    value: 4,
    label: "Level 4 - Very Hard",
  },
];

const accessibility = [
  {
    value: true,
    label: "Visible and accessible",
  },
  {
    value: false,
    label: "Invisible and innaccessible",
  },
];

const LevelsView = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [initialValues, setinItialValues] = useState({});
  const [responseReceived, setResponseReceived] = useState([]);
  const { id } = useParams();
  const classes = useStyles();
  let authInfo = useAuth();
  console.log("User Info", authInfo.user);
  //Another way to do it.
  // const param = useParams();
  // const id = param.id;
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4050/tokens/${id}`);
      // console.log("Hellooooo", data);
      setData(data);
      // setinItialValues(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Check if the data is still being fetched
  if (!data) {
    // Render a loading state or return null
    return <div>Loading...</div>;
  }

  const initialValues = {
    hint: data.hint,
    description: data.description,
    tokenCode: data.code,
    difficulty: data.difficulty,
    accessible: data.accessible,
  };

  console.log("initialValues :>> ", initialValues);

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
              <br />{" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Hint:
              </Title>{" "}
              <SubTitle sx={{ color: "white" }}>{data.hint}</SubTitle> <br />{" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Code:
              </Title>{" "}
              <SubTitle sx={{ color: "white" }}>{data.code}</SubTitle> <br />{" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Accessible:
              </Title>{" "}
              {data.accessible === true ? (
                <SubTitle sx={{ color: "white" }}>
                  Visible & Accessible
                </SubTitle>
              ) : (
                <SubTitle sx={{ color: "white" }}>
                  Invisible & Inaccessible
                </SubTitle>
              )}
              <br />{" "}
              <Title
                sx={{
                  color: "#89BE41",
                  pb: 1,
                  borderRadius: 2,
                }}
              >
                Difficulty:
              </Title>{" "}
              {data.difficulty === 1 ? (
                <SubTitle sx={{ color: "white" }}>
                  Easy (2 minutes Task)
                </SubTitle>
              ) : data.difficulty === 2 ? (
                <SubTitle sx={{ color: "white" }}>
                  Medium (5 minutes Task)
                </SubTitle>
              ) : data.difficulty === 3 ? (
                <SubTitle sx={{ color: "white" }}>
                  Hard (10 minutes Task)
                </SubTitle>
              ) : (
                <SubTitle sx={{ color: "white" }}>
                  Very Hard (15 minutes Task)
                </SubTitle>
              )}
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
                  enableReinitialize
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
                            type="text"
                            name="description"
                            label="Enter brief description here"
                            variant="outlined"
                            onBlur={handleBlur}
                            value={values.description}
                            onChange={handleChange}
                            helperText={
                              touched.description && errors.description
                            }
                            error={Boolean(
                              errors.description && touched.description
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
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            type="text"
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
                        <Grid item sm={12} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            type="text"
                            name="hint"
                            label="Enter hint here"
                            variant="outlined"
                            multiline
                            row={3}
                            onBlur={handleBlur}
                            value={values.hint}
                            onChange={handleChange}
                            helperText={touched.hint && errors.hint}
                            error={Boolean(errors.hint && touched.hint)}
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
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            type="text"
                            name="accessible"
                            label="Visible ?"
                            variant="outlined"
                            select
                            SelectProps={{ native: true }}
                            onBlur={handleBlur}
                            value={values.accessible}
                            onChange={handleChange}
                            helperText={touched.accessible && errors.accessible}
                            error={Boolean(
                              errors.accessible && touched.accessible
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
                          >
                            {accessibility.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                style={{
                                  color: "white",
                                  backgroundColor: "#89BE41",
                                  padding: 2,
                                }}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            type="text"
                            name="difficulty"
                            label="Select difficulty"
                            variant="outlined"
                            select
                            SelectProps={{
                              native: true,
                            }}
                            onBlur={handleBlur}
                            value={values.difficulty}
                            onChange={handleChange}
                            helperText={touched.difficulty && errors.difficulty}
                            error={Boolean(
                              errors.difficulty && touched.difficulty
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
                          >
                            {difficultyLevels.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                style={{
                                  color: "white",
                                  backgroundColor: "#89BE41",
                                  padding: 2,
                                }}
                              >
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <FlexBox gap={1} alignItems="center" sx={{ mb: 2 }}>
                        <Paragraph fontSize={13} sx={{ color: "white" }}>
                          Save changes to the token.
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
                        onClick={() => {
                          handleFormSubmit(values);
                        }}
                      >
                        Save
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

export default LevelsView;
