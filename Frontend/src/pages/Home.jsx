/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { Button } from "@material-tailwind/react";

export default function Home() {
  SwiperCore.use([Navigation, Autoplay]);
  const images = [
    "https://images.pexels.com/photos/1200637/pexels-photo-1200637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1146813/pexels-photo-1146813.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-6">
        <div className="flex-1 md:w-1/2">
          <div className="flex flex-col gap-6 p-3 py-28  mx-auto ">
            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
              Crafting <span className="text-slate-500">stories,</span>
              <br />
              one strand at a time
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm">
              WaeveWhisper is not just an online clothing store..
              <br />
              it's an immersive journey into the world of fashion where every
              garment tells a story.
            </div>
            <Link
              to={"/search"}
              className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
            >
              Let's explore...
            </Link>
          </div>
        </div>

        <div className="flex-1 md:w-1/2 md:p-3">
          {/* swiper */}
          <Swiper navigation autoplay={{ delay: 3000 }}>
            {images.map((item) => (
              <SwiperSlide key={item}>
                <div
                  style={{
                    background: `url(${item}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={item}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:p-3 md:mx-6 my-5 md:flex-row">
        <div className="h-[70vh] w-full flex flex-1 relative items-center justify-center">
          <img
            className="h-full w-full object-cover opacity-90"
            src="https://images.pexels.com/photos/769731/pexels-photo-769731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="absolute flex flex-col   gap-4">
            <p className="text-white font-semibold uppercase text-6xl">
              Chic Shirt
            </p>
            <Link
              to="/search"
              state={{ categories: ["SHIRT"] }}
              className="p-3 px-6 uppercase w-fit mx-auto hover:shadow-lg outline-none hover:text-black text-lg text-gray-500 bg-white rounded-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="h-[70vh] w-full flex flex-1 relative items-center justify-center">
          <img
            className="h-full w-full object-cover opacity-90"
            src="https://images.pexels.com/photos/1146813/pexels-photo-1146813.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="absolute flex flex-col   gap-4">
            <p className="text-white font-semibold uppercase text-6xl">
              New Dress
            </p>
            <Link
              to="/search"
              state={{ categories: ["DRESS"] }}
              className="p-3 px-6 uppercase w-fit mx-auto hover:shadow-lg outline-none hover:text-black text-lg text-gray-500 bg-white rounded-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="h-[70vh] w-full flex flex-1 relative items-center justify-center">
          <img
            className="h-full w-full object-cover opacity-90"
            src="https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="absolute flex flex-col   gap-4">
            <p className="text-white font-semibold uppercase text-6xl">
              Classic Jeans
            </p>
            <Link
              to="/search"
              state={{ categories: ["JEANS"] }}
              className="p-3 px-6 uppercase w-fit mx-auto hover:shadow-lg outline-none hover:text-black text-lg text-gray-500 bg-white rounded-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-20 flex flex-col gap-4 md:p-3 md:px-8 my-5 md:flex-row h-[500px] w-full">
        <div
          style={{
            background: `url("https://images.pexels.com/photos/450212/pexels-photo-450212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center no-repeat`,
            backgroundSize: "cover",
          }}
          className=" opacity-95 h-[500px] w-full flex-1 flex flex-col gap-6 justify-center items-center"
        >
          <p className="text-6xl font-semibold">MEN</p>
          <p className="bg-white opacity-70 p-2 rounded-md mt-[-16px]">
            Explore the wide range of men's fashion.
          </p>
          <Link
            to="/search"
            state={{ genders: ["MEN"] }}
            className="uppercase p-3 bg-black text-white px-6 hover:opacity-90"
          >
            SHOP NOW
          </Link>
        </div>
        <div
          style={{
            background: `url("https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center no-repeat`,
            backgroundSize: "cover",
          }}
          className=" opacity-95 h-[500px] w-full flex-1 flex flex-col gap-6 justify-center items-center"
        >
          <p className="text-6xl font-semibold">WOMEN</p>
          <p className="bg-white opacity-70 p-2 rounded-md mt-[-16px]">
            Explore the wide range of women's fashion.
          </p>
          <Link
            to="/search"
            state={{ genders: ["WOMEN"] }}
            className="uppercase p-3 bg-black text-white px-6 hover:opacity-90"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
