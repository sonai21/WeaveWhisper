import axios from "axios";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function RemoveFromCartModal({
  item,
  closeModalAction,
  removeFromCart,
  handleMoveToWishList,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <>
      <div className="fixed top-0 z-40 w-full h-full bg-gray-800 blur opacity-40"></div>
      <div className="fixed p-3 md:max-w-lg max-w-sm shadow-lg flex flex-col gap-1 m-auto top-0 left-0 right-0 bottom-0 h-fit z-50 bg-white rounded-md border ">
        <div className="flex flex-row gap-4 pb-2 border-b">
          <img
            className="w-10"
            src={"/api/storage/view/" + item.imageName}
            alt="product cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm md:text-[16px] font-semibold text-slate-900">
              Remove from cart
            </p>
            <p className="text-sm md:text-[16px]  text-slate-800">
              Are you sure you want to remove this item from cart?
            </p>
          </div>
          <IoClose
            onClick={closeModalAction}
            className="text-3xl sm:text-3xl ml-auto hover:text-green-500 hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-row text-[13px] sm:text-sm font-semibold items-center ">
          <button
            onClick={removeFromCart}
            className="uppercase w-full text-pink-600 hover:text-white hover:bg-pink-600 p-2"
          >
            Remove
          </button>
          <button
            onClick={handleMoveToWishList}
            className="uppercase w-full text-gray-600 border border-white hover:text-gray-900 hover:border-slate-600 p-2"
          >
            Move to wishlist
          </button>
        </div>
      </div>
    </>
  );
}
