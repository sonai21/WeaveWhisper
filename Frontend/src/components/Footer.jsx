import React from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

export default function () {
  return (
    <div>
      <div className="flex justify-around mx-14 md:mx-40 items-center mb-2">
        <div className="flex items-center flex-col">
          <FaTruckArrowRight className="text-5xl text-green-300" />
          <p className="uppercase text-sm text-slate-700 font-semibold">
            Easy Exchange
          </p>
        </div>
        <div className="flex items-center flex-col">
          <FaHandHoldingHeart className="text-5xl text-green-300" />
          <p className="uppercase text-sm text-slate-700 font-semibold">
            100% Hand Picked
          </p>
        </div>
        <div className="flex items-center flex-col">
          <FaCheckCircle className="text-5xl text-green-300" />
          <p className="uppercase text-sm text-slate-700 font-semibold">
            Assured Quality
          </p>
        </div>
      </div>
      <div className=" bg-gray-50">
        <div className="p-10 md:mx-32">
          <div className="flex justify-around gap-4 flex-wrap">
            <div className="">
              <h1 className="font-semibold text-slate-700 mb-2">Categories</h1>
              <ul className="text-sm text-slate-500 ">
                <Link to={"/"} className="">
                  <li className="mb-1">Women</li>
                </Link>
                <Link to={"/"} className="">
                  <li className="mb-1">Men</li>
                </Link>
                <Link to={"/"} className="">
                  <li className="mb-1">Kids</li>
                </Link>
                <Link to={"/"} className="">
                  <li className="mb-1">New Arrivals</li>
                </Link>
              </ul>
            </div>
            <div className="">
              <h1 className="font-semibold text-slate-700 mb-2">Links</h1>
              <ul className="text-sm text-slate-500">
                <Link to={"/"} className="">
                  <li className="mb-1">FAQ</li>
                </Link>
                <Link to={"/"} className="">
                  <li className="mb-1">Home</li>
                </Link>
                <Link to={"/"} className="">
                  <li className="mb-1">Stores</li>
                </Link>
              </ul>
            </div>
            <div className="">
              <h1 className="font-semibold text-slate-700 mb-2">About</h1>
              <p className="text-sm text-slate-500 w-72 text-justify">
                WeaveWhisper is not just an online clothing store; it's an
                immersive journey into the world of fashion where every garment
                tells a story. As you enter our digital realm, you'll be greeted
                by a curated collection that transcends trends, blending
                contemporary aesthetics with timeless elegance.
              </p>
            </div>
            <div className="">
              <h1 className="font-semibold text-slate-700 mb-2">Contact</h1>
              <div className="flex flex-row items-center gap-1">
                <IoLogoFacebook />
                <AiFillInstagram />
                <MdEmail />
              </div>
            </div>
          </div>
          <hr className="mt-10 " />
          <p className="mt-10 text-xs text-slate-600">
            <span className="text-lg font-bold text-pink-800">Weave</span>
            <span className="text-lg font-bold text-gray-200 mr-2">
              Whisper{" "}
            </span>
            &copy; Copyright 2024 All rights reserved.{" "}
            <span className="hidden md:inline">
              All transactions on WeaveWhisper are secured by SSL and protected
              via multiple payment gateways.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
