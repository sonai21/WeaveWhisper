/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { RiStarSFill } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { TbMinusVertical } from "react-icons/tb";
import { IoMdHeart } from "react-icons/io";

export default function ProductCard({
  listing,
  productIds,
  addWishListAction,
  deleteWishListAction,
}) {
  // console.log(listing);
  console.log(productIds);
  const discount = Math.floor(
    ((listing.actualPrice - listing.sellingPrice) / listing.actualPrice) * 100
  );
  return (
    <div className="bg-white hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[250px] my-5 rounded-md">
      <Link to={`/product/${listing.id}`}>
        <div className="relative">
          <img
            src={"/api/storage/view/" + listing.imageName}
            alt="product cover"
            className="h-[350px] sm:h-[280px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
          {listing.inventoryCount === 0 && (
            <div className="absolute top-0 right-0">
              <div className="w-36 h-8 absolute top-6 -right-8">
                <div className="h-full w-full bg-red-500 text-white text-center leading-8 font-semibold transform rotate-45">
                  Sold Out
                </div>
              </div>
            </div>
          )}

          {listing.reviewCount > 0 && (
            <div className="absolute bottom-1 left-2 gap-1 flex flex-row items-center text-slate-800 bg-white opacity-80 px-2 w-fit rounded-sm text-sm">
              {listing.avgRating.toFixed(1)}
              <RiStarSFill className="text-md text-green-500" />
              <TbMinusVertical />
              {listing.reviewCount}
              <span className="">
                {listing.reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col w-full mx-auto">
        <div className="flex flex-row items-center justify-between">
          <p className="truncate text-md font-semibold text-slate-900">
            {listing.brandName}
          </p>
          <span className="transition-all ease-in-out duration-300 hover:scale-125">
            {productIds.includes(listing.id) ? (
              <IoMdHeart
                onClick={() => {
                  deleteWishListAction(listing.id);
                }}
                className="text-2xl text-pink-600 hover:cursor-pointer"
              />
            ) : (
              <CiHeart
                onClick={() => {
                  addWishListAction(listing.id);
                }}
                className="text-2xl hover:text-pink-500 hover:cursor-pointer"
              />
            )}
          </span>
        </div>
        <p className="truncate text-md text-slate-500">{listing.name}</p>
        <p className="truncate text-sm text-slate-700 font-bold flex gap-2 place-items-baseline ">
          Rs. {listing.sellingPrice}{" "}
          {listing.sellingPrice !== listing.actualPrice && (
            <>
              <span className="line-through text-xs font-normal text-gray-500">
                Rs. {listing.actualPrice}
              </span>
              <span className="text-xs font-normal text-red-400">
                {" "}
                ({discount}% OFF)
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
