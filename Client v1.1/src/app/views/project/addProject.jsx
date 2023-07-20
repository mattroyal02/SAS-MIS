import { styled } from "@mui/material";
import { useState } from "react";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const projectNameSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
});

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const AddingProjectView = () => {
  const [projectName, setProjectName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Project Name", "Select Forms", "Fill in Forms"];

  const handleNext = (values) => {
    if (activeStep === 0) {
      setProjectName(values.projectName);
    } else if (activeStep === 1) {
      const selectedForms = Object.keys(values).filter((key) => values[key]);
      setSelectedOptions(selectedForms);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderForm = (values) => {
    switch (activeStep) {
      case 0:
        return (
          <Formik
            initialValues={values}
            validationSchema={projectNameSchema}
            onSubmit={handleNext}
          >
            <Form>
              <h2>Step 1: Project Name</h2>
              <Box mb={2}>
                <Field
                  as={TextField}
                  type="text"
                  id="projectName"
                  name="projectName"
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="projectName" component="div" />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Form>
          </Formik>
        );
      case 1:
        return (
          <Formik initialValues={values} onSubmit={handleNext}>
            <Form>
              <h2 style={{ paddingBottom: "20px" }}>Step 2: Select Forms</h2>
              <Grid container spacing={2}>
                <Grid item lg={5} md={12} xs={12}>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="option1"
                          name="option1"
                        />
                      }
                      label="1. Index"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionA"
                          name="optionA"
                        />
                      }
                      label="A. Revision, Approval and Handover Sheet"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionB"
                          name="optionB"
                        />
                      }
                      label="B. Inspection and Test Plan (ITP)"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionC"
                          name="optionC"
                        />
                      }
                      label="C. Client Specifications and Requirements"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionD"
                          name="optionD"
                        />
                      }
                      label="D. Materials and Equipment Datasheets"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionE"
                          name="optionE"
                        />
                      }
                      label="E. Notices and Concessions"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionF"
                          name="optionF"
                        />
                      }
                      label="F. Welding, Painting and Corrosion Protection Procedures and Competencies"
                    />
                  </Box>

                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionG"
                          name="optionG"
                        />
                      }
                      label="G. Calibration Records Testing Equipment"
                    />
                  </Box>
                </Grid>

                <Grid item lg={4} md={12} xs={12}>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionH"
                          name="optionH"
                        />
                      }
                      label="H. Internal Inspection Reports Releases"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionI"
                          name="optionI"
                        />
                      }
                      label="I. Factory Acceptance Test Report Releases"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionJ"
                          name="optionJ"
                        />
                      }
                      label="J. Punch List"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionK"
                          name="optionK"
                        />
                      }
                      label="K. Client Inspection Reports Releases"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionL"
                          name="optionL"
                        />
                      }
                      label="L. Packing List and Photos"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionM"
                          name="optionM"
                        />
                      }
                      label="M. Drawing Register"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionN"
                          name="optionN"
                        />
                      }
                      label="N. Approved Drawings"
                    />
                  </Box>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionO"
                          name="optionO"
                        />
                      }
                      label="O. Issue For Contruction Drawings"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionP"
                          name="optionP"
                        />
                      }
                      label="P. Manufacturing Drawing Redlines"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionQ"
                          name="optionQ"
                        />
                      }
                      label="Q. As-Manufactured Drawing"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionR"
                          name="optionR"
                        />
                      }
                      label="R. Installation Drawing Redlines"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionS"
                          name="optionS"
                        />
                      }
                      label="S. As-Build Drawing"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionT"
                          name="optionT"
                        />
                      }
                      label="T. Critical Commissioning and Maintenance Spares"
                    />
                  </Box>
                  <Box mb={2}>
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          type="checkbox"
                          id="optionU"
                          name="optionU"
                        />
                      }
                      label="U. Warranties and Guaranties"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                  <div
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={handleBack} variant="contained">
                      Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Next
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        );
      case 2:
        // Generate forms based on selectedOptions
        const generatedForms = selectedOptions.map((option) => {
          switch (option) {
            case "option1":
              return (
                <Formik
                  key="optionC"
                  initialValues={{ pdfFile1: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <h2>1. Index</h2>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFile1"
                          name="pdfFile1"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFile1",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionA":
              return (
                <Formik
                  key="optionA"
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    pdfFile: null,
                  }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>A. Revision, Approval and Handover Sheet</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFile"
                          name="pdfFile"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFile",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <h4>Or fill in the form</h4>
                      <Box mb={2}>
                        <Field
                          as={TextField}
                          type="text"
                          id="name"
                          name="name"
                          label="Name"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name="name" component="div" />
                      </Box>
                      <Box mb={2}>
                        <Field
                          as={TextField}
                          type="email"
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name="email" component="div" />
                      </Box>
                      <Box mb={2}>
                        <Field
                          as={TextField}
                          type="text"
                          id="phone"
                          name="phone"
                          label="Phone"
                          variant="outlined"
                          fullWidth
                        />
                        <ErrorMessage name="phone" component="div" />
                      </Box>
                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionB":
              return (
                <Formik
                  key="optionB"
                  initialValues={{ pdfFileB: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>Option B: Project Requirement</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileB"
                          name="pdfFileB"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileB",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionC":
              return (
                <Formik
                  key="optionC"
                  initialValues={{ pdfFileC: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>Option C: Project Initiators</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileC"
                          name="pdfFileC"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileC",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionD":
              return (
                <Formik
                  key="optionD"
                  initialValues={{ pdfFileD: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>D. Materials and Equipment Datasheets</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileD"
                          name="pdfFileD"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileD",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionE":
              return (
                <Formik
                  key="optionE"
                  initialValues={{ pdfFileE: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>E. Notices and Concessions</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileE"
                          name="pdfFileE"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileE",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionF":
              return (
                <Formik
                  key="optionF"
                  initialValues={{ pdfFileF: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h2>
                        F. Welding, Painting and Corrosion Protection Procedures
                        and Competencies
                      </h2>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileF"
                          name="pdfFileF"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileF",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionG":
              return (
                <Formik
                  key="optionG"
                  initialValues={{ pdfFileG: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>G. Calibration Records Testing Equipment</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileG"
                          name="pdfFileG"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileG",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionH":
              return (
                <Formik
                  key="optionH"
                  initialValues={{ pdfFileH: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>H. Internal Inspection Reports Releases</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileH"
                          name="pdfFileH"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileH",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionI":
              return (
                <Formik
                  key="optionI"
                  initialValues={{ pdfFileI: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>I. Factory Acceptance Test Report Releases</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileI"
                          name="pdfFileI"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileI",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionJ":
              return (
                <Formik
                  key="optionJ"
                  initialValues={{ pdfFileJ: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>J. Punch List</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileJ"
                          name="pdfFileJ"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileJ",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionK":
              return (
                <Formik
                  key="optionK"
                  initialValues={{ pdfFileK: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>K. Client Inspection Reports Releases</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileK"
                          name="pdfFileK"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileK",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionL":
              return (
                <Formik
                  key="optionL"
                  initialValues={{ pdfFileL: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>L. Packing List and Photos</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileL"
                          name="pdfFileL"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileL",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionM":
              return (
                <Formik
                  key="optionM"
                  initialValues={{ pdfFileM: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>M. Drawing Register</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileM"
                          name="pdfFileM"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileM",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionN":
              return (
                <Formik
                  key="optionN"
                  initialValues={{ pdfFileN: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>N. Approved Drawings</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileN"
                          name="pdfFileN"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileN",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionO":
              return (
                <Formik
                  key="optionO"
                  initialValues={{ pdfFileO: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>O. Issue For Contruction Drawings</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileO"
                          name="pdfFileO"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileO",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionP":
              return (
                <Formik
                  key="optionP"
                  initialValues={{ pdfFileP: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>P. Manufacturing Drawing Redlines</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileP"
                          name="pdfFileP"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileP",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionQ":
              return (
                <Formik
                  key="optionQ"
                  initialValues={{ pdfFileQ: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>Q. As-Manufactured Drawing</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileQ"
                          name="pdfFileQ"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileQ",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionR":
              return (
                <Formik
                  key="optionR"
                  initialValues={{ pdfFileR: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>R. Installation Drawing Redlines</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileR"
                          name="pdfFileR"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileR",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionS":
              return (
                <Formik
                  key="optionS"
                  initialValues={{ pdfFileS: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>S. As-Build Drawing</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileS"
                          name="pdfFileS"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileS",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionT":
              return (
                <Formik
                  key="optionT"
                  initialValues={{ pdfFileT: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>T. Critical Commissioning and Maintenance Spares</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileT"
                          name="pdfFileT"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileT",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            case "optionU":
              return (
                <Formik
                  key="optionU"
                  initialValues={{ pdfFileU: null }}
                  onSubmit={handleNext}
                >
                  {({ setFieldValue }) => (
                    <Form style={{ paddingTop: "20px" }}>
                      <h3>U. Warranties and Guaranties</h3>
                      <h4 style={{ paddingTop: "20px" }}>
                        Upload document(s) here:
                      </h4>
                      <Box mb={2}>
                        <input
                          type="file"
                          id="pdfFileU"
                          name="pdfFileU"
                          onChange={(event) => {
                            setFieldValue(
                              "pdfFileU",
                              event.currentTarget.files[0]
                            ); // Set the 'pdfFile' field value
                          }}
                        />
                      </Box>

                      <Button onClick={handleBack} variant="contained">
                        Back
                      </Button>
                      <Button type="submit" variant="contained" color="primary">
                        Next
                      </Button>
                    </Form>
                  )}
                </Formik>
              );
            default:
              return null;
          }
        });

        return (
          <div>
            <h2>Step 3 : Upload documents or fill in forms</h2>
            {generatedForms}
            <Button onClick={handleBack} variant="contained">
              Back
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const initialValues = {
    name: "",
    items: [],
  };

  const formValues = {
    projectName: projectName,
    option1: false,
    optionA: false,
    optionB: false,
    optionC: false,
  };

  return (
    <ContentBox>
      <h1>Adding a new project</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>{renderForm(formValues)}</Box>
    </ContentBox>
  );
};

export default AddingProjectView;
