"use client";
import React from "react";

import { Formik, Form, Field,FieldProps  } from "formik";

import "@/app/dashboard/globalDashboard.scss";

const SearchForm = () => {
  const ValueHandle = (value:any)=>{
    console.log("value",value);
  }
  
  return (
    <Formik
      initialValues={{
        search: "",
      }}
      onSubmit={(values) => {
      }}
    >
      {({ values, setValues }) => (
        <Form className="d-flex">
          <label htmlFor="search" className="text-gray me-1">Search:</label>
          <Field name="search">
            {(fieldProps: FieldProps<string>) => (
              <input
                type="search"
                id="search"
                className="text-gray search-input outline-none w-100"
                name={fieldProps.field.name}
                value={fieldProps.field.value}
                onChange={(e) => {
                  fieldProps.form.setFieldValue(fieldProps.field.name, e.target.value);
                  ValueHandle(e.target.value);
                }}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
