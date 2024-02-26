import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "*too short!")
    .max(80, "*too long!")
    .required("*required"),
  description: yup.string().required("*required"),
  actualPrice: yup
    .number()
    .positive()
    .min(1, "*product price should be minimum 1")
    .required("*required"),
  sellingPrice: yup
    .number()
    .positive()
    .min(1, "*product selling price should be minimum 1")
    .max(
      yup.ref("actualPrice"),
      "*selling price must be lesser than or equal to actual product price"
    )
    .required("*required"),
  inventoryCount: yup
    .number()
    .positive()
    .min(1, "*add product")
    .required("*required"),
  gender: yup.string().oneOf(["MEN", "WOMEN"]).required("*required"),
  category: yup
    .string()
    .oneOf([
      "PANT",
      "SHIRT",
      "TSHIRT",
      "DRESS",
      "SAREE",
      "SWEATER",
      "HOODIE",
      "JACKET",
      "TOP",
      "JEANS",
    ])
    .required("*please select category"),
  colors: yup.array().min(1, "*choose at least one").required("*required"),
  sizes: yup.array().min(1, "*choose at least one").required("*required"),
});
