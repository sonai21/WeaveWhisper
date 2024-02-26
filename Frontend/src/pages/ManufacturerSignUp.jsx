/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { manufacturerSignUpSchema } from "../schemas/manufacturerSignupValidation";
import axios from "axios";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log(values);

    try {
      setLoading(true);
      const res = await axios.post("/api/users/sign-up", values);
      if (res.status !== 201) {
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(res.data);
      navigate("/manufacturer-verification");
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
      setSignupError(err.response.data.message);
    }
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        brandName: "",
        email: "",
        password: "",
        confirm_password: "",
        panNumber: "",
        type: "MANUFACTURER",
      },
      validationSchema: manufacturerSignUpSchema,
      onSubmit,
    });
  console.log(values);
  return (
    <div className="max-w-lg mx-auto items-center p-3">
      <h1 className="my-7 font-semibold text-2xl text-center">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className={[
            "border p-3 rounded-lg focus:outline-orange-200",
            errors.brandName &&
              touched.brandName &&
              " border-red-600 border-[1.5px]",
          ].join("")}
          type="text"
          placeholder="brand name"
          id="brandName"
          name="brandName"
          value={values.brandName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.brandName && (
          <p className="text-red-500 mt-[-12px] text-xs ml-2">
            {errors.brandName}
          </p>
        )}
        <input
          className={[
            "border p-3 rounded-lg focus:outline-orange-200",
            errors.email && touched.email && " border-red-600 border-[1.5px]",
          ].join("")}
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 mt-[-12px] text-xs ml-2">{errors.email}</p>
        )}
        <input
          className={[
            "border p-3 rounded-lg focus:outline-orange-200",
            errors.password &&
              touched.password &&
              " border-red-600 border-[1.5px]",
          ].join("")}
          type="password"
          placeholder="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p className="text-red-500 mt-[-12px] text-xs ml-2">
            {errors.password}
          </p>
        )}
        <input
          className={[
            "border p-3 rounded-lg focus:outline-orange-200",
            errors.confirm_password &&
              touched.confirm_password &&
              " border-red-600 border-[1.5px]",
          ].join("")}
          type="password"
          placeholder="confirm password"
          id="confirm_password"
          name="confirm_password"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirm_password && touched.confirm_password && (
          <p className="text-red-500 mt-[-12px] text-xs ml-2">
            {errors.confirm_password}
          </p>
        )}

        <input
          className={[
            "border p-3 rounded-lg focus:outline-orange-200",
            errors.panNumber &&
              touched.panNumber &&
              " border-red-600 border-[1.5px]",
          ].join("")}
          type="text"
          placeholder="pan number"
          id="panNumber"
          name="panNumber"
          value={values.panNumber.toUpperCase()}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.panNumber && touched.panNumber && (
          <p className="text-red-500 mt-[-12px] text-xs ml-2">
            {errors.panNumber}
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-black text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
        >
          Sign up
        </button>
      </form>
      {signupError && (
        <p className="text-red-600 text-sm ml-5 mt-1">*{signupError}</p>
      )}
      <div className="flex gap-2 justify-center mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"} className="text-green-700 hover:underline">
          Sign In
        </Link>
      </div>

      <div className="text-center my-8">
        <span> Want to buy products? </span>
        <Link to={"/sign-up"} className="text-orange-700 hover:underline">
          Sign Up as a Customer
        </Link>
      </div>
    </div>
  );
}
