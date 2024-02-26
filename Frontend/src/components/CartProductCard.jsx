/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { PiArrowUDownLeftFill } from "react-icons/pi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function CartProductCard({ cartItem, handleRemoveFromCart }) {
  //   console.log(cartItem);
  const discount = cartItem.actualPrice - cartItem.sellingPrice;
  const [unavailable, setUnavailable] = useState(
    cartItem.brandName === null || cartItem.inventoryCount === 0 ? true : false
  );

  return (
    <>
      <div
        className={[
          unavailable && "bg-gray-50 opacity-80 ",
          " border p-3 flex flex-row gap-2",
        ].join("")}
      >
        <div className="w-32">
          <Link to={`/product/${cartItem.productId}`}>
            <img
              className="cursor-pointer max-h-40 object-contain hover:shadow-lg"
              src={"/api/storage/view/" + cartItem.imageName}
              alt="product cover"
            />
          </Link>
        </div>
        <div className="p-1">
          <p className="font-semibold truncate w-full text-slate-800">
            {cartItem.brandName}
          </p>
          <p className="text-md text-slate-700 truncate w-full">
            {cartItem.name}
          </p>
          <div className="my-2 flex flex-row items-center gap-4 text-sm">
            <p className="border p-1 rounded-sm px-3 text-center">
              Size: {cartItem.size}
            </p>
            <p className="border p-1 rounded-sm px-3 text-center ">
              Color: {cartItem.color}
            </p>
            <div className="border p-1 rounded-sm px-3 flex justify-center ">
              Qty: 1
              {/* <select className="outline-none cursor-pointer">
          <option value="1" selected>
            1
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> */}
            </div>
          </div>
          <p className="truncate text-sm text-slate-700 font-bold flex gap-2 place-items-baseline ">
            Rs. {cartItem.sellingPrice}{" "}
            {cartItem.sellingPrice !== cartItem.actualPrice && (
              <>
                <span className="line-through text-xs font-normal text-gray-500">
                  Rs. {cartItem.actualPrice}
                </span>
                <span className="text-xs font-normal text-red-400 flex flex-row items-center">
                  (<FaIndianRupeeSign /> {discount} OFF)
                </span>
              </>
            )}
          </p>

          {cartItem.brandName === null && (
            <p className="flex items-baseline gap-2 mt-3 text-red-600">
              <IoWarningOutline className="text-xl" /> Currently unavailable!
              Please remove it from cart
            </p>
          )}

          {cartItem.brandName !== null && cartItem.inventoryCount === 0 && (
            <p className="flex items-baseline gap-2 mt-3 text-yellow-600">
              <IoWarningOutline className="text-xl" /> Sold out! Please remove
              it from cart
            </p>
          )}

          <div className="flex flex-row gap-2 items-center my-2">
            <PiArrowUDownLeftFill className="border border-black p-[2px] rounded-full text-lg text-slate-600" />
            <p className="text-slate-600 text-sm">
              <span className="font-semibold">15 days</span> return available
            </p>
          </div>
        </div>
        <div
          className="flex ml-auto"
          onClick={() => handleRemoveFromCart(cartItem)}
        >
          <RxCross2 className="text-2xl cursor-pointer transition-all ease-in-out duration-200 hover:text-red-500 hover:scale-125" />
        </div>
      </div>
    </>
  );
}
