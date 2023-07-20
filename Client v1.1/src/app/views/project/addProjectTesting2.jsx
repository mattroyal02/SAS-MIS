import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import axios from "axios";
import { Field, Form, Formik, FormikConsumer } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const getSteps = () => {
  return [
    "Step 1: Enter Project Name and PO Number",
    "Step 2: Select Options",
    "Step 3: Upload Documents",
  ];
};

const StepOneSchema = Yup.object().shape({
  projectName: Yup.string().required("Project Name is required"),
  poNumber: Yup.string().required("PO Number is required"),
  votingNumber: Yup.string().required("PO Number is required"),
  supplierProjectNumber: Yup.string().required("PO Number is required"),
});

const StepThreeSchema = Yup.object().shape({
  documents: Yup.object().shape({
    document1: Yup.mixed().when("options", {
      is: (options) => options && options.includes("manufacturing"),
      then: Yup.mixed().required("Document 1 is required"),
      otherwise: Yup.mixed(),
    }),
    document2: Yup.mixed().when("options", {
      is: (options) => options && options.includes("softwareDevelopment"),
      then: Yup.mixed().required("Document 2 is required"),
      otherwise: Yup.mixed(),
    }),
    document3: Yup.mixed().when("options", {
      is: (options) => options && options.includes("agriculture"),
      then: Yup.mixed().required("Document 3 is required"),
      otherwise: Yup.mixed(),
    }),
  }),
});

const initialValues = {
  projectName: "",
  poNumber: "",
  votingNumber: "",
  supplierProjectNumber: "",
  options: [],
  documents: {
    document1: null,
    document2: null,
    document3: null,
    document4: null,
    document5: null,
    document6: null,
    document7: null,
    document8: null,
    document9: null,
    document10: null,
    document11: null,
    document12: null,
    document13: null,
    document14: null,
    document15: null,
    document16: null,
    document17: null,
    document18: null,
    document19: null,
    document20: null,
    document21: null,
    document22: null,
  },
};

