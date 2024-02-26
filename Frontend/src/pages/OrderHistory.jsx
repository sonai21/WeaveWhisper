/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderHistoryCard from "../components/OrderHistoryCard";
import { ToastContainer, toast } from "react-toastify";
import { RiEmotionSadFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const fetchOreders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/orderhistory/${currentUser.id}`);
      if (res.status !== 200) {
        console.log(res);
        setLoading(false);
      }
      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOreders();
  }, []);
  const handleCancelOrder = async (item) => {
    console.log(item);
    try {
      const res = await axios.post("/api/orderhistory/cancelorder", item);
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      console.log(res.data);
      setOrders((prev) =>
        prev.map((i) => {
          if (i.orderHistoryId === item.orderId) {
            i.orderStatus = "CANCELLED";
          }
          return i;
        })
      );
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleReturnOrder = async (item) => {
    console.log(item);
    try {
      const res = await axios.post("/api/orderhistory/returnorder", item);
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      console.log(res.data);
      setOrders((prev) =>
        prev.map((i) => {
          if (i.orderHistoryId === item.orderId) {
            i.returnStatus = "REQUESTED";
            i.returnAvailable = false;
          }
          return i;
        })
      );
      toast.info(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />

      <div className="p-3 max-w-4xl mx-auto mb-10 min-h-screen">
        {loading ? (
          "Loading....."
        ) : orders && orders.length ? (
          <div className="flex flex-col">
            <p className="mt-10 ml-1 uppercase font-bold text-xl text-slate-500 mb-2">
              All Orders
            </p>
            <hr />
            <div className="flex flex-col gap-4 w-full mt-5 ">
              {orders.map((item, index) => (
                <OrderHistoryCard
                  key={index}
                  orderItem={item}
                  cancelOrder={handleCancelOrder}
                  returnOrder={handleReturnOrder}
                  customerId={currentUser.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-screen items-center ">
            <RiEmotionSadFill className="text-9xl text-blue-100 mt-40" />
            <p className="mt-4 font-semibold text-slate-700 text-xl">
              No orders yet!
            </p>

            <Link
              to={"/search"}
              className="uppercase border p-3 mt-4 text-sm font-semibold text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white rounded-sm"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
