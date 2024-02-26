import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PendingManufacturerCard from "../components/PendingManufacturerCard";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom";

export default function VerifyManufacturers() {
  const [manufacturerList, setManufacturerList] = useState([]);

  const fetchPendingManufacturerRegistration = async () => {
    try {
      const res = await axios.get(
        "/api/admin/getrequestedmanufacturerregistration"
      );
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      console.log(res.data);
      setManufacturerList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPendingManufacturerRegistration();
  }, []);

  const registrationRequestsubmit = async (val) => {
    const res = await axios.post(
      "/api/admin/changemanufactureraccountstatus",
      val
    );
    console.log(res);
    if (res.status !== 200) {
      console.log(res);
      return;
    }
    toast.success(res.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setManufacturerList((prev) =>
      prev.filter((item) => item.id !== val.manufacturerId)
    );
  };
  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="my-7 flex flex-col gap-3 max-w-4xl mx-auto items-center min-h-screen p-3">
        {manufacturerList && manufacturerList.length > 0 ? (
          <>
            <p className="flex flex-row gap-2 text-yellow-500 text-4xl items-center">
              <MdOutlinePendingActions />
              <span className="font-semibold capitalize">
                Pending Manufacturer
              </span>
            </p>
            <hr className="w-full" />
            <div className="flex flex-col gap-4 w-full mt-3">
              {manufacturerList.map((item, index) => (
                <PendingManufacturerCard
                  registrationRequestsubmit={registrationRequestsubmit}
                  item={item}
                  key={index}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <MdOutlinePendingActions className="text-9xl text-yellow-100 mt-40" />
            <p className="mt-4 font-semibold text-slate-400 text-xl">
              Looks great! Nothing is pending
            </p>

            <Link
              to={"/admin"}
              className="uppercase border p-3 mt-4 text-sm font-semibold text-green-500 border-green-500 hover:bg-green-500 hover:text-white rounded-sm"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </>
  );
}