const StepOne = () => (
  <Card>
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item md={12} xs={12}>
        <Field name="projectName">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Project Name"
              variant="outlined"
              error={meta.touched && meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </Grid>
      <Grid item md={12} xs={12}>
        <Field name="poNumber">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="PO Number"
              variant="outlined"
              error={meta.touched && meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </Grid>
      <Grid item md={6} xs={12}>
        <Field name="votingNumber">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Voting Number"
              // helperText="Please specify the Voting Number"
              variant="outlined"
              error={meta.touched && meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </Grid>
      <Grid item md={6} xs={12}>
        <Field name="supplierProjectNumber">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Supplier Project Number"
              variant="outlined"
              error={meta.touched && meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </Grid>
    </Grid>
  </Card>
);

const StepTwo = () => (
  <Card sx={{ p: 4 }}>
    <Field name="options">
      {({ field, form }) => (
        <div>
          <h3>Select Options:</h3>

          <Grid container spacing={1} sx={{ pt: 2 }}>
            <Grid item lg={4} md={12} xs={12}>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="1. Index"
                      checked={field.value.includes("1. Index")}
                    />
                  }
                  label="1. Index"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="A. Revision, Approval and Handover Sheet"
                      checked={field.value.includes(
                        "A. Revision, Approval and Handover Sheet"
                      )}
                    />
                  }
                  label="A. Revision, Approval and Handover Sheet"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="B. Inspection and Test Plan (ITP)"
                      checked={field.value.includes(
                        "B. Inspection and Test Plan (ITP)"
                      )}
                    />
                  }
                  label="B. Inspection and Test Plan (ITP)"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="C. Client Specifications and Requirements"
                      checked={field.value.includes(
                        "C. Client Specifications and Requirements"
                      )}
                    />
                  }
                  label="C. Client Specifications and Requirements"
                />{" "}
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="D. Materials and Equipment Datasheets"
                      checked={field.value.includes(
                        "D. Materials and Equipment Datasheets"
                      )}
                    />
                  }
                  label="D. Materials and Equipment Datasheets"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="E. Notices and Concessions"
                      checked={field.value.includes(
                        "E. Notices and Concessions"
                      )}
                    />
                  }
                  label="E. Notices and Concessions"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="F. Welding, Painting and Corrosion Protection Procedures and Competencies"
                      checked={field.value.includes(
                        "F. Welding, Painting and Corrosion Protection Procedures and Competencies"
                      )}
                    />
                  }
                  label="F. Welding, Painting and Corrosion Protection Procedures and Competencies"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="G. Calibration Records Testing Equipment"
                      checked={field.value.includes(
                        "G. Calibration Records Testing Equipment"
                      )}
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
                    <Checkbox
                      {...field}
                      value="H. Internal Inspection Reports Releases"
                      checked={field.value.includes(
                        "H. Internal Inspection Reports Releases"
                      )}
                    />
                  }
                  label="H. Internal Inspection Reports Releases"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="I. Factory Acceptance Test Report Releases"
                      checked={field.value.includes(
                        "I. Factory Acceptance Test Report Releases"
                      )}
                    />
                  }
                  label="I. Factory Acceptance Test Report Releases"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="J. Punch List"
                      checked={field.value.includes("J. Punch List")}
                    />
                  }
                  label="J. Punch List"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="K. Client Inspection Reports Releases"
                      checked={field.value.includes(
                        "K. Client Inspection Reports Releases"
                      )}
                    />
                  }
                  label="K. Client Inspection Reports Releases"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="L. Packing List and Photos"
                      checked={field.value.includes(
                        "L. Packing List and Photos"
                      )}
                    />
                  }
                  label="L. Packing List and Photos"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="M. Drawing Register"
                      checked={field.value.includes("M. Drawing Register")}
                    />
                  }
                  label="M. Drawing Register"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="N. Approved Drawings"
                      checked={field.value.includes("N. Approved Drawings")}
                    />
                  }
                  label="N. Approved Drawings"
                />
              </Box>
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="O. Issue For Contruction Drawings"
                      checked={field.value.includes(
                        "O. Issue For Contruction Drawings"
                      )}
                    />
                  }
                  label="O. Issue For Contruction Drawings"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="P. Manufacturing Drawing Redlines"
                      checked={field.value.includes(
                        "P. Manufacturing Drawing Redlines"
                      )}
                    />
                  }
                  label="P. Manufacturing Drawing Redlines"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="Q. As-Manufactured Drawing"
                      checked={field.value.includes(
                        "Q. As-Manufactured Drawing"
                      )}
                    />
                  }
                  label="Q. As-Manufactured Drawing"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="R. Installation Drawing Redlines"
                      checked={field.value.includes(
                        "R. Installation Drawing Redlines"
                      )}
                    />
                  }
                  label="R. Installation Drawing Redlines"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="S. As-Build Drawing"
                      checked={field.value.includes("S. As-Build Drawing")}
                    />
                  }
                  label="S. As-Build Drawing"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="T. Critical Commissioning and Maintenance Spares"
                      checked={field.value.includes(
                        "T. Critical Commissioning and Maintenance Spares"
                      )}
                    />
                  }
                  label="T. Critical Commissioning and Maintenance Spares"
                />
              </Box>
              <Box mb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      value="U. Warranties and Guaranties"
                      checked={field.value.includes(
                        "U. Warranties and Guaranties"
                      )}
                    />
                  }
                  label="U. Warranties and Guaranties"
                />
              </Box>
            </Grid>
            {form.touched.options && form.errors.options && (
              <div>{form.errors.options}</div>
            )}
          </Grid>
        </div>
      )}
    </Field>
  </Card>
);

