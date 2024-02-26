/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { BsHandbagFill } from "react-icons/bs";
import { FaTruckArrowRight } from "react-icons/fa6";
import { RiStarSFill } from "react-icons/ri";
import { TbMinusVertical } from "react-icons/tb";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCartSuccess } from "../redux/user/userSlice";

export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const toastEffectRan = useRef(false);
  const { currentUser } = useSelector((state) => state.user);
  const [productDetails, setProductDetails] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [reviews, setReviews] = useState({
    rating: 0,
    review: "",
  });
  console.log(currentUser);
  const [displayImg, setDisplayImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState(false);
  const params = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();
  console.log(productDetails);

  const [cartDetail, setCartDetail] = useState({});
  console.log(cartDetail);

  const handleColorChange = (val) => {
    console.log(val);
    setCartDetail((prev) => ({
      ...prev,
      color: val,
    }));
    setColorError(false);
  };
  const handleSizeChange = (val) => {
    console.log(val);
    setCartDetail((prev) => ({
      ...prev,
      size: val,
    }));
    setSizeError(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/get/${params.productId}`);
        if (res.status !== 200) {
          setLoading(false);
          setErrors(true);
          return;
        }

        console.log(res.data);
        setProductDetails(res.data);
        setDisplayImg(res.data.imageNames[0]);
        setErrors(false);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrors(true);
      }
    };

    fetchProduct();
  }, [params.productId]);
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        if (currentUser !== null && currentUser.type === "CUSTOMER") {
          const resCheckWishlist = await axios.post("/api/wishlists/check", {
            customerId: currentUser.id,
            productId: productDetails.id,
          });
          if (
            resCheckWishlist.status === 200 &&
            resCheckWishlist.data.inWishList === true
          ) {
            setIsWishlist(true);
          }
          if (resCheckWishlist.status === 404) {
            setIsWishlist(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkWishlist();
  }, [productDetails]);

  const handleWishlist = async () => {
    if (currentUser === null) {
      navigate("/sign-in");
      return;
    } else if (!isWishlist) {
      try {
        const res = await axios.post("/api/wishlists/add", {
          customerId: currentUser.id,
          productId: productDetails.id,
        });
        if (res.status !== 200) {
          console.log(res.response.error.message);
        }
        console.log(res.data);
        setIsWishlist(true);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        console.log(err);
      }
      return;
    } else if (isWishlist) {
      try {
        console.log(currentUser);
        console.log(productDetails);
        const res = await axios.post("/api/wishlists/delete", {
          customerId: currentUser.id,
          productId: productDetails.id,
        });
        console.log(res);
        if (res.status !== 200) {
          console.log(res);
        }
        setIsWishlist(false);
        toast.info(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        console.log(err);
      }
      return;
    }
  };
  const handlePostReview = async (e) => {
    e.preventDefault();
    console.log(reviews);
    if (currentUser === null) {
      navigate("/sign-in");
      return;
    }
    try {
      console.log(reviews.review.length);
      if (reviews.review.length === 0) {
        toast.error("Review must contain something!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const res = await axios.post("/api/products/addreview", {
        ...reviews,
        customerFullName: currentUser.fullName,
        productId: productDetails.id,
      });
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      setReviews({ rating: 0, review: "" });
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const resReview = await axios.get(
        `/api/products/getallreview/product/${productDetails.id}`
      );
      if (resReview.status !== 200) {
        console.log(resReview);
      }
      console.log(resReview.data);
      setProductDetails({ ...productDetails, productReviews: resReview.data });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(reviews);
  const handleAddToCart = async () => {
    setAdding(true);
    try {
      if (cartDetail.size === undefined) {
        setSizeError(true);
      }
      if (cartDetail.color === undefined) {
        setColorError(true);
      }
      if (cartDetail.size === undefined || cartDetail.color === undefined) {
        setAdding(false);
        return;
      }
      if (currentUser === null || currentUser === undefined) {
        navigate("/sign-in");
        return;
      }
      const res = await axios.post("/api/cart/add", {
        ...cartDetail,
        productId: productDetails.id,
        customerId: currentUser.id,
      });
      if (res.status !== 201) {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      setColorError(false);
      setSizeError(false);
      setAdding(false);

      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      const res1 = await axios.get(
        `/api/cart/getcount/customer/${currentUser.id}`
      );
      if (res1.status === 200) {
        dispatch(updateCartSuccess(res1.data.cartCount));
      }
    } catch (err) {
      console.log(err);
      setAdding(false);
    }
  };
  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="my-14 mx-10 flex flex-col md:flex-row gap-4 justify-between relative">
        {loading && (
          <p className="text-center my-20 text-2xl mx-auto font-semibold text-black">
            Loading...
          </p>
        )}
        {errors && (
          <p className="text-center my-20 text-2xl mx-auto font-semibold text-gray-500">
            Something went wrong!
          </p>
        )}
        {productDetails && !errors && !loading && (
          <>
            <div className="p-3 flex flex-row flex-1 gap-4">
              <div className="flex flex-col gap-3">
                {productDetails.imageNames.map((image, id) => (
                  <img
                    key={id}
                    src={"/api/storage/view/" + image}
                    alt="product image"
                    className={[
                      "h-32 object-fit w-24 cursor-pointer hover:scale-105 transition-scale duration-300 rounded-sm ",
                      displayImg === image ? "scale-105" : "scale-100",
                    ].join("")}
                    onClick={() => setDisplayImg(image)}
                  />
                ))}
              </div>
              <div>
                <img
                  src={"/api/storage/view/" + displayImg}
                  alt="product image"
                  className="h-[600px] w-[500px]"
                />
              </div>
            </div>
            <div className="flex flex-col p-4 gap-1 flex-1">
              <h1 className="text-xl font-semibold capitalize">
                {productDetails.name}
              </h1>
              <p className="text-md text-gray-400 ">
                {productDetails.brandName}
              </p>
              {productDetails.productReviews.length > 0 && (
                <div
                  onClick={() => {
                    document
                      .getElementById("review")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex flex-row items-center text-slate-500 text-sm px-2 w-fit border rounded-sm p-2 hover:border-slate-700 cursor-pointer"
                >
                  {productDetails.avgRating.toFixed(1)}
                  <RiStarSFill className="text-xl text-yellow-500 ml-1" />
                  <TbMinusVertical className="text-xl" />
                  {productDetails.productReviews.length}
                  <span className="ml-1">
                    {productDetails.productReviews.length === 1
                      ? "Review"
                      : "Reviews"}
                  </span>
                </div>
              )}
              <hr className="my-1" />
              {productDetails.sellingPrice !== productDetails.actualPrice ? (
                <p className="text-lg text-gray-500">
                  MRP
                  <span className="line-through mx-2">
                    Rs. {productDetails.actualPrice}
                  </span>
                  <span className="text-slate-600 font-semibold">
                    {productDetails.sellingPrice}
                  </span>
                  <span className="ml-2 font-normal text-red-400">
                    (
                    {Math.floor(
                      ((productDetails.actualPrice -
                        productDetails.sellingPrice) /
                        productDetails.actualPrice) *
                        100
                    )}
                    % OFF)
                  </span>
                </p>
              ) : (
                <p className="txet-lg text-gray-500">
                  MRP Rs. {productDetails.actualPrice}
                </p>
              )}

              <p className="text-green-500 font-semibold">
                inclusive of all taxes
              </p>
              <p className="my-4 font-semibold">SELECT SIZE & COLOR</p>
              <ul className="flex items-center gap-4 uppercase">
                {productDetails.sizes.map((size) => (
                  <li
                    key={size}
                    className={[
                      cartDetail.size === size
                        ? "text-pink-500  border-pink-500"
                        : "text-slate-600",
                      " border rounded-full h-12 w-12 flex items-center justify-center font-semibold  cursor-pointer hover:border-pink-500 hover:text-pink-500",
                    ].join("")}
                    value={size}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>
              {sizeError && (
                <p className="ml-3 text-red-500 text-sm ">*choose a size</p>
              )}
              <ul className="flex items-center gap-4 mt-2 flex-wrap">
                {productDetails.colors.map((color) => (
                  <li
                    key={color}
                    className={[
                      cartDetail.color === color
                        ? "text-pink-500 border border-pink-500"
                        : "text-slate-600",
                      " capitalize border border-orange-50 rounded-lg p-1 flex items-center justify-center font-semibold  cursor-pointer hover:border-pink-500 hover:text-pink-500 bg-orange-50",
                    ].join("")}
                    value={color}
                    onClick={() => handleColorChange(color)}
                  >
                    {color}
                  </li>
                ))}
              </ul>
              {colorError && (
                <p className="ml-3 text-red-500 text-sm ">*choose a color</p>
              )}

              {currentUser && currentUser.type === "MANUFACTURER" ? (
                <div className="text-blue-600">
                  Stock : {productDetails.inventoryCount} pcs
                </div>
              ) : productDetails.inventoryCount < 6 &&
                productDetails.inventoryCount > 0 ? (
                <div className="text-red-600">
                  Hurry! Only {productDetails.inventoryCount} products left
                </div>
              ) : (
                productDetails.inventoryCount === 0 && (
                  <div className="text-red-600">
                    Sold out! Please revisit after couple of days.
                  </div>
                )
              )}
              {currentUser && currentUser.type === "MANUFACTURER" ? (
                ""
              ) : (
                <div className="flex gap-4 my-5">
                  <button
                    onClick={handleAddToCart}
                    disabled={adding || productDetails.inventoryCount < 1}
                    className="flex items-center uppercase font-bold text-sm p-3 bg-pink-500 text-white w-full max-w-md hover:opacity-90 rounded-md gap-2 justify-center disabled:opacity-70"
                  >
                    <BsHandbagFill className="text-lg" />
                    Add to bag
                  </button>

                  <button
                    onClick={handleWishlist}
                    className="uppercase font-bold text-sm p-3 flex items-center gap-2 border rounded-md w-40 text-slate-600 hover:border-pink-600 justify-center"
                  >
                    {isWishlist ? (
                      <>
                        <IoMdHeart className="text-2xl text-pink-600" />
                        Wishlisted
                      </>
                    ) : (
                      <>
                        <CiHeart className="text-2xl" />
                        Wishlist
                      </>
                    )}
                  </button>
                </div>
              )}

              <hr />
              <div className="text-slate-500 flex gap-4 items-center my-5">
                <FaTruckArrowRight className="text-4xl " />
                <p className="font-semibold">
                  Easy 15 days return & exchange available
                </p>
              </div>
              <p className="text-slate-600">100% Original Products</p>
              <p className="text-slate-500 text-sm mt-3">
                <span className="uppercase font-bold mr-3">Description :</span>
                {productDetails.description}
              </p>
              <p className="text-slate-500 text-sm mt-3">
                <span className="uppercase font-bold mr-3">Vendor :</span>
                {productDetails.brandName}
              </p>
            </div>
          </>
        )}
      </div>
      {productDetails && !errors && !loading && (
        <div
          id="review"
          className="scroll-smooth flex justify-centers mx-auto mb-10 w-full flex-col max-w-lg md:max-w-4xl"
        >
          <div className="border rounded-lg p-3 mt-5">
            <p className="text-lg text-gray-800 font-semibold mb-5">Reviews</p>
            {productDetails.productReviews.length > 0 &&
              productDetails.productReviews.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-2 items-center mb-2">
                    <BsPerson className="text-xl rounded-full bg-blue-200 h-8 w-8 p-1 text-gray-500" />
                    <p className="capitalize text-sm font-medium text-gray-600">
                      {item.customerFullName}{" "}
                      <span className="font-normal text-xs ml-2">
                        {item.createdAt.toString().split("T")[0]}
                      </span>
                    </p>
                  </div>
                  {item.rating > 0 && (
                    <ul className="flex gap-1">
                      {item.rating >= 1 && (
                        <li>
                          <RiStarSFill className="text-xl text-yellow-500" />
                        </li>
                      )}
                      {item.rating >= 2 && (
                        <li>
                          <RiStarSFill className="text-xl text-yellow-500" />
                        </li>
                      )}
                      {item.rating >= 3 && (
                        <li>
                          <RiStarSFill className="text-xl text-yellow-500" />
                        </li>
                      )}
                      {item.rating >= 4 && (
                        <li>
                          <RiStarSFill className="text-xl text-yellow-500" />
                        </li>
                      )}
                      {item.rating === 5 && (
                        <li>
                          <RiStarSFill className="text-xl text-yellow-500" />
                        </li>
                      )}
                    </ul>
                  )}
                  <p className="text-gray-500 text-sm ">{item.review}</p>
                  <hr className="my-5" />
                </div>
              ))}

            {currentUser && currentUser.type === "MANUFACTURER" ? (
              ""
            ) : (
              <form>
                <input
                  className=" border-b-2 w-full hover:outline-none outline-none mt-3 focus:border-blue-200"
                  type="textarea"
                  placeholder="write a review....."
                  name="review"
                  id="review"
                  value={reviews.review}
                  maxLength={500}
                  onChange={(e) =>
                    setReviews({ ...reviews, [e.target.id]: e.target.value })
                  }
                />
                <div className="flex items-center justify-between">
                  <label className="flex gap-4 items-center mt-3">
                    <p className="text-gray-500 font-medium">Rating : </p>
                    <select
                      name="rating"
                      id="rating"
                      className="border rounded-lg p-1 outline-gray-200 cursor-pointer"
                      value={reviews.rating}
                      onChange={(e) =>
                        setReviews({
                          ...reviews,
                          [e.target.id]: e.target.value,
                        })
                      }
                    >
                      <option className="text-slate-500">choose rating</option>
                      <option value={1}>1 </option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </label>
                  <button
                    onClick={handlePostReview}
                    className="uppercase text-blue-500 border p-1 font-semibold border-blue-500 hover:shadow-md rounded-md w-20"
                  >
                    Post
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
