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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import DisplayCard from "./shared/DisplayCard";
import StatCardGrandTotal from "./shared/StatCardGrandTotal";
import StatCardTotal from "./shared/StatCardTotal";
import StatCards from "./shared/StatCards";
import StatCardsKg from "./shared/StatCardsKg";

const getSteps = () => {
  return [
    "Step 1: Employee Details (Restricted)",
    "Step 2: Bin Dips",
    "Step 3: Vitamin Totals",
    "Step 4: Production Totals Mill A",
  ];
};

const StepOneSchema = Yup.object().shape({
  projectName: Yup.string().required("Project Name is required"),
  poNumber: Yup.string().required("PO Number is required"),
  votingNumber: Yup.string().required("PO Number is required"),
  supplierProjectNumber: Yup.string().required("PO Number is required"),
});
const StepTwoSchema = Yup.object().shape({
  // bin1: Yup.string().required("Project Name is required"),
  // binStock1: Yup.string().required("PO Number is required"),
  // metersMeasuredBin1: Yup.string().required("PO Number is required"),
});

const StepThreeSchema = Yup.object().shape({});

const shiftOptions = [
  { value: "Shift 1", label: "Shift 1" },
  { value: "Shift 2", label: "Shift 2" },
];

//Bag Weight in Kg

let bagWeight = 20;

let initialValues = {
  //Employee Details
  employeeFirstName: "",
  employeeSurname: "",
  phone_number: "",
  employeeEmail: "",
  employeeId: "",
  shift: "",
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
  binStock10: 0.0,
  metersMeasuredBin10: "",

  //BIN11
  bin11: "",
  binStock11: 0.0,
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
  sectionTotalA: 0,

  //Section B : 10 & 11
  sectionTotalB: 0,

  //Section C : 5,15,13,14,16,17,18
  sectionTotalC: 0,

  //Section D : 19,20,21,22,23
  sectionTotalD: 0,

  //Section E : A1,A2,A3,A4
  sectionTotalE: 0,

  //Section F : B1,B2,B3,B4
  sectionTotalF: 0,
  //Section E + F
  sectionTotalEF: 0,

  //Vitamins
  //In Cage
  bagInCage: "",
  totalWeightInCage: 0,
  //Received
  bagReceived: "",
  totalWeightReceived: 0,
  //Super in Mill A
  superVitaminUsedMillA: "",
  totalWeightSuperMillA: 0,
  //Braai Pap in Mill A
  braaiPapVitaminUsedMillA: "",
  totalWeightBraaiPapMillA: 0,
  //Super in Mill B
  superVitaminUsedMillB: "",
  totalWeightSuperMillB: 0,
  //Braai Pap in Mill B
  braaiPapVitaminUsedMillB: "",
  totalWeightBraaiPapMillB: 0,

  //MILL A Totals

  //Intake
  intakeScada: 0,
  intakeTotal: 0,

  //Screening
  screeningScada: 0,
  screeningTotal: 0,
  screeningPercentage: 0,
  //Dirty Maize
  dirtyMaize: 0,
};

