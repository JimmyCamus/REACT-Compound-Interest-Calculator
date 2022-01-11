//import styled from "styled-components";
import { useField } from "formik";
import Control from "./Control.js";
import Label from "./Label.js";
import MyInput from "./MyInput.js";
import ErrorMessage from "./ErrorMessage.js";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Control>
      <Label>{label}</Label>
      <MyInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default Input;