const StepThree = () => (
  <FormikConsumer>
    {({ values }) => (
      <Card sx={{ p: 4 }}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={12} xs={12}>
            {values.options.includes("1. Index") && (
              <Box mb={2}>
                <Field name="document1">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="1. Index"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}

            {values.options.includes(
              "A. Revision, Approval and Handover Sheet"
            ) && (
              <Box mb={2}>
                <Field name="document2">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="A. Revision, Approval and Handover Sheet"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}

            {values.options.includes("B. Inspection and Test Plan (ITP)") && (
              <Box mb={2}>
                <Field name="document3">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="B. Inspection and Test Plan (ITP)"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "C. Client Specifications and Requirements"
            ) && (
              <Box mb={2}>
                <Field name="document4">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="C. Client Specifications and Requirements"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "D. Materials and Equipment Datasheets"
            ) && (
              <Box mb={2}>
                <Field name="document5">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="D. Materials and Equipment Datasheets"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("E. Notices and Concessions") && (
              <Box mb={2}>
                <Field name="document6">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="E. Notices and Concessions"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "F. Welding, Painting and Corrosion Protection Procedures and Competencies"
            ) && (
              <Box mb={2}>
                <Field name="document7">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="F. Welding, Painting and Corrosion Protection Procedures and Competencies"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "G. Calibration Records Testing Equipment"
            ) && (
              <Box mb={2}>
                <Field name="document8">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="G. Calibration Records Testing Equipment"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            {values.options.includes(
              "H. Internal Inspection Reports Releases"
            ) && (
              <Box mb={2}>
                <Field name="document9">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="H. Internal Inspection Reports Releases"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "I. Factory Acceptance Test Report Releases"
            ) && (
              <Box mb={2}>
                <Field name="document10">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="I. Factory Acceptance Test Report Releases"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("J. Punch List") && (
              <Box mb={2}>
                <Field name="document11">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="J. Punch List"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "K. Client Inspection Reports Releases"
            ) && (
              <Box mb={2}>
                <Field name="document12">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="K. Client Inspection Reports Releases"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("L. Packing List and Photos") && (
              <Box mb={2}>
                <Field name="document13">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="L. Packing List and Photos"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("M. Drawing Register") && (
              <Box mb={2}>
                <Field name="document14">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="M. Drawing Register"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}

            {values.options.includes("N. Approved Drawings") && (
              <Box mb={2}>
                <Field name="document15">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="N. Approved Drawings"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            {values.options.includes("O. Issue For Contruction Drawings") && (
              <Box mb={2}>
                <Field name="document16">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="O. Issue For Contruction Drawings"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("P. Manufacturing Drawing Redlines") && (
              <Box mb={2}>
                <Field name="document17">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="P. Manufacturing Drawing Redlines"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("Q. As-Manufactured Drawing") && (
              <Box mb={2}>
                <Field name="document18">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="Q. As-Manufactured Drawing"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("R. Installation Drawing Redlines") && (
              <Box mb={2}>
                <Field name="document19">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="R. Installation Drawing Redlines"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("S. As-Build Drawing") && (
              <Box mb={2}>
                <Field name="document20">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="S. As-Build Drawing"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes(
              "T. Critical Commissioning and Maintenance Spares"
            ) && (
              <Box mb={2}>
                <Field name="document21">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="T. Critical Commissioning and Maintenance Spares"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
            {values.options.includes("U. Warranties and Guaranties") && (
              <Box mb={2}>
                <Field name="document22">
                  {({ field, meta }) => (
                    <TextField
                      type="file"
                      helperText="U. Warranties and Guaranties"
                      variant="outlined"
                      error={meta.touched && meta.error}
                      // helperText={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  )}
                </Field>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    )}
  </FormikConsumer>
);

const stepComponents = [StepOne, StepTwo, StepThree];

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [files, setFiles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleChange = (e) => {
    if (e.target.files) {
      console.log("it is file ===", e.target, e.target.files);
      // setFiles([...files, { [e.target.name]: e.target.files[0] }]);
      setFiles([...files, e.target.files[0]]);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      //Create json data for the table
      const jsonData = {
        name: values.projectName,
        poNumber: values.poNumber,
        votingNumber: values.votingNumber,
        supplierProjectNumber: values.supplierProjectNumber,
      };

      // Create form data
      const formData = new FormData();

      formData.append("projectName", values.projectName);
      // formData.append("files", files);

      // Append selected options
      values.options.forEach((option) => {
        formData.append("options", option);
      });

      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        formData.append("files", element);
      }

      // for (let index = 0; index < files.length; index++) {
      //   const element = files[index];
      //   if (element.hasOwnProperty("document1")) {
      //     console.log("ít is document 1 ===", element, element["document1"]);
      //     formData.append("document1", element["document1"]);
      //   }
      //   if (element.hasOwnProperty("document2")) {
      //     console.log("ít is document 2 ===", element);
      //     formData.append("document1", element["document2"]);
      //   }
      //   if (element.hasOwnProperty("document3")) {
      //     console.log("ít is document 2 ===", element);
      //     formData.append("document1", element["document2"]);
      //   }
      // }

      // Append document files based on selected options
      // if (values.options.includes("manufacturing")) {
      //   formData.append("document1", values.documents.document1);
      // }
      // if (values.options.includes("softwareDevelopment")) {
      //   formData.append("document2", values.documents.document2);
      // }
      // if (values.options.includes("agriculture")) {
      //   formData.append("document3", values.documents.document3);
      // }

      console.log("value check ===", values, files);
      console.log("JSON value check ===", jsonData);

      // Send the form data to the server using your preferred API library (e.g., Axios)
      await axios.post("http://localhost:4050/upload", formData);
      await axios.post("http://localhost:4050/addproject", jsonData);
      setAlertOpen(true);

      // Handle successful submission
      console.log("Form submitted successfully!", formData.getAll("options"));
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    window.location.href = "/project-page"; // Replace with your project page URL
  };

  return (
    <Box sx={{ pt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={activeStep === 0 ? StepOneSchema : StepThreeSchema}
          validateOnMount
        >
          {({ isSubmitting }) => (
            <Form style={{ padding: "2rem" }} onChange={(e) => handleChange(e)}>
              {stepComponents[activeStep]()}

              <Box pt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
              {/* {alertOpen && (
                <Alert severity="success" onClose={handleAlertClose}>
                  <AlertTitle>Success</AlertTitle>
                  Project created successfully!
                </Alert>
              )} */}
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
