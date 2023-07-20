import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import StatCards from "./shared/StatCards";

const getSteps = () => {
  return [
    "Step 1: Employee Details (Restricted)",
    "Step 2: Bin Dips",
    "Step 3: Vitamins Totals",
    "Step 4: Productions Totals Mill A",
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
  //Employee Details
  employeeFirstName: "",
  employeeSurname: "",
  phone_number: "",
  employeeEmail: "",
  employeeId: "",
  startShiftTime: "",
  endShiftTime: "",

  //BIN1
  bin1: "",
  binStock1: "",
  metersMeasuredBin1: "",

  //BIN2
  bin2: "",
  binStock2: "",
  metersMeasuredBin2: "",

  //BIN3
  bin3: "",
  binStock3: "",
  metersMeasuredBin3: "",

  //BIN4
  bin4: "",
  binStock4: "",
  metersMeasuredBin4: "",

  //BIN5
  bin5: "",
  binStock5: "",
  metersMeasuredBin5: "",

  //BIN6
  bin6: "",
  binStock6: "",
  metersMeasuredBin6: "",

  //BIN7
  bin7: "",
  binStock7: "",
  metersMeasuredBin7: "",

  //BIN8
  bin8: "",
  binStock8: "",
  metersMeasuredBin8: "",

  //BIN9
  bin9: "",
  binStock9: "",
  metersMeasuredBin9: "",

  //BIN10
  bin10: "",
  binStock10: "",
  metersMeasuredBin10: "",

  //BIN11
  bin11: "",
  binStock11: "",
  metersMeasuredBin11: "",

  //BIN12
  bin12: "",
  binStock12: "",
  metersMeasuredBin12: "",

  //BIN13
  bin13: "",
  binStock13: "",
  metersMeasuredBin13: "",

  //BIN14
  bin14: "",
  binStock14: "",
  metersMeasuredBin14: "",

  //BIN15
  bin15: "",
  binStock15: "",
  metersMeasuredBin15: "",

  //BIN16
  bin16: "",
  binStock16: "",
  metersMeasuredBin16: "",

  //BIN17
  bin17: "",
  binStock17: "",
  metersMeasuredBin17: "",

  //BIN18
  bin18: "",
  binStock18: "",
  metersMeasuredBin18: "",

  //BIN19
  bin19: "",
  binStock19: "",
  metersMeasuredBin19: "",

  //BIN20
  bin20: "",
  binStock20: "",
  metersMeasuredBin20: "",

  //BIN21
  bin21: "",
  binStock21: "",
  metersMeasuredBin21: "",

  //BIN22
  bin22: "",
  binStock22: "",
  metersMeasuredBin22: "",

  //BIN23
  bin23: "",
  binStock23: "",
  metersMeasuredBin23: "",

  //Conditioning BIN A1
  binA1: "",
  binStockA1: "",
  metersMeasuredBinA1: "",

  //Conditioning BIN A2
  binA2: "",
  binStockA2: "",
  metersMeasuredBinA2: "",

  //Conditioning BIN A3
  binA3: "",
  binStockA3: "",
  metersMeasuredBinA3: "",

  //Conditioning BIN A4
  binA4: "",
  binStockA4: "",
  metersMeasuredBinA4: "",

  //Conditioning BIN B1
  binB1: "",
  binStockB1: "",
  metersMeasuredBinB1: "",

  //Conditioning BIN B2
  binB2: "",
  binStockB2: "",
  metersMeasuredBinB2: "",

  //Conditioning BIN B3
  binB3: "",
  binStockB3: "",
  metersMeasuredBinB3: "",

  //Conditioning BIN B4
  binB4: "",
  binStockB4: "",
  metersMeasuredBinB4: "",

  //Section A : 1,2,3,4,6,7,8,9,12
  sectionTotalA: "",

  //Section B : 10 & 11
  sectionTotalB: "",

  //Section C : 5,15,13,14,16,17,18
  sectionTotalC: "",

  //Section D : 19,20,21,22,23
  sectionTotalD: "",

  //Section E : A1,A2,A3,A4
  sectionTotalE: "",

  //Section F : B1,B2,B3,B4
  sectionTotalF: "",

  options: [],
};

const StepOne = () => {
  let authInfo = useAuth();
  // console.log("User Info", authInfo.user);
  return (
    <Card>
      <Grid item md={6} xs={12}>
        {" "}
        <Typography
          variant="h4"
          sx={{
            pl: 3,
            pt: 2,
            pb: 2,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Employee Details &nbsp;{" "}
          <span style={{ color: "red" }}>(Restricted*)</span>
        </Typography>
      </Grid>

      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item md={6} xs={12}>
          <Field name="employeeFirstName">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Firstname"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={authInfo.user.first_name}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={6} xs={12}>
          <Field name="employeeSurname">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Surname"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={authInfo.user.surname}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={6} xs={12}>
          <Field name="employeeEmail">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={authInfo.user.email}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={6} xs={12}>
          <Field name="employeeId">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Employee Id"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={authInfo.user.id}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={12} xs={12}>
          <Field name="phone_number">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={authInfo.user.phone_number}
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </Card>
  );
};

// const SelectField = ({ name, label }) => {
//   const [options1, setOptions] = useState([]);

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const fetchOptions = async () => {
//     try {
//       const response = await axios.get("your-api-endpoint");
//       setOptions(response.data.options);
//     } catch (error) {
//       console.error("Failed to fetch options:", error);
//     }
//   };

//   return (
//     <Field name={name}>
//       {({ field, meta }) => (
//         <FormControl
//           fullWidth
//           variant="outlined"
//           error={meta.touched && meta.error}
//         >
//           <InputLabel id={name}>{label}</InputLabel>
//           <Select
//             {...field}
//             labelId={name}
//             id={name}
//             label={label}
//             value={field.value || ""}
//             onChange={field.onChange}
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             {options1.map((option) => (
//               <MenuItem key={option.id} value={option.id}>
//                 {option.name}
//               </MenuItem>
//             ))}
//           </Select>
//           {meta.touched && meta.error && (
//             <FormHelperText>{meta.error}</FormHelperText>
//           )}
//         </FormControl>
//       )}
//     </Field>
//   );
// };

const SelectField = ({ name, label, options, value }) => {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <FormControl
          fullWidth
          variant="outlined"
          error={meta.touched && meta.error}
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            {...field}
            labelId={name}
            id={name}
            label={label}
            value={value || ""}
            onChange={field.onChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};

const StepTwo = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:4050/products");
        setOptions(response.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchOptions();
  }, []);

  console.log("options: ", options);

  return (
    <Card>
      <Grid item md={6} xs={12}>
        <Typography
          variant="h4"
          sx={{
            pl: 3,
            pt: 2,
            pb: 2,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Bin Dips
        </Typography>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography
          variant="h5"
          sx={{
            pl: 3,
            pt: 2,
            pb: 2,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
            color: "#93DA00",
          }}
        >
          Section A
        </Typography>
      </Grid>
      <Grid container spacing={3} sx={{ p: 3 }}>
        {/* BIN1 */}
        {/* <Grid item md={5} xs={12}>
          <SelectField name="bin1" label="Specify Product in Bin 1" />
        </Grid> */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="bin1"
            label="Specify Product in Bin 1"
            options={options}
            // value={values.bin1}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin1">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCards metersMeasuredBin1={23} />
        </Grid>

        {/* BIN2 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin2" label="Specify Product in Bin 2" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin2">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={25} />
        </Grid>

        {/* BIN3 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin3" label="Specify Product in Bin 3" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin3">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCards metersMeasuredBin1={28} />
        </Grid>

        {/* BIN4 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin4" label="Specify Product in Bin 4" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin4">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={21} />
        </Grid>

        {/* BIN6 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin6" label="Specify Product in Bin 6" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin6">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={20.9} />
        </Grid>

        {/* BIN7 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin7" label="Specify Product in Bin 7" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin7">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={21.8} />
        </Grid>

        {/* BIN8 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin8" label="Specify Product in Bin 8" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin8">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN9 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin9" label="Specify Product in Bin 9" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin9">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={21.8} />
        </Grid>

        {/* BIN12 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin12" label="Specify Product in Bin 12" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin12">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={19.8} />
        </Grid>

        {/* SECTION B */}
        <Grid item md={12} xs={12}>
          <Typography
            variant="h5"
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              alignItems: "left",
              display: "flex",
              justifyContent: "left",
              color: "#93DA00",
            }}
          >
            Section B
          </Typography>
        </Grid>

        {/* BIN10 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin10" label="Specify Product in Bin 10" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin10">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN11 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin11" label="Specify Product in Bin 11" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin11">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={12.8} />
        </Grid>

        {/* SECTION C */}
        <Grid item md={12} xs={12}>
          <Typography
            variant="h5"
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              alignItems: "left",
              display: "flex",
              justifyContent: "left",
              color: "#93DA00",
            }}
          >
            Section C
          </Typography>
        </Grid>

        {/* BIN5 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin5" label="Specify Product in Bin 5" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin5">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN15 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin15" label="Specify Product in Bin 15" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin15">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN13 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin13" label="Specify Product in Bin 13" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin13">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN14 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin14" label="Specify Product in Bin 14" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin14">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN16 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin16" label="Specify Product in Bin 16" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin16">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN17 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin17" label="Specify Product in Bin 17" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin17">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN18 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin18" label="Specify Product in Bin 18" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin18">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* SECTION D */}
        <Grid item md={12} xs={12}>
          <Typography
            variant="h5"
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              alignItems: "left",
              display: "flex",
              justifyContent: "left",
              color: "#93DA00",
            }}
          >
            Section D
          </Typography>
        </Grid>

        {/* BIN19 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin19" label="Specify Product in Bin 19" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin19">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN20 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin20" label="Specify Product in Bin 20" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin20">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN21 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin21" label="Specify Product in Bin 21" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin21">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN22 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin22" label="Specify Product in Bin 22" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin22">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* BIN23 */}
        <Grid item md={5} xs={12}>
          <SelectField name="bin23" label="Specify Product in Bin 23" />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBin23">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* SECTION E */}
        <Grid item md={12} xs={12}>
          <Typography
            variant="h5"
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              alignItems: "left",
              display: "flex",
              justifyContent: "left",
              color: "#93DA00",
            }}
          >
            Section E
          </Typography>
        </Grid>

        {/* Conditioning BIN A1 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binA1"
            label="Specify Product in Mill A : Conditioning Bin 1"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinA1">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN A2 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binA2"
            label="Specify Product in Mill A : Conditioning Bin 2"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinA2">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN A3 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binA3"
            label="Specify Product in Mill A : Conditioning Bin 3"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinA3">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN A4 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binA4"
            label="Specify Product in Mill A : Conditioning Bin 4"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinA4">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* SECTION F */}
        <Grid item md={12} xs={12}>
          <Typography
            variant="h5"
            sx={{
              pl: 3,
              pt: 2,
              pb: 2,
              alignItems: "left",
              display: "flex",
              justifyContent: "left",
              color: "#93DA00",
            }}
          >
            Section F
          </Typography>
        </Grid>

        {/* Conditioning BIN B1 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binB1"
            label="Specify Product in Mill B : Conditioning Bin 1"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinB1">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN B2 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binB2"
            label="Specify Product in Mill B : Conditioning Bin 2"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinB2">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN B3 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binB3"
            label="Specify Product in Mill B : Conditioning Bin 3"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinB3">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>

        {/* Conditioning BIN B4 */}
        <Grid item md={5} xs={12}>
          <SelectField
            name="binB4"
            label="Specify Product in Mill B : Conditioning Bin 4"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="metersMeasuredBinB4">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Meters Measured (T)"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          {/** Multiplier * value enetered */}
          <StatCards metersMeasuredBin1={22.8} />
        </Grid>
      </Grid>
    </Card>
  );
};

const StepThree = () => {
  let authInfo = useAuth();
  console.log("User Info", authInfo.user);
  return (
    <Card>
      <Grid item md={6} xs={12}>
        {" "}
        <Typography
          variant="h4"
          sx={{
            pl: 3,
            pt: 2,
            pb: 2,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Employee Details &nbsp;{" "}
          <span style={{ color: "red" }}>(Restricted*)</span>
        </Typography>
      </Grid>
    </Card>
  );
};

const stepComponents = [StepOne, StepTwo, StepThree];

export default function StepperForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [files, setFiles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  let authInfo = useAuth();
  console.log("User Info", authInfo.user);

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
