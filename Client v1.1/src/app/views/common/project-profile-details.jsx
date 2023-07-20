import Axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const states = [
  {
    value: "Eastern Cape",
    label: "Eastern Cape",
  },
  {
    value: "Free State",
    label: "Free State",
  },
  {
    value: "Gauteng",
    label: "Gauteng",
  },
  {
    value: "KwaZulu-Natal",
    label: "KwaZulu-Natal",
  },
  {
    value: "Limpopo",
    label: "Limpopo",
  },
  {
    value: "Mpumalanga",
    label: "Mpumalanga",
  },
  {
    value: "North West",
    label: "North West",
  },
  {
    value: "Northern Cape",
    label: "Northern Cape",
  },
  {
    value: "Western Cape",
    label: "Western Cape",
  },
];

const cities = [
  { label: "Bela-Bela", value: "Bela-Bela" },
  { label: "Bloemfontein", value: "Bloemfontein" },
  { label: "Cape Town", value: "Cape Town" },
  { label: "Durban", value: "Durban" },
  { label: "East London", value: "East London" },
  { label: "George", value: "George" },
  { label: "Grahamstown", value: "Grahamstown" },
  { label: "Johannesburg", value: "Johannesburg" },
  { label: "Kimberley", value: "Kimberley" },
  { label: "King William's Town", value: "King William's Town" },
  { label: "Klerksdorp", value: "Klerksdorp" },
  { label: "Knysna", value: "Knysna" },
  { label: "Kroonstad", value: "Kroonstad" },
  { label: "Ladysmith", value: "Ladysmith" },
  { label: "Mafikeng", value: "Mafikeng" },
  { label: "Middelburg", value: "Middelburg" },
  { label: "Nelspruit", value: "Nelspruit" },
  { label: "Oudtshoorn", value: "Oudtshoorn" },
  { label: "Paarl", value: "Paarl" },
  { label: "Phalaborwa", value: "Phalaborwa" },
  { label: "Pietermaritzburg", value: "Pietermaritzburg" },
  { label: "Polokwane", value: "Polokwane" },
  { label: "Port Elizabeth", value: "Port Elizabeth" },
  { label: "Port Shepstone", value: "Port Shepstone" },
  { label: "Potchefstroom", value: "Potchefstroom" },
  { label: "Pretoria", value: "Pretoria" },
  { label: "Queenstown", value: "Queenstown" },
  { label: "Randfontein", value: "Randfontein" },
  { label: "Richards Bay", value: "Richards Bay" },
  { label: "Rustenburg", value: "Rustenburg" },
  { label: "Saldanha", value: "Saldanha" },
  { label: "Sasolburg", value: "Sasolburg" },
  { label: "Secunda", value: "Secunda" },
  { label: "Somerset West", value: "Somerset West" },
  { label: "Springs", value: "Springs" },
  { label: "Stellenbosch", value: "Stellenbosch" },
  { label: "Thohoyandou", value: "Thohoyandou" },
  { label: "Uitenhage", value: "Uitenhage" },
  { label: "Ulundi", value: "Ulundi" },
  { label: "Upington", value: "Upington" },
  { label: "Vanderbijlpark", value: "Vanderbijlpark" },
];

const ProjectProfileDetails = ({
  name,
  poNumber,
  supplierProjectNumber,
  votingNumber,
}) => {
  const { projectId } = useParams();
  const [state, setState] = useState({
    name_: name,
    poNumber_: poNumber,
    votingNumber_: votingNumber,
    supplierProjectNumber_: supplierProjectNumber,
  });

  const handleSubmit = async (event) => {
    const data = {
      name: state.name_,
      poNumber: state.poNumber_,
      votingNumber: state.votingNumber_,
      supplierProjectNumber: state.supplierProjectNumber_,
    };
    //we will update the table and form here
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.put(`http://localhost:4050/projects/${projectId}`, data, axiosConfig)
      .then((response) => {
        console.log("Updated successfully", response);
      })
      .catch((e) => {
        console.log("Not updated - Error is: " + e);
      });
  };
  const handleChange = (event) => {
    // event.persist();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const { name_ } = state;

  return (
    <form autoComplete="off" onSubmit={handleSubmit} onError={() => null}>
      <Card>
        <CardHeader title="Editing Product" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="name_"
                id="standard-basic"
                value={name_}
                onChange={handleChange}
                helperText="Edit Product Name here"
                label="Product name"
                fullWidth
                // required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save changes{" "}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProjectProfileDetails;
