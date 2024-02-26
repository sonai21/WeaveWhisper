import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdOutlineRemoveModerator } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AdminHomePage() {
  const [requestedBrands, setRequestedBrands] = useState(null);
  const [activeBrands, setActiveBrands] = useState(null);
  console.log(requestedBrands);
  console.log(activeBrands);
  const fetchListedBrandDetails = async () => {
    try {
      const res = await axios.get("/api/admin/gethomepagedetails");
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      setRequestedBrands(res.data.requestedManufacturerCount);
      setActiveBrands(res.data.activeManufacturerCount);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchListedBrandDetails();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="p-6 m-10 mt-14">
        <p className="text-green-600 font-semibold opacity-70 text-4xl flex items-center gap-1">
          <MdAdminPanelSettings className="text-4xl " /> Admin Dashboard
        </p>
        <hr />
        <div className="flex w-full flex-col md:flex-row gap-10 my-6 mx-auto p-3 items-center ">
          <div className="bg-yellow-50 p-3 w-full flex flex-col items-center mx-auto justify-center gap-3 py-2 h-72">
            <MdOutlineManageHistory className="text-9xl text-yellow-200" />
            <Link
              to="/admin-verify-manufacturer"
              className="border-2 p-3 rounded-sm outline-none hover:bg-yellow-500 border-yellow-500 hover:text-white font-semibold uppercase text-yellow-500"
            >
              Verify Brand
            </Link>
            <div className="">
              <p className="text-blue-400">
                {requestedBrands} pending verification
              </p>
            </div>
          </div>
          <div className="bg-red-50 p-3 w-full flex flex-col items-center mx-auto justify-center gap-3 py-7 h-72">
            <MdOutlineRemoveModerator className="text-9xl text-red-200" />
            <Link
              to="/admin-list-manufacturer"
              className="border-2 p-3 rounded-sm outline-none hover:bg-red-500 border-red-500 hover:text-white font-semibold uppercase text-red-500"
            >
              Remove Registered Brand
            </Link>
            <div className="">
              <p className="text-blue-400">
                {activeBrands}
                {activeBrands <= 1 ? " registered brand" : " registered brands"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
