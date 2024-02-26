// eslint-disable-next-line no-unused-vars
import React from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function ManufacturerVerification() {
  return (
    <div className="">
      <div className="flex flex-col w-full min-h-screen items-center ">
        <GiSandsOfTime className="text-9xl text-yellow-100 mt-40" />
        <p className="mt-4 font-semibold text-slate-500 text-xl">
          Your account is under verification!
        </p>
        <p className="text-sm text-slate-400">
          It can take up to 24 hours for the system to process your request.
        </p>
        <Link
          to={"/sign-in"}
          className="uppercase border p-3 mt-4 text-sm font-semibold text-green-500 border-green-500 hover:bg-green-500 hover:text-white rounded-sm"
        >
          Check Status
        </Link>
      </div>
    </div>
  );
}
