import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("*invalid email").required("*required"),
  password: yup.string().required("*required"),
});
