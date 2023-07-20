import { TextField } from "@mui/material";
import axios from "axios";
import { Field, Formik } from "formik";
const Test = () => {
  const initialValues = {
    name: "sean",
    formName: "item 1",
    file: null,
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("file", values.file);
          axios.post("http://localhost:4050/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }}
      >
        {({ values, handleChange, submitForm }) => {
          console.log(values);
          return (
            <div style={{ padding: "2rem" }}>
              <Field
                as={TextField}
                name="name"
                label="Name"
                value={values.name}
                onChange={(e) =>
                  handleChange({
                    target: { name: "name", value: e.target.value },
                  })
                }
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleChange({ target: { name: "file", value: file } });
                }}
              />
              <button type="button" onClick={submitForm}>
                Submit
              </button>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Test;
