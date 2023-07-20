import React, { useCallback } from "react";
import axios from "axios";
import { Fragment } from "react";
import { FieldArray, getIn } from "formik";
import { Field, Form, Formik } from "formik";
import { TextField, Box, Typography } from "@material-ui/core";
import { Card } from "@mui/material";
import { object, string } from "yup";
import "./index.css";

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

import {
  Container,
  FilterContainer,
  Table,
  TableContainer,
} from "./quotationCartstyles";

import { Span } from "app/components/Typography";

import { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { useParams, Link } from "react-router-dom";
import formikSchema from "./formikSchema";

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
  // let user = useSelector((state) => state.user);
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
  // let user = useSelector((state) => state.user);
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

  if (error) {
    return <div>Error</div>;
  }

  if (product) {
    console.log("product", product);
    return (
      <div className="MaterialForm">
        <Formik
          {...formikSchema(product)}
          onSubmit={(data) => {
            console.log("Checking...");
            updateOrder({
              method: "PUT",
              url: `http://localhost:4050/quotations/${orderId}`,
              data: {
                salesRepFirstname: authInfo.user.firstName,
                salesRepSurname: authInfo.user.lastName,
                salesRepEmployeeId: "B01",
                salesRepEmail: authInfo.user.username,
                salesOutcomeComments: "Approved with No Comment",
                customerAddress1: data.customerAddress1,
                customerAddress2: data.customerAddress2,
                customerAddress3: data.customerAddress3,
              },
            });
          }}
        >
          {({ submitForm }) => {
            return (
              <Card
                raised={true}
                sx={{
                  boxShadow: 10,
                  padding: 10,
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

                    <Grid container spacing={12}>
                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <div className="title-top">
                          Sales Representative Information
                        </div>
                        <div className="heading">
                          <span>Quote Id: </span> {product.id}
                        </div>
                        <div className="heading">
                          <span>Quote Reference: </span>{" "}
                          {product.orderReference}
                        </div>
                        <div className="heading">
                          <span>First Name(s): </span> {authInfo.user.firstName}
                        </div>
                        <div className="heading">
                          <span>Surname: </span> {authInfo.user.lastName}
                        </div>
                        <div className="heading">
                          <span>Email: </span> {authInfo.user.username}
                        </div>{" "}
                        <div className="heading">
                          <span>Employee ID: </span>{" "}
                          {authInfo.user.salesRepEmployeeId}
                        </div>
                        <div className="heading">
                          <span>Phone Number: </span>
                          {authInfo.user.phoneNumber}
                        </div>
                        <div className="heading">
                          <span>Office Number: </span>
                          {authInfo.user.officeNumber}
                        </div>
                        {/* <Field
                        component={Input}
                        name="t_stamp"
                        label="Employee Id"
                        disabled
                      />
                      <Field
                        component={Input}
                        name="t_stamp"
                        label="Phone Number"
                        disabled
                      />
                      <Field
                        component={Input}
                        name="t_stamp"
                        label="Email"
                        disabled
                      /> */}
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <div className="title-top">Client Information</div>

                        <div className="heading">
                          <span>First Name(s): </span>
                          {product.customerFirstname}
                        </div>
                        <div className="heading">
                          <span>Surname: </span>
                          {product.customerSurname}
                        </div>
                        <div className="heading">
                          <span>Email: </span>
                          {product.customerEmail}
                        </div>
                        <div className="heading">
                          <span>Phone Number: </span>
                          {product.customerPhoneNumber}
                        </div>

                        <div className="heading">
                          <span>Address: </span>
                        </div>

                        <Field component={Input} name="customerAddress1" />
                        <Field component={Input} name="customerAddress2" />
                        <Field component={Input} name="customerAddress3" />
                      </Grid>

                      {/* <Box height={14} /> */}
                      <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                        <div className="title-top">Order Information</div>

                        {/* {product.orderProducts.map((item) => {
                        return <div>{item.qty}</div>;
                      })} */}

                        <TableContainer>
                          <Table>
                            <thead>
                              <tr>
                                <th>Products Names</th>
                                <th>Supplier(s)</th>
                                <th>Quantity</th>

                                <th>Unit Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.orderProducts.map((item) => {
                                return (
                                  <tr key={product.id}>
                                    <td>{item.productName}</td>
                                    <td>Supplier</td>
                                    <td>{item.qty}</td>

                                    <td>R{item.unitPrice}</td>
                                    <td>R{item.subtotal}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                          <Table>
                            <thead>
                              <tr>
                                <th>Products Names</th>
                                <th>
                                  {product.orderTotalExclVAT} Excl VAT -
                                  (T&amp;Cs Apply)
                                </th>
                              </tr>
                            </thead>
                          </Table>
                        </TableContainer>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              getPdf();
                              console.log("haha");
                              submitForm();
                            }}
                          >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                              generate PDF
                            </Span>
                          </Button>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              console.log("Aproving");
                              submitForm();
                            }}
                          >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                              APPROVE
                            </Span>
                          </Button>
                        </Grid>
                        <Grid item lg={12} md={12} sm={6} xs={6} sx={{ mt: 2 }}>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                              console.log("Rejecting");
                              submitForm();
                            }}
                          >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                              REJECT
                            </Span>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Form>{" "}
              </Card>
            );
          }}
        </Formik>
        <Formik
          initialValues={{
            products: [
              { id: "1", quantity: 2, name: "Food", price: 45 },
              { id: "2", quantity: 4, name: "Chemicals", price: 90 },
            ],
          }}
          onSubmit={(v) => {
            console.log("sdfds", v);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <Card
                raised={true}
                sx={{
                  boxShadow: 10,
                  padding: 10,
                  width: 0.9,
                  borderRadius: 10,
                }}
              >
                <FieldArray
                  name="products"
                  render={(arrayHelpers) => {
                    return (
                      <>
                        {values.products.map((product, index) => {
                          const getName = (name) =>
                            `products[${index}].${name}`;
                          const getValue = (name) =>
                            getIn(values, getName(name));
                          return (
                            <>
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                }}
                              >
                                <input value={getValue("id")} disabled />
                                <input
                                  value={getValue("name")}
                                  onChange={(e) =>
                                    setFieldValue(
                                      getName("name"),
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  value={getValue("quantity")}
                                  type="number"
                                  onChange={(e) =>
                                    setFieldValue(
                                      getName("quantity"),
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  value={getValue("price")}
                                  type="number"
                                  onChange={(e) =>
                                    setFieldValue(
                                      getName("price"),
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              id: values.products.length.toFixed(),
                              name: "",
                              price: 0,
                              quantity: 0,
                            })
                          }
                        >
                          Add Product
                        </button>
                      </>
                    );
                  }}
                />
              </Card>
            );
          }}
        </Formik>
      </div>
    );
  }

  return <Loading />;
};

export default ViewOrder;
