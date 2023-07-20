import React, { useCallback } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField, Box, Typography } from "@material-ui/core";
import { Card } from "@mui/material";
import { object, string } from "yup";
import { SimpleCard } from "app/components";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {
  Avatar,
  Badge,
  Drawer,
  IconButton,
  ThemeProvider,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";

import { FilterContainer, Table, TableContainer } from "./quotationCartstyles";

import { Span } from "app/components/Typography";

import { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { useParams, Link } from "react-router-dom";
import formikSchema from "./formikSchema";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "& span": {
    color: "#9664a6",
  },
  "& #disable": {
    color: theme.palette.text.disabled,
  },
}));

const StyledIconButtonDelete = styled(IconButton)(({ theme }) => ({
  "& span": {
    color: "red",
  },
  "& #disable": {
    color: theme.palette.text.disabled,
  },
}));

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledBox = styled(Box)({
  background: "linear-gradient(to right, #7664a6, #9664a6)",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  color: "#fff",
  textAlign: "center",
});

const useQuery = ({ url = "", params }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const refetch = useCallback(() => {
    if (url) {
      setLoading(true);
      axios({ method: "GET", url, params })
        .then((d) => setData(d.data))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [url, params]);

  useEffect(refetch, [refetch]);

  return { data, loading, error, refetch };
};

const useMutation = (
  { onCompleted, onError } = { onCompleted: () => {}, onError: () => {} }
) => {
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    ({ method = "POST", url, data }) => {
      setLoading(true);
      axios({ method, url, data })
        .then((d) => {
          onCompleted(d.data);
        })
        .catch(onError)
        .finally(() => setLoading(false));
    },
    [onCompleted, onError, setLoading]
  );

  return [mutate, { loading }];
};

const Loading = () => {
  return (
    <>
      <p className="loading">Loading...</p>
    </>
  );
};

const Input = ({ field, label, disabled }) => {
  return (
    <div>
      <p>{label}</p>
      <input disabled={disabled} {...field} />
    </div>
  );
};

const ViewOrder = () => {
  const [id, setId] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  let authInfo = useAuth();
  console.log("User Info", authInfo.user);
  const { orderId } = useParams();
  const {
    data: product,
    error,
    refetch,
  } = useQuery({
    url: `http://localhost:4050/quotations/${orderId}`,
  });

  console.log("Testing Product here", product);

  const getPdf = async () => {
    console.log("Getting PDF");
    const { data } = await axios.get(
      `http://localhost:4050/quotations/${orderId}/pdf`
    );
    console.log("Hello", data);
    console.log("Got PDF");
  };

  const [updateOrder, { loading }] = useMutation({
    onCompleted: () => refetch(),
  });

  const deleteId = (productId, idToBeDeleted) => {
    updateOrder({
      method: "POST",
      url: `http://localhost:4050/quotations/${productId}`,
      data: {
        id: idToBeDeleted,
      },
    });
  };
  const incrementItem = (productId, idToBeDeleted) => {
    updateOrder({
      method: "POST",
      url: `http://localhost:4050/incrementCart/${productId}`,
      data: {
        id: idToBeDeleted,
      },
    });
  };
  const decrementItem = (productId, idToBeDeleted) => {
    updateOrder({
      method: "POST",
      url: `http://localhost:4050/decrementCart/${productId}`,
      data: {
        id: idToBeDeleted,
      },
    });
  };

  if (error) {
    return <div>Error</div>;
  }

  if (product) {
    console.log("product1", product);

    return (
      <div className="MaterialForm">
        <Formik
          {...formikSchema(product)}
          onSubmit={(data) => {
            // Sending email
            console.log("product :>> ", product);
            console.log("data :>> ", data);
            //send Email here
            //Then update order Table
            updateOrder({
              method: "PUT",
              url: `http://localhost:4050/quotations/${orderId}`,
              data: {
                salesRepFirstname: authInfo.user.firstName,
                salesRepSurname: authInfo.user.lastName,
                salesRepEmployeeId: authInfo.user.salesRepEmployeeId,
                salesRepEmail: authInfo.user.username,
                salesOutcomeComments: data.salesOutcomeComments,
                customerAddress1: data.customerAddress1,
                customerAddress2: data.customerAddress2,
                customerAddress3: data.customerAddress3,
                orderStatus: data.orderStatus,
              },
            });
            // To Redirect to another page after an action
            // navigate("/orders");
            return alert("Changes updated successfully");
          }}
        >
          {({ submitForm, values, handleChange }) => {
            const isLast = product.orderProducts.qty === 1;
            console.log("values :>> ", values);
            return (
              <>
                <Container>
                  <ContentBox className="analytics">
                    <Grid container spacing={3}>
                      <SimpleCard
                        raised={true}
                        sx={{
                          boxShadow: 10,
                          padding: 5,
                          width: 0.9,
                          borderRadius: 10,
                        }}
                      >
                        <Form>
                          <div className="top-content">
                            <div className="top-title">
                              <img
                                src="/images/gif/logo-circle.png"
                                width="200px"
                                alt="Loading Products..."
                              />{" "}
                            </div>
                            <div className="top-title">
                              Order {product.id} - {product.orderReference}
                            </div>

                            <Grid container spacing={2}>
                              {/** Sales Representative Information */}
                              <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                              >
                                <StyledBox
                                  sx={{ m: 1, p: 1, alignItems: "center" }}
                                >
                                  <Typography>
                                    Sales Representative Information
                                  </Typography>
                                </StyledBox>

                                <TextField
                                  fullWidth
                                  label="Quote Id"
                                  name="quoteId"
                                  value={product.id}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Quote Reference"
                                  name="quoteRef"
                                  value={product.orderReference}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="First Name(s)"
                                  name="quoteRef"
                                  value={authInfo.user.firstName}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Surname"
                                  name="surname"
                                  value={authInfo.user.lastName}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Email"
                                  name="email"
                                  value={authInfo.user.username}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Employee Id"
                                  name="employeeId"
                                  value={authInfo.user.salesRepEmployeeId}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Phone Number"
                                  name="phoneNumber"
                                  value={authInfo.user.phoneNumber}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Office Number"
                                  name="officeNumber"
                                  onChange={handleChange}
                                  value={authInfo.user.officeNumber}
                                  variant="outlined"
                                  disabled
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              {/** Client Representative Information */}
                              <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{
                                  mt: 2,
                                }}
                              >
                                <StyledBox sx={{ m: 1, p: 1 }}>
                                  <Typography>Client Information</Typography>
                                </StyledBox>

                                <TextField
                                  fullWidth
                                  label="First Name(s)"
                                  name="customerSurname"
                                  onChange={handleChange}
                                  value={values.customerFirstname}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Surname"
                                  name="customerSurname"
                                  onChange={handleChange}
                                  required
                                  value={values.customerSurname}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Email"
                                  name="customerEmail"
                                  onChange={handleChange}
                                  required
                                  value={values.customerEmail}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Phone Number"
                                  name="customerPhoneNumber"
                                  onChange={handleChange}
                                  required
                                  value={values.customerPhoneNumber}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <TextField
                                  fullWidth
                                  label="Client Comment(s)"
                                  name="orderComments"
                                  onChange={handleChange}
                                  required
                                  value={values.orderComments}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <TextField
                                  fullWidth
                                  label="Address Line 1"
                                  name="customerAddress1"
                                  onChange={handleChange}
                                  required
                                  value={values.customerAddress1}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <TextField
                                  fullWidth
                                  label="Address Line 2"
                                  name="customerAddress2"
                                  onChange={handleChange}
                                  required
                                  value={values.customerAddress2}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <TextField
                                  fullWidth
                                  label="Address Line 3"
                                  name="customerAddress3"
                                  onChange={handleChange}
                                  required
                                  value={values.customerAddress3}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />

                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={() => {
                                    console.log("Aproving");
                                    submitForm();
                                  }}
                                  sx={{
                                    background:
                                      "linear-gradient(to right, #7664a6, #9664a6)",
                                    "&:hover": {
                                      background:
                                        "linear-gradient(to right, #7664a6, #7664a6)",
                                    },
                                  }}
                                >
                                  <Icon>save_alt</Icon>
                                  <Span
                                    sx={{
                                      pl: 1,
                                      textTransform: "capitalize",
                                      alignItems: "center",
                                    }}
                                  >
                                    Save Changes
                                  </Span>
                                </Button>
                              </Grid>

                              {/** Product Cart */}
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: 1 }}
                              >
                                <StyledBox
                                  sx={{ m: 1, p: 1, alignItems: "center" }}
                                >
                                  <Typography>Product Information</Typography>
                                </StyledBox>

                                <TableContainer>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>Products Names</th>
                                        <th>Supplier(s)</th>
                                        <th>Quantity</th>

                                        <th>Unit Price</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {product.orderProducts.map((item) => {
                                        return (
                                          <tr key={product.id}>
                                            <td>{item.productName}</td>
                                            <td>{product.orderSuppliers}</td>
                                            <td>
                                              {/** Add Button */}
                                              <StyledIconButton
                                                disabled={item.qty === 1}
                                                size="small"
                                                onClick={() =>
                                                  decrementItem(
                                                    product.id,
                                                    item.id
                                                  )
                                                }
                                              >
                                                <Icon
                                                  sx={{
                                                    cursor: "pointer",
                                                    color: "red",
                                                  }}
                                                  id={
                                                    item.qty === 1 && "disable"
                                                  }
                                                >
                                                  remove_circle
                                                </Icon>
                                              </StyledIconButton>{" "}
                                              {item.qty}{" "}
                                              <StyledIconButton
                                                size="small"
                                                onClick={() =>
                                                  incrementItem(
                                                    product.id,
                                                    item.id
                                                  )
                                                }
                                              >
                                                <Icon
                                                  sx={{
                                                    cursor: "pointer",
                                                    bgColor: "green",
                                                  }}
                                                >
                                                  add_circle
                                                </Icon>
                                              </StyledIconButton>
                                            </td>

                                            <td>R{item.unitPrice}</td>
                                            <td>R{item.subtotal}</td>
                                            <td>
                                              {/** Delete Button */}
                                              <StyledIconButtonDelete
                                                size="small"
                                                onClick={() =>
                                                  deleteId(product.id, item.id)
                                                }
                                              >
                                                <Icon
                                                  fontSize="small"
                                                  sx={{ color: "red" }}
                                                >
                                                  delete
                                                </Icon>
                                              </StyledIconButtonDelete>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                  <Table>
                                    <thead>
                                      <tr>
                                        <th>Total</th>
                                        <th>
                                          {product.orderTotalExclVAT} Excl VAT -
                                          (T&amp;Cs Apply)
                                        </th>
                                      </tr>
                                    </thead>
                                  </Table>
                                </TableContainer>
                              </Grid>

                              {/** Comment Section */}
                              <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                              >
                                <StyledBox
                                  sx={{ m: 1, p: 1, alignItems: "center" }}
                                >
                                  <Typography>
                                    Sales Representative Comment
                                  </Typography>
                                </StyledBox>

                                <TextField
                                  fullWidth
                                  name="salesOutcomeComments"
                                  onChange={handleChange}
                                  required
                                  multiline
                                  rows={4}
                                  value={values.salesOutcomeComments}
                                  variant="outlined"
                                  margin="normal"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              {/* <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                              >
                                <div className="heading">
                                  <span>Quotation Outcome: </span>
                                </div>
                                <Field name="orderStatus" as="select">
                                  <option value="APPROVED">Approved</option>
                                  <option value="PENDING">Pending</option>
                                  <option value="REJECTED">Rejected</option>
                                </Field>
                              </Grid> */}
                              <Grid
                                item
                                lg={10}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                              >
                                <Button
                                  color="primary"
                                  variant="contained"
                                  onClick={() => {
                                    getPdf();
                                    console.log("PDF Generated");
                                    //submitForm();
                                  }}
                                  sx={{
                                    background:
                                      "linear-gradient(to right, #7664a6, #9664a6)",
                                    "&:hover": {
                                      background:
                                        "linear-gradient(to right, #7664a6, #7664a6)",
                                    },
                                  }}
                                >
                                  <Icon>picture_as_pdf</Icon>
                                  <Span
                                    sx={{ pl: 1, textTransform: "capitalize" }}
                                  >
                                    generate PDF
                                  </Span>
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </Form>{" "}
                      </SimpleCard>
                    </Grid>
                  </ContentBox>
                </Container>
              </>
            );
          }}
        </Formik>
      </div>
    );
  }

  return <Loading />;
};

export default ViewOrder;