const StepOne = (props) => {
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
        {/* Employee Firstname */}
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
                value={props.authInfo.user.first_name}
              />
            )}
          </Field>
        </Grid>
        {/* Employee Surname */}
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
                value={props.authInfo.user.surname}
              />
            )}
          </Field>
        </Grid>
        {/* Employee Email */}
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
                value={props.authInfo.user.email}
              />
            )}
          </Field>
        </Grid>
        {/* Employee Employee Id */}
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
                value={props.authInfo.user.id}
              />
            )}
          </Field>
        </Grid>
        {/* Employee Phone Number */}
        <Grid item md={6} xs={12}>
          <Field name="phone_number">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                value={props.authInfo.user.phone_number}
              />
            )}
          </Field>
        </Grid>
        {/* Employee Shift Number */}
        <Grid item md={6} xs={12}>
          <Field name="shift">
            {({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Specify Shift"
                variant="outlined"
              >
                {shiftOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>
        </Grid>
        {/* Employee Start Time */}
        <Grid item md={6} xs={12}>
          {/* Field to select starting DateTime */}
          <Field name="startShiftTime">
            {({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="datetime-local"
                variant="outlined"
                helperText="Start Shift Time"
              />
            )}
          </Field>
        </Grid>
        {/* Employee End Time */}
        <Grid item md={6} xs={12}>
          {/* Field to select ending DateTime */}
          <Field name="endShiftTime">
            {({ field }) => (
              <TextField
                {...field}
                fullWidth
                helperText="End Shift Time"
                type="datetime-local"
                variant="outlined"
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </Card>
  );
};

const SelectField = ({ name, label, options }) => {
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
            value={field.value || ""}
            onChange={field.onChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options &&
              options.length &&
              options.map((option) => (
                <MenuItem key={option.id} value={option.name}>
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

const StepTwo = (props) => {
  const [options, setOptions] = useState([]);

  console.log("props.values ===", props.values);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:4050/products");
        console.log("OPTIONS ===", response.data.data);
        setOptions(response.data.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    // Bin Dips
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
      {/** Section A */}
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
      {options.length > 0 && (
        <Grid container spacing={3} sx={{ p: 3 }}>
          {/* BIN1 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin1"
              options={options}
              label="Specify Product in Bin 1"
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
                  //   error={meta.touched && meta.error}
                  //   helperText={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>
          </Grid>
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin1, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin1, 10) *
                      props.filterBin(1)
                    : props.filterBin(1)
                }
                binStock1={
                  parseFloat(props.values?.metersMeasuredBin1, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin1, 10) *
                      props.filterBin(1)
                    : props.filterBin(1)
                }
              />
            </Grid>
          )}
          {/* BIN2 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin2"
              options={options}
              label="Specify Product in Bin 2"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin2, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin2, 10) *
                      props.filterBin(2)
                    : props.filterBin(2)
                }
              />
            </Grid>
          )}
          {/* BIN3 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin3"
              options={options}
              label="Specify Product in Bin 3"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin3, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin3, 10) *
                      props.filterBin(3)
                    : props.filterBin(3)
                }
              />
            </Grid>
          )}
          {/* BIN4 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin4"
              options={options}
              label="Specify Product in Bin 4"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin4, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin4, 10) *
                      props.filterBin(4)
                    : props.filterBin(4)
                }
              />
            </Grid>
          )}
          {/* BIN6 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin6"
              options={options}
              label="Specify Product in Bin 6"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin6, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin6, 10) *
                      props.filterBin(6)
                    : props.filterBin(6)
                }
              />
            </Grid>
          )}
          {/* BIN7 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin7"
              options={options}
              label="Specify Product in Bin 7"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin7, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin7, 10) *
                      props.filterBin(7)
                    : props.filterBin(7)
                }
              />
            </Grid>
          )}
          {/* BIN8 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin8"
              options={options}
              label="Specify Product in Bin 8"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin8, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin8, 10) *
                      props.filterBin(8)
                    : props.filterBin(8)
                }
              />
            </Grid>
          )}
          {/* BIN9 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin9"
              options={options}
              label="Specify Product in Bin 9"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin9, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin9, 10) *
                      props.filterBin(9)
                    : props.filterBin(9)
                }
              />
            </Grid>
          )}
          {/* BIN12 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin12"
              options={options}
              label="Specify Product in Bin 12"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin12, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin12, 10) *
                      props.filterBin(12)
                    : props.filterBin(12)
                }
              />
            </Grid>
          )}
          {/** Section A Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBin1) ?? 0.0) *
                    props.filterBin(1) +
                  (parseFloat(props.values?.metersMeasuredBin2) ?? 0) *
                    props.filterBin(2) +
                  (parseFloat(props.values?.metersMeasuredBin3) ?? 0) *
                    props.filterBin(3) +
                  (parseFloat(props.values?.metersMeasuredBin4) ?? 0) *
                    props.filterBin(4) +
                  (parseFloat(props.values?.metersMeasuredBin6) ?? 0) *
                    props.filterBin(6) +
                  (parseFloat(props.values?.metersMeasuredBin7) ?? 0) *
                    props.filterBin(7) +
                  (parseFloat(props.values?.metersMeasuredBin8) ?? 0) *
                    props.filterBin(8) +
                  (parseFloat(props.values?.metersMeasuredBin9) ?? 0) *
                    props.filterBin(9) +
                  (parseFloat(props.values?.metersMeasuredBin12) ?? 0) *
                    props.filterBin(12)
                }
              />
            </Grid>
          )}
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
            <SelectField
              name="bin10"
              options={options}
              label="Specify Product in Bin 10"
            />
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
          {/* <Grid item md={3} xs={12} sx={{ color: "white" }}>
            <Typography color="black" fontSize={11} sx={{ textAlign: "left" }}>
              {"Bin Stock (Tones)"}
            </Typography>
            <Field name="binStock10">
              {({ field, meta, form }) => (
                <TextField
                  {...field}
                  size="small"
                  sx={{
                    color: "warning",
                    background:
                      "linear-gradient(to right bottom, #93DA00, #00A880)",
                  }}
                  // helperText="Bin Stock (Tones)"
                  variant="outlined"
                  value={
                    parseFloat(props.values?.metersMeasuredBin10, 10) > 0
                      ? parseFloat(props.values?.metersMeasuredBin10, 10) *
                        props.filterBin(10)
                      : props.filterBin(10)
                  }
                  onChange={(e) => {
                    form.handleChange(e); // Let Formik handle updating the form values
                  }}
                />
              )}
            </Field>
          </Grid> */}
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin10, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin10, 10) *
                      props.filterBin(10)
                    : props.filterBin(10)
                }
              />
            </Grid>
          )}
          {/* BIN11 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin11"
              options={options}
              label="Specify Product in Bin 11"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin11, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin11, 10) *
                      props.filterBin(11)
                    : props.filterBin(11)
                }
              />
            </Grid>
          )}
          {/** Section B Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBin10) ?? 0.0) *
                    props.filterBin(10) +
                  (parseFloat(props.values?.metersMeasuredBin11) ?? 0) *
                    props.filterBin(11)
                }
              />
            </Grid>
          )}
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
            <SelectField
              name="bin5"
              options={options}
              label="Specify Product in Bin 5"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin5, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin5, 10) *
                      props.filterBin(5)
                    : props.filterBin(5)
                }
              />
            </Grid>
          )}
          {/* BIN15 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin15"
              options={options}
              label="Specify Product in Bin 15"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin15, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin15, 10) *
                      props.filterBin(15)
                    : props.filterBin(15)
                }
              />
            </Grid>
          )}
          {/* BIN13 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin13"
              options={options}
              label="Specify Product in Bin 13"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin13, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin13, 10) *
                      props.filterBin(13)
                    : props.filterBin(13)
                }
              />
            </Grid>
          )}
          {/* BIN14 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin14"
              options={options}
              label="Specify Product in Bin 14"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin14, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin14, 10) *
                      props.filterBin(14)
                    : props.filterBin(14)
                }
              />
            </Grid>
          )}
          {/* BIN16 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin16"
              options={options}
              label="Specify Product in Bin 16"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin16, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin16, 10) *
                      props.filterBin(16)
                    : props.filterBin(16)
                }
              />
            </Grid>
          )}
          {/* BIN17 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin17"
              options={options}
              label="Specify Product in Bin 17"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin17, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin17, 10) *
                      props.filterBin(17)
                    : props.filterBin(17)
                }
              />
            </Grid>
          )}
          {/* BIN18 */}
          <Grid item md={5} xs={12}>
            <SelectField
              name="bin18"
              options={options}
              label="Specify Product in Bin 18"
            />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin18, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin18, 10) *
                      props.filterBin(18)
                    : props.filterBin(18)
                }
              />
            </Grid>
          )}
          {/** Section C Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBin5) ?? 0.0) *
                    props.filterBin(5) +
                  (parseFloat(props.values?.metersMeasuredBin15) ?? 0) *
                    props.filterBin(15) +
                  (parseFloat(props.values?.metersMeasuredBin13) ?? 0) *
                    props.filterBin(13) +
                  (parseFloat(props.values?.metersMeasuredBin14) ?? 0) *
                    props.filterBin(14) +
                  (parseFloat(props.values?.metersMeasuredBin16) ?? 0) *
                    props.filterBin(16) +
                  (parseFloat(props.values?.metersMeasuredBin17) ?? 0) *
                    props.filterBin(17) +
                  (parseFloat(props.values?.metersMeasuredBin18) ?? 0) *
                    props.filterBin(18)
                }
              />
            </Grid>
          )}
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
            <DisplayCard name={"Bin 19 : Offal"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin19, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin19, 10) *
                      props.filterBin(19)
                    : props.filterBin(19)
                }
              />
            </Grid>
          )}
          {/* BIN20 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"Bin 20 : Offal"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin20, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin20, 10) *
                      props.filterBin(20)
                    : props.filterBin(20)
                }
              />
            </Grid>
          )}
          {/* BIN21 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"Bin 21 : Offal"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin21, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin21, 10) *
                      props.filterBin(21)
                    : props.filterBin(21)
                }
              />
            </Grid>
          )}
          {/* BIN22 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"Bin 22 : Offal"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin22, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin22, 10) *
                      props.filterBin(22)
                    : props.filterBin(22)
                }
              />
            </Grid>
          )}
          {/* BIN23 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"Bin 23 : Offal"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBin23, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBin23, 10) *
                      props.filterBin(23)
                    : props.filterBin(23)
                }
              />
            </Grid>
          )}
          {/** Section D Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBin19) ?? 0.0) *
                    props.filterBin(19) +
                  (parseFloat(props.values?.metersMeasuredBin20) ?? 0) *
                    props.filterBin(20) +
                  (parseFloat(props.values?.metersMeasuredBin21) ?? 0) *
                    props.filterBin(21) +
                  (parseFloat(props.values?.metersMeasuredBin22) ?? 0) *
                    props.filterBin(22) +
                  (parseFloat(props.values?.metersMeasuredBin23) ?? 0) *
                    props.filterBin(23)
                }
              />
            </Grid>
          )}
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
            {/* <SelectField
              name="binA1"
              options={options}
              label="Specify Product in Mill A : Conditioning Bin 1"
            /> */}
            <DisplayCard name={"A Mill Conditioning Bin 1"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinA1, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinA1, 10) *
                      props.filterBin(24)
                    : props.filterBin(24)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN A2 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"A Mill Conditioning Bin 2"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinA2, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinA2, 10) *
                      props.filterBin(25)
                    : props.filterBin(25)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN A3 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"A Mill Conditioning Bin 3"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinA3, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinA3, 10) *
                      props.filterBin(26)
                    : props.filterBin(26)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN A4 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"A Mill Conditioning Bin 4"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinA4, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinA4, 10) *
                      props.filterBin(27)
                    : props.filterBin(27)
                }
              />
            </Grid>
          )}
          {/** Section E Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBinA1) ?? 0.0) *
                    props.filterBin(24) +
                  (parseFloat(props.values?.metersMeasuredBinA2) ?? 0) *
                    props.filterBin(25) +
                  (parseFloat(props.values?.metersMeasuredBinA3) ?? 0) *
                    props.filterBin(26) +
                  (parseFloat(props.values?.metersMeasuredBinA4) ?? 0) *
                    props.filterBin(27)
                }
              />
            </Grid>
          )}

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
            <DisplayCard name={"B Mill Conditioning Bin 1"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinB1, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinB1, 10) *
                      props.filterBin(28)
                    : props.filterBin(28)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN B2 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"B Mill Conditioning Bin 2"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinB2, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinB2, 10) *
                      props.filterBin(29)
                    : props.filterBin(29)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN B3 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"B Mill Conditioning Bin 3"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinB3, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinB3, 10) *
                      props.filterBin(30)
                    : props.filterBin(30)
                }
              />
            </Grid>
          )}
          {/* Conditioning BIN B4 */}
          <Grid item md={5} xs={12}>
            <DisplayCard name={"B Mill Conditioning Bin 4"} />
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
          {/** Multiplier * value enetered */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={3} xs={12}>
              <StatCards
                metersMeasuredBin1={
                  parseFloat(props.values?.metersMeasuredBinB4, 10) > 0
                    ? parseFloat(props.values?.metersMeasuredBinB4, 10) *
                      props.filterBin(31)
                    : props.filterBin(31)
                }
              />
            </Grid>
          )}
          {/** Section F Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardTotal
                metersMeasuredBin1={
                  (parseFloat(props.values?.metersMeasuredBinB1) ?? 0.0) *
                    props.filterBin(28) +
                  (parseFloat(props.values?.metersMeasuredBinB2) ?? 0) *
                    props.filterBin(29) +
                  (parseFloat(props.values?.metersMeasuredBinB3) ?? 0) *
                    props.filterBin(30) +
                  (parseFloat(props.values?.metersMeasuredBinB4) ?? 0) *
                    props.filterBin(31)
                }
              />
            </Grid>
          )}
          {/** Section E + F Total */}
          {props.binMultipliers.length > 0 && (
            <Grid item md={12} xs={12}>
              <StatCardGrandTotal
                metersMeasuredBin1={(
                  (parseFloat(props.values?.metersMeasuredBinA1) ?? 0.0) *
                    props.filterBin(24) +
                  (parseFloat(props.values?.metersMeasuredBinA2) ?? 0) *
                    props.filterBin(25) +
                  (parseFloat(props.values?.metersMeasuredBinA3) ?? 0) *
                    props.filterBin(26) +
                  (parseFloat(props.values?.metersMeasuredBinA4) ?? 0) *
                    props.filterBin(27) +
                  ((parseFloat(props.values?.metersMeasuredBinB1) ?? 0.0) *
                    props.filterBin(28) +
                    (parseFloat(props.values?.metersMeasuredBinB2) ?? 0) *
                      props.filterBin(29) +
                    (parseFloat(props.values?.metersMeasuredBinB3) ?? 0) *
                      props.filterBin(30) +
                    (parseFloat(props.values?.metersMeasuredBinB4) ?? 0) *
                      props.filterBin(31))
                ).toFixed(2)}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Card>
  );
};

