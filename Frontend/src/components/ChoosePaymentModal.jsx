import axios from "axios";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandSuccess } from "../redux/user/userSlice";

export default function ChoosePaymentModal({
  closeModalAction,
  handlePlaceOrderByRazor,
  handlePlaceOrderByWallet,
}) {
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <>
      <div className="fixed top-0 z-40 w-full h-full bg-gray-800 blur opacity-40"></div>
      <div className="fixed p-6 md:max-w-md max-w-sm shadow-lg flex flex-col gap-3 m-auto top-0 left-0 right-0 bottom-0 h-fit z-50 bg-white rounded-md border ">
        <div className="flex flex-row justify-between items-center">
          <span className="text-blue-600 text-xl font-semibold">
            Choose a payment method
          </span>
          <IoClose
            onClick={closeModalAction}
            className="text-3xl hover:text-blue-500 hover:cursor-pointer text-slate-700"
          />
        </div>

        <hr />
        <div className="text-slate-700 flex flex-col gap-2 my-4">
          <button
            onClick={handlePlaceOrderByWallet}
            className=" capitalize border hover:text-white hover:bg-purple-600 text-[17px] border-purple-600 rounded-sm p-3 text-purple-600 font-semibold"
          >
            Pay using wallet
          </button>
          <button
            onClick={handlePlaceOrderByRazor}
            className=" capitalize border hover:text-white hover:bg-purple-600 text-[17px] border-purple-600 rounded-sm p-3 text-purple-600 font-semibold"
          >
            Pay using Razorpay
          </button>
        </div>
      </div>
    </>
  );
}
