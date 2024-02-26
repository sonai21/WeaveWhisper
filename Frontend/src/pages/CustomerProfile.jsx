/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerProfileSchema } from "../schemas/CustomerProfileSchema";
import { updateCustomerSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const APIkey = import.meta.env.VITE_OPENCAGE_API_KEY;

export default function CustomerProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [showPassword, setShowPassword] = useState(true);
  const [disable, setDisable] = useState(true);
  const [upadte, setUpdate] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const dispatch = useDispatch();
  //FORMIK set up
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      userId: currentUser.id,
      fullName: currentUser.fullName,
      email: currentUser.email,
      password: "",
      type: currentUser.type,
      phoneNumber: currentUser.phoneNumber,
      address: currentUser.address,
      balance: currentUser.balance,
    },
    validationSchema: CustomerProfileSchema,
  });

  const getLocationInfo = (latitude, longitude) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setFieldValue("address", data.results[0].formatted);
          setLocationLoading(false);
        } else {
          console.log("Reverse geolocation request failed.");
          setLocationLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  const success = (pos) => {
    console.log(pos);
    let crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getLocationInfo(crd.latitude, crd.longitude);
  };

  const locationErrors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const handleAddress = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(
            success,
            locationErrors,
            options
          );
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(
            success,
            locationErrors,
            options
          );
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          setLocationLoading(false);
        }
      });
    } else {
      console.log("Geolocation bot supported");
    }
  };

  const handleCancelClick = () => {
    setDisable(true);

    setFieldValue("fullName", currentUser.fullName);
    setFieldValue("email", currentUser.email);
    setFieldValue("password", "");
    setFieldValue(
      "phoneNumber",
      currentUser.phone_number === null ? "" : currentUser.phoneNumber
    );
    setFieldValue(
      "address",
      currentUser.address === null ? "" : currentUser.address
    );
  };

  const handleCustomerProfileUpdate = async () => {
    if (values.password === null || values.password === "") {
      toast.info("Please enter your password to update profile");
      return;
    } else {
      setUpdate(true);
      try {
        const res = await axios.put("/api/users/update", values);
        console.log(res.data);
        if (res.status !== 200) {
          setUpdate(false);
          console.log(res.response);
          if (
            res.response.data.message !== undefined ||
            res.response.data.message !== null
          ) {
            toast.error(res.response.data.message);
          }
          return;
        }

        dispatch(updateCustomerSuccess(res.data));
        toast.success("Profile updated successfully");
        setFieldValue("password", "");
        setDisable(true);
        setUpdate(false);
      } catch (err) {
        console.log(err.response);
        toast.error(err.response.data.message);
        setUpdate(false);
      }
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-3 my-10 flex flex-col">
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="font-semibold   uppercase">
        <p className="text-lg text-slate-900">Hello </p>
        <p className="text-md text-slate-500">{currentUser.fullName}</p>
      </div>
      <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-slate-400" />

      <div className="border p-3 mt-5 flex flex-col px-5">
        <div className="my-5">
          <h2 className="text-gray-700 font-medium text-xl border-b">
            Profile details
          </h2>
          <div className="my-5 flex flex-col sm:flex-row justify-around gap-3 max-w-4xl mx-auto">
            <label className="w-full flex flex-col whitespace-nowrap gap-1">
              <p className="">Name</p>
              <input
                className={[
                  "w-full p-3 border rounded-lg ",
                  errors.fullName && touched.fullName
                    ? " border-red-600 border"
                    : " border-slate-300",
                ].join("")}
                type="text"
                name="fullName"
                value={values.fullName}
                placeholder="your name..."
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disable}
              />
              {errors.fullName && touched.fullName && (
                <div className="text-sm text-red-500">
                  {"*" + errors.fullName}
                </div>
              )}
            </label>
            <label className="w-full flex flex-col whitespace-nowrap gap-1">
              <p className="">Phone Number</p>
              <input
                className={[
                  "w-full p-3 border rounded-lg ",
                  errors.phoneNumber && touched.phoneNumber
                    ? " border-red-600 border"
                    : " border-slate-300",
                ].join("")}
                type="text"
                name="phoneNumber"
                placeholder="your phone number..."
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disable}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="text-sm text-red-500">
                  {"*" + errors.phoneNumber}
                </div>
              )}
            </label>
          </div>
        </div>
        <div className="my-5">
          <h2 className="text-gray-700 font-medium text-xl border-b">
            Account information
          </h2>
          <div className="my-5 flex flex-col sm:flex-row justify-around gap-3 max-w-4xl mx-auto">
            <label className="w-full flex flex-col whitespace-nowrap gap-1">
              <p className="">Email</p>
              <input
                className={[
                  "w-full p-3 border rounded-lg ",
                  errors.email && touched.email
                    ? " border-red-600 border"
                    : " border-slate-300",
                ].join("")}
                type="text"
                name="email"
                placeholder="your email..."
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled="disable"
              />
              {errors.email && touched.email && (
                <div className="text-sm text-red-500">{"*" + errors.email}</div>
              )}
            </label>

            <label className="w-full flex flex-col whitespace-nowrap gap-1">
              <p className="">Password</p>
              <div
                className={[
                  "w-full p-3 border rounded-lg flex flex-row justify-between ",
                  errors.password && touched.password && !disable
                    ? " border-red-600 border"
                    : " border-slate-300",
                  disable ? "bg-stone-100" : "bg-white",
                ].join(" ")}
              >
                <input
                  className={[
                    "w-full outline-none",
                    disable ? "bg-stone-100" : "bg-white",
                  ].join(" ")}
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="type password..."
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={disable}
                />

                <button
                  disabled={disable}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Show
                </button>
              </div>
              {errors.password && touched.password && !disable && (
                <div className="text-sm text-red-500">
                  {"*" + errors.password}
                </div>
              )}
            </label>
          </div>
        </div>
        <div className="my-5">
          <h2 className="text-gray-700 font-medium text-xl border-b">
            Shipping details{" "}
          </h2>
          <div className="my-5 flex flex-col sm:flex-row justify-around gap-3 max-w-4xl mx-auto whitespace-nowrap items-center">
            <label className="w-full flex flex-col whitespace-nowrap gap-1">
              <p className="">Address</p>
              <textarea
                className={[
                  "w-full p-3 border rounded-lg h-40 ",
                  errors.address && touched.address
                    ? " border-red-600 border"
                    : " border-slate-300",
                ].join("")}
                type="text"
                name="address"
                placeholder="your address..."
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disable}
              />
              {errors.address && touched.address && (
                <div className="text-sm text-red-500">
                  {"*" + errors.address}
                </div>
              )}
            </label>
          </div>
        </div>
        {!disable && (
          <button
            onClick={handleAddress}
            disabled={locationLoading}
            className="text-center uppercase text-green-600 font-semibold text-sm p-2 rounded-lg border border-green-600 hover:shadow-md disabled:opacity-50 disabled:shadow-none mx-auto mt-[-25px] mb-5"
          >
            Allow current location
          </button>
        )}
      </div>
      {disable ? (
        <button
          onClick={() => setDisable(false)}
          className="bg-orange-700 font-semibold text-white p-3 rounded-lg hover:opacity-90 uppercase w-full mx-auto mt-10"
        >
          Edit
        </button>
      ) : (
        <div className="flex sm:flex-row gap-4 max-w-6xl justify-between mx-auto items-center mt-10 w-full">
          <button
            onClick={handleCustomerProfileUpdate}
            className="bg-slate-900 font-semibold text-white p-3 rounded-lg hover:opacity-90 uppercase w-full "
          >
            {upadte ? "Updating..." : "Save"}
          </button>
          <button
            onClick={handleCancelClick}
            className="border border-red-700 font-semibold text-red-700 p-3 rounded-lg hover:shadow-lg hover:opacity-90  w-full uppercase"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
