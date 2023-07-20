import "../Styles.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from "@mui/material/MenuItem";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Title = styled("span")(() => ({
  fontSize: "1.25rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
  padding: "1rem",
  color: "#9664a6",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "1.475rem",
  padding: "1rem",
  color: theme.palette.text.secondary,
}));

const ContactUsForm = ({ names, telephone, email, message }) => {
  const [state, setState] = useState({
    names: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [queryType, setQueryType] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleChange = (event) => {
    // event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleChangeQuery = (event) => {
    setQueryType(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (recaptchaValue) {
      console.log("Form is submitted", recaptchaValue);
      const data = {
        queryType: queryType,
        names: state.names,
        email: state.email,
        phoneNumber: state.phoneNumber,
        message: state.message,
      };
      // console.log("data :>> ", data);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      Axios.post("http://localhost:4050/queryEmail", data, axiosConfig)
        .then((response) => {
          console.log("Email sent successfully", response);
        })
        .catch((e) => {
          console.log("Not sent - Error", e);
        });
    } else {
      console.log("Form sumission failed: reCAPTCHA is invalid");
    }
  };

  const queryTypes = [
    {
      value: "General Query",
      label: "General Query",
    },
    {
      value: "Product Query",
      label: "Product Query",
    },
    {
      value: "Speak to an Expert Query",
      label: "Get in touch with an Expert",
    },
  ];

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <Title>What is your query about?</Title>
            <TextField
              required
              id="standard-basic"
              select
              onChange={handleChangeQuery}
              errorMessages={["this field is required"]}
              helperText="Please specify the nature of your query"
            >
              {queryTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Title>Tell us who you are</Title>
            <TextField
              required
              type="text"
              name="names"
              id="standard-basic"
              value={state.names || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              helperText="Firstname and Surname"
            />
            <TextField
              required
              type="email"
              name="email"
              id="standard-basic"
              value={state.email || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              helperText="Please enter your email adddress"
            />
            <TextField
              reuired
              type="tel"
              name="phoneNumber"
              id="standard-basic"
              value={state.phoneNumber || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              lhelperText="Please enter your phone number"
            />
            <Title>Please type your query/message</Title>
            <TextField
              required
              name="message"
              id="standard-basic"
              value={state.message || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              helperText="Query/message"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <ReCAPTCHA
          sitekey="6LfCi30kAAAAABl9cFgS84DVls3AnecXqQimS-od"
          onChange={(value) => setRecaptchaValue(value)}
        />
        <br />
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "#9664a6",
              color: "white",
            },
          }}
          color="inherit"
          variant="contained"
          type="submit"
        >
          <Icon>check_circle</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ContactUsForm;
