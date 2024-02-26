/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { MdManageHistory } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { IoShirtOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  // const [checkWalletBalance, setCheckWalletBalance] = useState(false);
  const [categoryClick, setCategoryClick] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = useRef();
  // const [clickedOutside, setClickedOutside] = useState(false);

  const [CATEGORYENUM, setCATEGORYENUM] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get("/api/products/getcategories");
      if (res.status !== 200) {
        console.log(res);
      }
      console.log(res.data);
      setCATEGORYENUM(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  // const cartCount = cartItems.length;
  const handleCartClick = () => {
    console.log(currentUser);
    if (currentUser === null) {
      navigate("/sign-in");
    } else {
      navigate("/cart");
    }
  };
  const handleWishlistClick = () => {
    console.log(currentUser);
    if (currentUser === null) {
      navigate("/sign-in");
    } else {
      navigate("/wishlist");
    }
  };
  const handleSignOut = () => {
    try {
      dispatch(signOutSuccess());
    } catch (err) {
      console.log(err);
    }
  };

  // const handleWalletClick = () => {};

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    //cleanup function
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const handleClickOutside = (e) => {
    if (!category.current.contains(e.target)) {
      // setClickedOutside(true);
      setCategoryClick(false);
    }
  };
  const handleCategoryClick = () => {
    setCategoryClick(!categoryClick);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search", { state: { searchTerm } });
  };
  console.log(searchTerm);
  return (
    <div
      className={[
        active ? "bg-black text-gray-50 " : "bg-white ",
        " shadow-md p-4 flex flex-row gap-3 items-center justify-between sticky top-0 left-0 z-10 transition-all ease",
      ].join("")}
    >
      <Link to={"/"} className="font-bold sm:ml-10 sm:text-xl">
        <span className={active ? "text-orange-700" : "text-orange-800"}>
          Weave
        </span>
        <span className={active ? "text-slate-300" : "text-slate-700"}>
          Whisper
        </span>
      </Link>
      <div className="font-bold flex gap-8 text-xs">
        {/* <p className="hidden md:inline hover:text-orange-600">MEN</p> */}
        <Link
          to="/search"
          state={{ genders: ["MEN"] }}
          className="capitalize cursor-pointer hidden sm:inline hover:text-orange-600"
        >
          MEN
        </Link>
        {/* <p className="hidden md:inline hover:text-orange-600">WOMEN</p> */}
        <Link
          to="/search"
          state={{ genders: ["WOMEN"] }}
          className="capitalize hidden sm:inline cursor-pointer hover:text-orange-600"
        >
          WOMEN
        </Link>
        <div
          className="hidden md:inline relative"
          onClick={handleCategoryClick}
          ref={category}
        >
          <p className=" hover:text-orange-600 cursor-pointer">CATEGORY</p>
          {categoryClick && (
            <div className="absolute p-6 flex flex-col gap-2 border rounded-md outline-none shadow-md top-6 z-20 bg-white">
              {CATEGORYENUM.map((item, index) => (
                <Link
                  to="/search"
                  state={{ categories: [item.toUpperCase()] }}
                  key={index}
                  className="capitalize cursor-pointer text-gray-400 hover:text-orange-600"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-4 p-2 w-40 md:w-[400px] flex items-center justify-between bg-gray-100 rounded-md focus-within:bg-transparent focus-within:border"
      >
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearch
          onClick={handleSubmit}
          className="text-slate-400 text-xl hover:text-2xl cursor-pointer"
        />
      </form>
      <div className="flex gap-6 sm:mr-10 text-center">
        <Menu>
          <MenuHandler>
            <ul className=" flex flex-col w-fit items-center cursor-pointer hover:text-orange-600">
              <BsPerson className="text-2xl" />
              <li className="text-xs font-semibold">Profile</li>
            </ul>
          </MenuHandler>
          <MenuList className="p-6 flex flex-col gap-[2px] text-gray-600 outline-none shadow-md z-50">
            {currentUser ? (
              <>
                {(currentUser.type === "CUSTOMER" ||
                  currentUser.type === "MANUFACTURER") && (
                  <MenuItem>
                    <Link
                      className="flex items-center gap-4 hover:text-orange-600"
                      to={
                        currentUser.type === "MANUFACTURER"
                          ? "/brand"
                          : "/profile"
                      }
                    >
                      <BsPerson className="text-xl" />
                      <Typography variant="small" className="font-medium">
                        My Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {(currentUser.type === "CUSTOMER" ||
                  currentUser.type === "MANUFACTURER") && (
                  <MenuItem>
                    <Link
                      to={
                        currentUser.type === "MANUFACTURER"
                          ? "/brand"
                          : "/profile"
                      }
                      className="flex items-center gap-4 hover:text-orange-600"
                    >
                      <IoSettingsOutline className="text-xl" />
                      <Typography variant="small" className="font-medium">
                        Edit Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {currentUser.type === "CUSTOMER" && (
                  <MenuItem>
                    <Link
                      className="flex items-center gap-4 hover:text-orange-600"
                      to={"/order-history"}
                    >
                      <LiaShoppingBagSolid className="text-2xl" />
                      <Typography variant="small" className="font-medium">
                        My Orders
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {currentUser.type === "CUSTOMER" && (
                  <MenuItem>
                    <Link
                      className="flex items-center gap-4 hover:text-orange-600"
                      to={"/wallet"}
                    >
                      <IoWalletOutline className="text-2xl" />
                      <Typography variant="small" className="font-medium">
                        My Wallet
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                {currentUser.type === "MANUFACTURER" && (
                  <MenuItem>
                    <Link
                      className="flex flex-nowrap w-fit items-center gap-4 hover:text-orange-600"
                      to={"/brand-dashboard"}
                    >
                      <MdManageHistory className="text-xl" />
                      <Typography variant="small" className="font-medium">
                        Dashboard
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                {currentUser.type === "ADMIN" && (
                  <MenuItem>
                    <Link
                      className="flex flex-nowrap w-fit items-center gap-4 hover:text-orange-600"
                      to={"/admin"}
                    >
                      <IoWalletOutline className="text-2xl" />
                      <Typography variant="small" className="font-medium">
                        Admin Panel
                      </Typography>
                    </Link>
                  </MenuItem>
                )}

                <hr className="my-2 border-blue-gray-50" />
                <MenuItem
                  className="flex items-center gap-4 text-orange-400 hover:text-orange-600"
                  onClick={handleSignOut}
                >
                  <GoSignOut className="text-xl" />
                  <Typography variant="small" className="font-medium">
                    Sign Out
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem className=" text-slate-600 hover:text-orange-600">
                <Link
                  to={"/sign-in"}
                  className="flex items-center flex-row gap-4"
                >
                  <GoSignOut className="text-xl" />
                  <Typography variant="small" className="font-medium">
                    Sign In
                  </Typography>
                </Link>
              </MenuItem>
            )}
          </MenuList>
        </Menu>

        {(currentUser === null || currentUser.type === "CUSTOMER") && (
          <ul
            className=" flex flex-col items-center hover:text-orange-600  cursor-pointer"
            onClick={handleWishlistClick}
          >
            <CiHeart className="text-2xl" />
            <li className="text-xs font-semibold">Wishlist</li>
          </ul>
        )}
        {currentUser && currentUser.type === "MANUFACTURER" && (
          <Link to={"/create-product-listing"}>
            {" "}
            <ul className=" flex flex-col items-center hover:text-orange-600 ">
              <IoShirtOutline className="text-2xl" />
              <li className="text-xs font-semibold">Add Product</li>
            </ul>
          </Link>
        )}
        {currentUser === null || currentUser.type === "CUSTOMER" ? (
          <ul
            className=" flex flex-col items-center hover:text-orange-600 cursor-pointer"
            onClick={handleCartClick}
          >
            <div className="relative">
              <LiaShoppingBagSolid className="text-2xl" />
              <li className="text-xs font-semibold">Bag</li>
            </div>
            {currentUser && currentUser.cartCount > 0 && (
              <span className="bg-green-500 text-white rounded-full w-5 h-5 ml-5 mt-[-5px] absolute text-xs flex items-center justify-center font-semibold">
                {currentUser.cartCount > 9 ? (
                  <span className="text-[10px]">9+</span>
                ) : (
                  currentUser.cartCount
                )}
              </span>
            )}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
