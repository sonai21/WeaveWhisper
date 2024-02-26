import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiPackageDuotone } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { FaShippingFast } from "react-icons/fa";

export default function OrderTracking() {
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [changingStatus, setChangingStatus] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  const fetchOrderedProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/manufacturer/dashboard/getorders/${currentUser.id}`
      );
      if (res.status !== 200) {
        setLoading(false);
        console.log(res.data);
        return;
      }
      setOrderList(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderedProducts();
  }, []);

  const handleOrderStatusChange = async (e, orderId, productId) => {
    console.log(e.target.value);
    console.log(productId);
    console.log(orderId);
    try {
      setChangingStatus(true);
      const res = await axios.post(
        "/api/manufacturer/dashboard/changeorderstatus",
        {
          manufacturerId: currentUser.id,
          productId: productId,
          orderId: orderId,
          orderStatusType: e.target.value,
        }
      );
      if (res.status !== 200) {
        setChangingStatus(false);
        console.log(res);
        return;
      }
      setChangingStatus(false);
      console.log(res.data.message);
      toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
      fetchOrderedProducts();
    } catch (err) {
      console.log(err);
      setChangingStatus(false);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="min-h-screen max-w-4xl mx-auto mb-10">
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      {loading ? (
        "Loading..."
      ) : orderList && orderList.length > 0 ? (
        <div className="flex flex-col">
          <p className="mt-10 ml-1 uppercase font-bold text-xl text-slate-500 mb-2">
            All Orders
          </p>
          <hr />
          <div className="flex flex-col gap-4 w-full mt-5 ">
            {orderList.map((orderItem, index) => (
              <div className="p-3 border rounded-sm bg-gray-50" key={index}>
                <div className="flex flex-row gap-2 items-center">
                  <PiPackageDuotone className="border rounded-full text-3xl text-amber-700 bg-white opacity-50" />
                  <div className="flex flex-col uppercase text-xs text-slate-700 gap-1">
                    <div>
                      <p className="font-semibold uppercase">
                        <span className="">Order Status: </span>
                        <span
                          className={[
                            (orderItem.orderStatus === "DELIVERED" ||
                              orderItem.orderStatus === "CANCELLED") &&
                              "hidden ",
                            " text-yellow-400",
                          ].join("")}
                        >
                          Processing-
                        </span>
                        <span
                          className={[
                            (orderItem.orderStatus === "DELIVERED" ||
                              orderItem.orderStatus === "CANCELLED") &&
                              "hidden ",
                            orderItem.orderStatus === "DISPATCHING" ||
                            orderItem.orderStatus === "SHIPPED"
                              ? " text-yellow-400"
                              : " text-slate-400",
                          ].join("")}
                        >
                          -Dispatching-
                        </span>
                        <span
                          className={[
                            (orderItem.orderStatus === "DELIVERED" ||
                              orderItem.orderStatus === "CANCELLED") &&
                              "hidden ",
                            orderItem.orderStatus === "SHIPPED"
                              ? " text-yellow-400"
                              : " text-slate-400",
                          ].join("")}
                        >
                          -Shipped--
                        </span>
                        <span
                          className={[
                            orderItem.orderStatus === "CANCELLED" && "hidden ",
                            orderItem.orderStatus === "DELIVERED"
                              ? " text-green-400"
                              : " text-slate-400",
                          ].join("")}
                        >
                          Delivered
                        </span>
                        {orderItem.orderStatus === "CANCELLED" && (
                          <span className="text-red-600">Cencelled</span>
                        )}
                      </p>
                    </div>

                    {orderItem.orderStatus === "DELIVERED" ? (
                      <p className="font-semibold text-slate-400 capitalize">
                        <span>Delivered </span>
                        <span className="lowercase">
                          on {orderItem.deliveryDate}
                        </span>
                      </p>
                    ) : (
                      <p className="font-semibold text-slate-400 capitalize">
                        <span>Order Placed </span>
                        <span className="lowercase">
                          on {orderItem.orderDate}
                        </span>
                      </p>
                    )}
                  </div>

                  <p className="ml-auto text-xs text-slate-700">
                    <span className="uppercase font-semibold">
                      Receipt Id:{" "}
                    </span>{" "}
                    {orderItem.receipt}
                  </p>
                </div>
                <div className="border p-3 flex flex-row gap-2 bg-white mt-3">
                  <div className="w-32 md:ml-5">
                    <Link to={`/product/${orderItem.productId}`}>
                      <img
                        className="cursor-pointer max-h-36 object-contain hover:shadow-lg"
                        src={"/api/storage/view/" + orderItem.imageName}
                        alt="product cover"
                      />
                    </Link>
                  </div>

                  <div className="p-1 w-full">
                    <div className="flex flex-col sm:flex-row gap-2 justify-between items-center ">
                      <div className="my-2 flex flex-row items-center gap-4 text-sm">
                        <p className="border p-1 rounded-sm px-3 text-center">
                          Size: {orderItem.size}
                        </p>
                        <p className="border p-1 rounded-sm px-3 text-center ">
                          Color:{" "}
                          <span className="lowercase">{orderItem.color}</span>
                        </p>
                        <div className="border p-1 rounded-sm px-3 flex justify-center ">
                          Qty: 1
                        </div>
                      </div>

                      <div className="flex gap-2 items-center flex-col mb-2">
                        <span className="uppercase text-xs font-semibold text-blue-500">
                          Change Tracking Status
                        </span>
                        <select
                          disabled={changingStatus}
                          className="text-slate-500 font-semibold outline-none border text-xs  p-1 text-center border-blue-500 cursor-pointer hover:shadow-md disabled:shadow-none"
                          name="orderStatusType"
                          onChange={(e) => {
                            handleOrderStatusChange(
                              e,
                              orderItem.orderHistoryId,
                              orderItem.productId
                            );
                          }}
                        >
                          <option value={""}>--select--</option>
                          {orderItem.orderStatus === "PROCESSING" && (
                            <option
                              className="font-semibold"
                              value="DISPATCHING"
                            >
                              DISPATCHING
                            </option>
                          )}
                          {orderItem.orderStatus === "PROCESSING" ||
                          orderItem.orderStatus === "DISPATCHING" ? (
                            <option className="font-semibold " value="SHIPPED">
                              SHIPPED
                            </option>
                          ) : (
                            ""
                          )}

                          {orderItem.orderStatus === "PROCESSING" ||
                          orderItem.orderStatus === "DISPATCHING" ||
                          orderItem.orderStatus === "SHIPPED" ? (
                            <option className="font-semibold" value="DELIVERED">
                              DELIVERED
                            </option>
                          ) : (
                            ""
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="gap-1 font-semibold flex flex-row text-xs text-gray-500 items-start sm:text-sm mt-2 sm:mt-0">
                      <TbTruckDelivery className="text-lg" />
                      <p>
                        <span className="uppercase"> Shipping Details - </span>
                        {orderItem.address} |
                        <span> Contact - {orderItem.phoneNumber}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-screen items-center ">
          <FaShippingFast className="text-[150px] text-green-100 mt-40" />
          <p className="mt-4 font-semibold text-slate-500 text-xl">
            All Products Delivered!
          </p>

          <Link
            to={"/brand-dashboard"}
            className="uppercase border p-3 px-6 mt-4 text-sm font-semibold text-green-500 border-green-500 hover:bg-green-500 hover:text-white rounded-sm"
          >
            Go back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
