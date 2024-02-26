import React, { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex w-full flex-col items-center ">
      <BiSolidError className="text-[150px] text-yellow-400 mt-40 opacity-20" />
      <p className="mt-4 font-semibold text-slate-400 text-2xl">
        Error, Page not found!
      </p>
      <Link
        to={"/"}
        className="uppercase border p-3 mt-4 text-sm font-semibold opacity-90 text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-white rounded-sm"
      >
        Go back to home page
      </Link>
    </div>
  );
}
