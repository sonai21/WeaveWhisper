/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { signInSchema } from "../schemas/signinValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFaliure,
} from "../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const location = useLocation();
  const toastEffectRan = useRef(false);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    try {
      setLoading(true);
      dispatch(signInStart());
      const res = await axios.post("/api/users/sign-in", values);
      console.log(res);
      if (res.status !== 200) {
        setLoading(false);
        setUserError(res.response.data.message);
        dispatch(signInFaliure());
        return;
      }
      setLoading(false);
      setUserError(null);
      console.log(res.data);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (err) {
      setLoading(false);
      dispatch(signInFaliure());
      if (err.request.status === 403) {
        toast.warn(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        setUserError(err.response.data.message);
      }
      console.log(err.response.data.message);
    }
  };
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit,
    });

  useEffect(() => {
    if (
      toastEffectRan.current === false &&
      location.state != null &&
      location.state.success === true &&
      location.state.message !== null
    ) {
      toast.success(location.state.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return () => {
        toastEffectRan.current = true;
      };
    }
  }, [location.state]);

  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="max-w-lg mx-auto items-center p-3 min-h-screen">
        <h1 className="mt-20 mb-7 font-semibold text-2xl text-center">
          Sign In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className={[
              "border p-3 rounded-lg focus:outline-orange-200",
              errors.email && touched.email && " border-red-600 border-[1.5px]",
            ].join("")}
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 mt-[-12px] text-xs ml-2">
              {errors.email}
            </p>
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
          <button
            type="submit"
            onSubmit={handleSubmit}
            disabled={loading}
            className="bg-black text-white p-3 uppercase rounded-lg hover:opacity-90 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
        {userError && (
          <p className="text-red-600 mt-1 text-xs ml-3">{userError}</p>
        )}
        <div className="flex gap-2 justify-center mt-5">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"} className="text-green-700 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
