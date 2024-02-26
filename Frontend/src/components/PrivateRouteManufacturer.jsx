/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouteManufacturer() {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  return currentUser !== null && currentUser.type === "MANUFACTURER" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
