import * as yup from "yup";

// const passwordRules =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

export const CustomerProfileSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Name must be at least 5 characters")
    .required("Required"),
  email: yup.string().email("Please enter valid email").required("Required"),
  phoneNumber: yup
    .number()
    .typeError("Phone number must be digits only")
    .min(1000000000, "*phone number must be 10 digits only")
    .max(9999999999, "*phone number must be 10 digits only"),
  password: yup.string().required("Required"),
  type: yup.string().required("Required"),
});
