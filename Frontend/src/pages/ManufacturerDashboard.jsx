/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { RiBillLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenWomenChart from "../components/MenWomenChart";
import { useSelector } from "react-redux";
import axios from "axios";
import StockChart from "../components/StockChart";

export default function ManufacturerDashboard() {
  const [loading, setLoading] = useState(true);
  const [brandInfo, setBrandInfo] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const fetchBrandInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/manufacturer/dashboard/home/${currentUser.id}`
      );
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      setBrandInfo(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBrandInfo();
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="min-h-screen mb-10 max-w-7xl mx-auto">
          <div className="p-6 mt-10">
            <p className=" font-semibold  mb-2 flex items-center gap-1  justify-between">
              <span className="flex flex-row text-2xl text-cyan-400 opacity-90">
                <RiBillLine className="text-4xl " /> My Dashboard
              </span>
              <span className="uppercase text-green-600 opacity-80  border p-2 border-lime-400">
                Total Earnings : {brandInfo.totalEarning}
              </span>
            </p>
            <hr />
          </div>
          <div className="p-6">
            <div className="flex w-full flex-col md:flex-row justify-evenly mx-auto items-center p-3 mb-4 gap-8">
              <div className="h-[400px] w-[400px]">
                <StockChart
                  currentStock={brandInfo.productsTotalCurrentStock}
                  soldItems={brandInfo.productsSold}
                  returnItems={brandInfo.productsReturned}
                />
              </div>
              <div className="h-[400px] w-[400px]">
                <MenWomenChart
                  menListing={brandInfo.menListing}
                  womenListing={brandInfo.womenListing}
                />
              </div>
              {/* <div className="h-[300px] w-[300px] border-2 p-3 flex flex-col items-center mx-auto justify-center gap-2 py-7 rounded-lg border-green-600">
            <p className="text-2xl uppercase font-semibold text-green-600">
              Total Earnings : {brandInfo.totalEarning}
            </p>
          </div> */}
            </div>

            <div className="flex w-full flex-col md:flex-row gap-10 mx-auto p-3 items-center ">
              <div className="bg-cyan-50 p-3 w-full flex flex-col items-center mx-auto justify-center gap-2 py-2 h-72">
                <FaShippingFast className="text-9xl text-cyan-200" />
                <Link
                  to="/brand-dashboard/update-ordertracking"
                  className="border-2 p-3 rounded-sm outline-none hover:bg-cyan-400 border-cyan-400 hover:text-white font-semibold uppercase text-cyan-500"
                >
                  Update Order Tracking
                </Link>
                <p className="text-blue-400">
                  {brandInfo.trackingSoldProductsCount} pending tracking
                </p>
              </div>
              <div className="bg-purple-50 p-3 w-full flex flex-col items-center mx-auto justify-center gap-2 py-7 h-72">
                <TbTruckReturn className="text-9xl text-purple-200" />
                <Link
                  to="/brand-dashboard/update-orderreturn-status"
                  className="border-2 p-3 rounded-sm outline-none hover:bg-purple-400 border-purple-400 hover:text-white font-semibold uppercase text-purple-500"
                >
                  Update Return Status
                </Link>
                <p className="text-blue-400">
                  {brandInfo.returnedProductsCount} pending return
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
