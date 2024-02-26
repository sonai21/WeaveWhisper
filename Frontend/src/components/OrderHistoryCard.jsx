import React from "react";
import { Link } from "react-router-dom";
import { PiPackageDuotone } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";

export default function OrderHistoryCard({
  orderItem,
  cancelOrder,
  customerId,
  returnOrder,
}) {
  console.log(orderItem);
  const orderDetails = {
    customerId: customerId,
    orderId: orderItem.orderHistoryId,
    productId: orderItem.productId,
  };
  console.log(orderDetails);

  return (
    <div className="p-3 border rounded-sm bg-gray-50">
      <div className="flex flex-row gap-2 items-center">
        <PiPackageDuotone className="border rounded-full text-3xl text-amber-700 bg-white opacity-50" />
        <div className="flex flex-col uppercase text-xs text-slate-700 gap-1">
          {orderItem.returnStatus === "NOTREQUESTED" ? (
            <>
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
            </>
          ) : (
            <>
              <p className="font-semibold uppercase">
                <span className="">Return Status: </span>
                <span
                  className={[
                    orderItem.returnStatus === "RETURNED" && "hidden ",
                    " text-yellow-400",
                  ].join("")}
                >
                  REQUESTED--
                </span>
                <span
                  className={[
                    orderItem.returnStatus === "RETURNED"
                      ? " text-blue-400"
                      : " text-slate-400",
                  ].join("")}
                >
                  RETURNED
                </span>
              </p>
            </>
          )}
          {orderItem.orderStatus === "DELIVERED" ? (
            <p className="font-semibold text-slate-400 capitalize">
              <span>Delivered </span>
              <span className="lowercase">on {orderItem.deliveryDate}</span>
            </p>
          ) : (
            <p className="font-semibold text-slate-400 capitalize">
              <span>Order Placed </span>
              <span className="lowercase">on {orderItem.orderDate}</span>
            </p>
          )}
        </div>

        <p className="ml-auto text-xs text-slate-700">
          <span className="uppercase font-semibold">Receipt Id: </span>{" "}
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
            <div className="">
              <p className="font-semibold truncate w-full text-slate-800">
                {orderItem.brandName}
              </p>
              <p className="text-md text-slate-700 truncate w-full">
                {orderItem.name}
              </p>
              <div className="my-2 flex flex-row items-center gap-4 text-sm">
                <p className="border p-1 rounded-sm px-3 text-center">
                  Size: {orderItem.size}
                </p>
                <p className="border p-1 rounded-sm px-3 text-center ">
                  Color: <span className="lowercase">{orderItem.color}</span>
                </p>
                <div className="border p-1 rounded-sm px-3 flex justify-center ">
                  Qty: 1
                </div>
              </div>
            </div>

            <div className="">
              {orderItem.orderStatus === "PROCESSING" && (
                <button
                  onClick={() => {
                    cancelOrder(orderDetails);
                  }}
                  className="uppercase text-sm font-semibold text-red-600 border-red-600 border p-1 rounded-sm px-3 flex justify-center hover:bg-red-600 hover:text-white "
                >
                  Cancel Order
                </button>
              )}
              {orderItem.returnAvailable && (
                <button
                  onClick={() => {
                    returnOrder(orderDetails);
                  }}
                  className="uppercase text-sm font-semibold text-blue-600 border-blue-600 border p-1 rounded-sm px-3 flex justify-center hover:bg-blue-600 hover:text-white "
                >
                  RETURN
                </button>
              )}
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
  );
}