const StepThree = (props) => {
  console.log("step three ===", props.values);
  return (
    <Card>
      <Grid item md={6} xs={12}>
        <Typography
          variant="h4"
          sx={{
            pl: 3,
            pt: 2,
            pb: 0,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Vitamin Totals
        </Typography>
      </Grid>
      <Grid container spacing={3} sx={{ p: 3, pt: 3 }}>
        {/** Bags in Cage */}
        <Grid item md={5} xs={12}>
          <DisplayCard name={"Bags in Cage"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="bagInCage">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags in Cage"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.bagInCage > 0
                ? props.values?.bagInCage * bagWeight
                : bagWeight
            }
          />
        </Grid>

        {/** Bags received */}

        <Grid item md={5} xs={12}>
          <DisplayCard name={"Bags received"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="bagReceived">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags Received"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.bagReceived > 0
                ? props.values?.bagReceived * bagWeight
                : bagWeight
            }
          />
        </Grid>

        {/** Super in Mill A */}

        <Grid item md={5} xs={12}>
          <DisplayCard name={"Mill A : Super"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="superVitaminUsedMillA">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags in Mill A Super"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.superVitaminUsedMillA > 0
                ? props.values?.superVitaminUsedMillA * bagWeight
                : bagWeight
            }
          />
        </Grid>

        {/** Braai Pap in Mill A */}

        <Grid item md={5} xs={12}>
          <DisplayCard name={"Mill A : Braai Pap"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="braaiPapVitaminUsedMillA">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags in Mill A Braai Pap"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.braaiPapVitaminUsedMillA > 0
                ? props.values?.braaiPapVitaminUsedMillA * bagWeight
                : bagWeight
            }
          />
        </Grid>

        {/** Super in Mill B */}

        <Grid item md={5} xs={12}>
          <DisplayCard name={"Mill A : Braai Pap"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="superVitaminUsedMillB">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags in Mill B Super"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.superVitaminUsedMillB > 0
                ? props.values?.superVitaminUsedMillB * bagWeight
                : bagWeight
            }
          />
        </Grid>

        {/** Braai Pap in Mill B*/}

        <Grid item md={5} xs={12}>
          <DisplayCard name={"Mill B : Braai Pap"} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Field name="braaiPapVitaminUsedMillB">
            {({ field, meta }) => (
              <TextField
                {...field}
                fullWidth
                label="End of shift - Number of Bags in Mill B Braai Pap"
                variant="outlined"
                error={meta.touched && meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
              />
            )}
          </Field>
        </Grid>
        <Grid item md={3} xs={12}>
          <StatCardsKg
            value={
              props.values?.braaiPapVitaminUsedMillB > 0
                ? props.values?.braaiPapVitaminUsedMillB * bagWeight
                : bagWeight
            }
          />
        </Grid>
      </Grid>
    </Card>
  );
};

const StepFour = (props) => {
  useEffect(() => {
    const fetchPReviousReportValues = async () => {
      try {
        const response = await axios.get("http://localhost:4050/report/latest");
        console.log("REPORT ===", response.data.data);
        props.setLastReport(response.data.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };
    fetchPReviousReportValues();
  }, []);

  return (
    <Card>
      <Grid item md={6} xs={12}>
        <Typography
          variant="h4"
          sx={{
            pl: 3,
            pt: 2,
            pb: 0,
            alignItems: "left",
            display: "flex",
            justifyContent: "left",
          }}
        >
          Production Totals Mill A
        </Typography>
        <h4>Screening</h4>
        {<h4>{props.filteredIntakeScada()}</h4>}
      </Grid>
    </Card>
  );
};

// const stepComponents = [StepOne, StepTwo, StepThree, StepFour];

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [files, setFiles] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const [binMultipliers, setBinMultipliers] = useState([]);
  const [milla, setMilla] = useState(null);
  const [lastReport, setLastReport] = useState(null);

  //Getting Bin Multipliers
  useEffect(() => {
    const fetchBinsMultipliers = async () => {
      try {
        const response = await axios.get("http://localhost:4050/bins");
        setBinMultipliers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    fetchBinsMultipliers();
  }, []);

  //Getting latest scale reading Mill A
  useEffect(() => {
    const fetchMillaValues = async () => {
      try {
        const response = await axios.get("http://localhost:4050/mill/latest");
        setMilla(response.data.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };

    console.log("milla :>> ", milla);
    fetchMillaValues();
  }, []);

  console.log("lastReport :>> ", lastReport);
  let authInfo = useAuth();
  // console.log("User Info", authInfo.user);

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

  const filterBin = (index) => {
    const data = binMultipliers.filter((e) => e.id === index);
    return data.length ? data[0]["multiplier"] : 1;
  };

  //Getting WS2012_TT
  const filteredScreeningScada = () => {
    const ws2012_tt = milla?.WS2012_TT || "0";
    return parseFloat(ws2012_tt, 10);
  };
  //Getting WS2008_TT
  const filteredIntakeScada = () => {
    const ws2008_tt = milla?.WS2008_TT || "0";
    return parseFloat(ws2008_tt, 10);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("submit values ===", values);
      //Create json data for the table
      const reportPayload = {
        //Project Detail Payload
        employeeFirstName: authInfo.user.first_name,
        employeeSurname: authInfo.user.surname,
        employeePhoneNumber: authInfo.user.phone_number,
        employeeEmail: authInfo.user.email,
        employeeId: authInfo.user.id,
        shift: values.shift,
        startShiftTime: values.startShiftTime,
        endShiftTime: values.endShiftTime,

        //Bin Dips Payload
        //BIN1
        bin1: values.bin1,
        binStock1: parseFloat(values?.metersMeasuredBin1, 10) * filterBin(1),
        metersMeasuredBin1: parseFloat(values?.metersMeasuredBin1, 10),
        //BIN2
        bin2: values.bin2,
        binStock2: parseFloat(values?.metersMeasuredBin2, 10) * filterBin(2),
        metersMeasuredBin2: parseFloat(values?.metersMeasuredBin2, 10),
        //BIN3
        bin3: values.bin3,
        binStock3: parseFloat(values?.metersMeasuredBin3, 10) * filterBin(3),
        metersMeasuredBin3: parseFloat(values?.metersMeasuredBin3, 10),
        //BIN4
        bin4: values.bin4,
        binStock4: parseFloat(values?.metersMeasuredBin4, 10) * filterBin(4),
        metersMeasuredBin4: parseFloat(values?.metersMeasuredBin4, 10),
        //BIN5
        bin5: values.bin5,
        binStock5: parseFloat(values?.metersMeasuredBin5, 10) * filterBin(5),
        metersMeasuredBin5: parseFloat(values?.metersMeasuredBin5, 10),
        //BIN6
        bin6: values.bin6,
        binStock6: parseFloat(values?.metersMeasuredBin6, 10) * filterBin(6),
        metersMeasuredBin6: parseFloat(values?.metersMeasuredBin6, 10),
        //BIN7
        bin7: values.bin7,
        binStock7: parseFloat(values?.metersMeasuredBin7, 10) * filterBin(7),
        metersMeasuredBin7: parseFloat(values?.metersMeasuredBin7, 10),
        //BIN8
        bin8: values.bin8,
        binStock8: parseFloat(values?.metersMeasuredBin8, 10) * filterBin(8),
        metersMeasuredBin8: parseFloat(values?.metersMeasuredBin8, 10),
        //BIN9
        bin9: values.bin9,
        binStock9: parseFloat(values?.metersMeasuredBin9, 10) * filterBin(9),
        metersMeasuredBin9: parseFloat(values?.metersMeasuredBin9, 10),
        //BIN10
        bin10: values.bin10,
        binStock10: parseFloat(values?.metersMeasuredBin10, 10) * filterBin(10),
        metersMeasuredBin10: parseFloat(values?.metersMeasuredBin10, 10),
        //BIN11
        bin11: values.bin11,
        binStock11: parseFloat(values?.metersMeasuredBin11, 10) * filterBin(11),
        metersMeasuredBin11: parseFloat(values?.metersMeasuredBin11, 10),
        //BIN12
        bin12: values.bin12,
        binStock12: parseFloat(values?.metersMeasuredBin12, 10) * filterBin(12),
        metersMeasuredBin12: parseFloat(values?.metersMeasuredBin12, 10),
        //BIN13
        bin13: values.bin13,
        binStock13: parseFloat(values?.metersMeasuredBin13, 10) * filterBin(13),
        metersMeasuredBin13: parseFloat(values?.metersMeasuredBin13, 10),
        //BIN14
        bin14: values.bin14,
        binStock14: parseFloat(values?.metersMeasuredBin14, 10) * filterBin(14),
        metersMeasuredBin14: parseFloat(values?.metersMeasuredBin14, 10),
        //BIN15
        bin15: values.bin15,
        binStock15: parseFloat(values?.metersMeasuredBin15, 10) * filterBin(15),
        metersMeasuredBin15: parseFloat(values?.metersMeasuredBin15, 10),
        //BIN16
        bin16: values.bin16,
        binStock16: parseFloat(values?.metersMeasuredBin16, 10) * filterBin(16),
        metersMeasuredBin16: parseFloat(values?.metersMeasuredBin16, 10),
        //BIN17
        bin17: values.bin17,
        binStock17: parseFloat(values?.metersMeasuredBin17, 10) * filterBin(17),
        metersMeasuredBin17: parseFloat(values?.metersMeasuredBin17, 10),
        //BIN18
        bin18: values.bin18,
        binStock18: parseFloat(values?.metersMeasuredBin18, 10) * filterBin(18),
        metersMeasuredBin18: parseFloat(values?.metersMeasuredBin18, 10),
        //BIN19
        bin19: "Offal",
        binStock19: parseFloat(values?.metersMeasuredBin19, 10) * filterBin(19),
        metersMeasuredBin19: parseFloat(values?.metersMeasuredBin19, 10),
        //BIN20
        bin20: "Offal",
        binStock20: parseFloat(values?.metersMeasuredBin20, 10) * filterBin(20),
        metersMeasuredBin20: parseFloat(values?.metersMeasuredBin20, 10),
        //BIN21
        bin21: "Offal",
        binStock21: parseFloat(values?.metersMeasuredBin21, 10) * filterBin(21),
        metersMeasuredBin21: parseFloat(values?.metersMeasuredBin21, 10),
        //BIN22
        bin22: "Offal",
        binStock22: parseFloat(values?.metersMeasuredBin22, 10) * filterBin(22),
        metersMeasuredBin22: parseFloat(values?.metersMeasuredBin22, 10),
        //BIN23
        bin23: "Offal",
        binStock23: parseFloat(values?.metersMeasuredBin23, 10) * filterBin(23),
        metersMeasuredBin23: parseFloat(values?.metersMeasuredBin23, 10),
        //Conditioning Bin A1
        binA1: "Clean Maize",
        binStockA1: parseFloat(values?.metersMeasuredBinA1, 10) * filterBin(24),
        metersMeasuredBinA1: parseFloat(values?.metersMeasuredBinA1, 10),
        //Conditioning Bin A2
        binA2: "Clean Maize",
        binStockA2: parseFloat(values?.metersMeasuredBinA2, 10) * filterBin(25),
        metersMeasuredBinA2: parseFloat(values?.metersMeasuredBinA2, 10),
        //Conditioning Bin A3
        binA3: "Clean Maize",
        binStockA3: parseFloat(values?.metersMeasuredBinA3, 10) * filterBin(26),
        metersMeasuredBinA3: parseFloat(values?.metersMeasuredBinA3, 10),
        //Conditioning Bin A4
        binA4: "Clean Maize",
        binStockA4: parseFloat(values?.metersMeasuredBinA4, 10) * filterBin(27),
        metersMeasuredBinA4: parseFloat(values?.metersMeasuredBinA4, 10),
        //Conditioning Bin B1
        binB1: "Clean Maize",
        binStockB1: parseFloat(values?.metersMeasuredBinB1, 10) * filterBin(28),
        metersMeasuredBinB1: parseFloat(values?.metersMeasuredBinB1, 10),
        //Conditioning Bin B2
        binB2: "Clean Maize",
        binStockB2: parseFloat(values?.metersMeasuredBinB2, 10) * filterBin(29),
        metersMeasuredBinB2: parseFloat(values?.metersMeasuredBinB2, 10),
        //Conditioning Bin B3
        binB3: "Clean Maize",
        binStockB3: parseFloat(values?.metersMeasuredBinB3, 10) * filterBin(30),
        metersMeasuredBinB3: parseFloat(values?.metersMeasuredBinB3, 10),
        //Conditioning Bin B4
        binB4: "Clean Maize",
        binStockB4: parseFloat(values?.metersMeasuredBinB4, 10) * filterBin(31),
        metersMeasuredBinB4: parseFloat(values?.metersMeasuredBinB4, 10),

        //BIN Section Totals
        //Section A Total
        sectionTotalA:
          parseFloat(values?.metersMeasuredBin1, 10) * filterBin(1) +
          parseFloat(values?.metersMeasuredBin2, 10) * filterBin(2) +
          parseFloat(values?.metersMeasuredBin3, 10) * filterBin(3) +
          parseFloat(values?.metersMeasuredBin4, 10) * filterBin(4) +
          parseFloat(values?.metersMeasuredBin6, 10) * filterBin(6) +
          parseFloat(values?.metersMeasuredBin7, 10) * filterBin(7) +
          parseFloat(values?.metersMeasuredBin8, 10) * filterBin(8) +
          parseFloat(values?.metersMeasuredBin9, 10) * filterBin(9) +
          parseFloat(values?.metersMeasuredBin12, 10) * filterBin(12),
        //Section B Total
        sectionTotalB:
          parseFloat(values?.metersMeasuredBin10, 10) * filterBin(10) +
          parseFloat(values?.metersMeasuredBin11, 11) * filterBin(11),
        //Section C Total
        sectionTotalC:
          parseFloat(values?.metersMeasuredBin5, 10) * filterBin(5) +
          parseFloat(values?.metersMeasuredBin15, 10) * filterBin(15) +
          parseFloat(values?.metersMeasuredBin13, 10) * filterBin(13) +
          parseFloat(values?.metersMeasuredBin14, 10) * filterBin(14) +
          parseFloat(values?.metersMeasuredBin16, 10) * filterBin(16) +
          parseFloat(values?.metersMeasuredBin17, 10) * filterBin(17) +
          parseFloat(values?.metersMeasuredBin18, 10) * filterBin(18),
        //Section D Total
        sectionTotalD:
          parseFloat(values?.metersMeasuredBin19, 10) * filterBin(19) +
          parseFloat(values?.metersMeasuredBin20, 10) * filterBin(20) +
          parseFloat(values?.metersMeasuredBin21, 10) * filterBin(21) +
          parseFloat(values?.metersMeasuredBin22, 10) * filterBin(22) +
          parseFloat(values?.metersMeasuredBin23, 10) * filterBin(23),
        //Section E Total
        sectionTotalE:
          parseFloat(values?.metersMeasuredBinA1, 10) * filterBin(24) +
          parseFloat(values?.metersMeasuredBinA2, 10) * filterBin(25) +
          parseFloat(values?.metersMeasuredBinA3, 10) * filterBin(26) +
          parseFloat(values?.metersMeasuredBinA4, 10) * filterBin(27),
        //Section F Total
        sectionTotalF:
          parseFloat(values?.metersMeasuredBinB1, 10) * filterBin(28) +
          parseFloat(values?.metersMeasuredBinB2, 10) * filterBin(29) +
          parseFloat(values?.metersMeasuredBinB3, 10) * filterBin(30) +
          parseFloat(values?.metersMeasuredBinB4, 10) * filterBin(31),
        //Section E + F Total
        sectionTotalEF:
          parseFloat(values?.metersMeasuredBinA1, 10) * filterBin(24) +
          parseFloat(values?.metersMeasuredBinA2, 10) * filterBin(25) +
          parseFloat(values?.metersMeasuredBinA3, 10) * filterBin(26) +
          parseFloat(values?.metersMeasuredBinA4, 10) * filterBin(27) +
          (parseFloat(values?.metersMeasuredBinB1, 10) * filterBin(28) +
            parseFloat(values?.metersMeasuredBinB2, 10) * filterBin(29) +
            parseFloat(values?.metersMeasuredBinB3, 10) * filterBin(30) +
            parseFloat(values?.metersMeasuredBinB4, 10) * filterBin(31)),

        //Vitamins Payload

        bagInCage: parseFloat(values.bagInCage, 10),
        totalWeightInCage: values.bagInCage * bagWeight,
        //Received
        bagReceived: parseFloat(values.bagReceived, 10),
        totalWeightReceived: values.bagReceived * bagWeight,
        //Super in Mill A
        superVitaminUsedMillA: parseFloat(values?.superVitaminUsedMillA, 10),
        totalWeightSuperMillA: values.superVitaminUsedMillA * bagWeight,
        //Braai Pap in Mill A
        braaiPapVitaminUsedMillA: parseFloat(values?.superVitaminUsedMillA, 10),
        totalWeightBraaiPapMillA: values.superVitaminUsedMillA * bagWeight,
        //Super in Mill B
        superVitaminUsedMillB: parseFloat(values?.superVitaminUsedMillB, 10),
        totalWeightSuperMillB: values.superVitaminUsedMillB * bagWeight,
        //Braai Pap in Mill B
        braaiPapVitaminUsedMillB: parseFloat(
          values?.braaiPapVitaminUsedMillB,
          10
        ),
        totalWeightBraaiPapMillB: values.braaiPapVitaminUsedMillB * bagWeight,

        //MILL A Payload

        //Intake
        intakeScada: filteredIntakeScada(),
        intakeTotal:
          filteredIntakeScada() - parseFloat(lastReport?.intakeTotal, 10),

        //Screening
        screeningScada: filteredScreeningScada(),
        screeningTotal:
          filteredScreeningScada() - parseFloat(lastReport?.screeningTotal, 10),
        screeningPercentage: 0,
        //Dirty Maize
        dirtyMaize: 0,
      };

      console.log("intakeTotal :>> ", lastReport?.intakeTotal);
      console.log("JSON value check ===", reportPayload);

      // Send the form data to the server using your preferred API library (e.g., Axios)

      // await axios.post("http://localhost:4050/addReport", reportPayload);
      // setAlertOpen(true);

      // Handle successful submission
      console.log("Form submitted successfully!");
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
          validationSchema={
            activeStep === 0
              ? StepOneSchema
              : activeStep === 1
              ? StepTwoSchema
              : StepThreeSchema
          }
          validateOnMount
        >
          {({ isSubmitting, values }) => (
            <Form style={{ padding: "2rem" }} onChange={(e) => handleChange(e)}>
              {/* {stepComponents[activeStep]()} */}
              {activeStep === 0 && <StepOne authInfo={authInfo} />}
              {activeStep === 1 && (
                <StepTwo
                  values={values}
                  filterBin={filterBin}
                  binMultipliers={binMultipliers}
                />
              )}
              {activeStep === 2 && <StepThree values={values} />}
              {activeStep === 3 && (
                <StepFour
                  filteredScreeningScada={filteredScreeningScada}
                  filteredIntakeScada={filteredIntakeScada}
                  setLastReport={setLastReport}
                />
              )}
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
