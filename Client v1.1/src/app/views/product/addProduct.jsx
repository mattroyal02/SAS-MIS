import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const StepOneSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
});

const initialValues = {
  productName: "",
};

const StepOne = () => {
  return (
    <Card>
      <Typography variant="h4" sx={{ pl: 3, pt: 2, pb: 2 }}>
        Add a product to the Bin Dips Product List
      </Typography>

      <Box p={3}>
        <Field name="productName">
          {({ field, meta }) => (
            <TextField
              {...field}
              fullWidth
              label="Product Name"
              variant="outlined"
              error={meta.touched && meta.error}
              helperText={meta.touched && meta.error ? meta.error : ""}
            />
          )}
        </Field>
      </Box>
    </Card>
  );
};

export default function ProductForm() {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const jsonData = {
        name: values.productName,
      };

      await axios.post("http://localhost:4050/addProduct", jsonData);

      console.log("Product added successfully!", jsonData);
      setSuccess(true);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAlertClose = () => {
    setSuccess(false);
    navigate("/products"); // Replace "/" with the desired home page URL
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={StepOneSchema}
      >
        <Form>
          <StepOne />

          <Box pt={2}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting || success}
            >
              Add Product
            </Button>
          </Box>
        </Form>
      </Formik>

      {success && (
        <Box mt={2}>
          <Alert severity="success" onClose={handleAlertClose}>
            <AlertTitle>Success</AlertTitle>
            Product added successfully!
          </Alert>
        </Box>
      )}
    </Box>
  );
}
