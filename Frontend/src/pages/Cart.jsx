/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CartProductCard from "../components/CartProductCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import RemoveFromCartModal from "../components/RemoveFromCartModal";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiShoppingBag } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  updateBalanceSuccess,
  updateCartSuccess,
} from "../redux/user/userSlice";
import useRazorpay from "react-razorpay";
import { Link, useNavigate } from "react-router-dom";
import ChoosePaymentModal from "../components/ChoosePaymentModal";
const APIkey = import.meta.env.VITE_OPENCAGE_API_KEY;
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cartItem, setCartItem] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [address, setAddress] = useState(currentUser.address);
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const [showChangeContact, setShowChangeContact] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [count, setCount] = useState(0);
  const [placeOrderFlag, setPlaceOrderFlag] = useState(true);
  const [phNoError, setPhNoError] = useState(false);
  const dispatch = useDispatch();
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [paymentProcessingFlag, setPaymentProcessingFlag] = useState(false);
  const [showChoosePaymentModal, setShowChoosePaymentModal] = useState(false);
  console.log(placeOrderFlag);
  const [showAddShippingButton, setShowAddShippingButton] = useState(
    currentUser && currentUser.address ? true : false
  );
  const [showAddContactButton, setShowAddContactButton] = useState(
    currentUser && currentUser.phoneNumber ? true : false
  );
  console.log(currentUser);

  const handleChangeAddress = () => {
    setShowChangeAddress(true);
  };
  const handleRemoveFromCart = (item) => {
    setCartItem(item);
    setShowModal(true);
  };

  const handleMoveToWishList = async () => {
    const customerId = currentUser.id;
    const productId = cartItem.productId;
    try {
      const res = await axios.post("/api/wishlists/add", {
        customerId,
        productId,
      });

      removeFromCart();
      closeModalAction();
    } catch (err) {
      console.log(err);
      console.log(err.request.status);
      if (err.request.status === 409) {
        removeFromCart();
      }
      closeModalAction();
    }
  };
  const removeFromCart = async () => {
    try {
      const res = await axios.delete(
        `/api/cart/${cartItem.cartId}/customer/${currentUser.id}`
      );
      if (res.status !== 200) {
        console.log(res);
        return;
      }
      closeModalAction();
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      fetchCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const closeModalAction = () => {
    setShowModal(false);
    setShowChoosePaymentModal(false);
  };
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/cart/${currentUser.id}`);
      console.log(res);
      if (res.status !== 200) {
        setLoading(false);
        console.log(res);
        return;
      }
      setLoading(false);
      setCartItems(res.data);
      calculateMrps(res.data);
      dispatch(updateCartSuccess(res.data.length));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateMrps = (cartItems) => {
    let totalPrice = 0;
    let totalSellingPrice = 0;
    setPlaceOrderFlag(true);
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].actualPrice;
      totalSellingPrice += cartItems[i].sellingPrice;
      if (cartItems[i].active === false || cartItems[i].inventoryCount === 0) {
        setPlaceOrderFlag(false);
      }
    }
    let totalDiscount = totalPrice - totalSellingPrice;
    setTotalMrp(totalPrice);
    setTotalDiscount(totalDiscount);
  };

  const getLocationInfo = (latitude, longitude) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setNewAddress(data.results[0].formatted);
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  };
  const success = (pos) => {
    console.log(pos);
    let crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getLocationInfo(crd.latitude, crd.longitude);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const handleAddress = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
        }
      });
    } else {
      console.log("Geolocation not supported");
    }
  };

  useEffect(() => {
    if (address === "" || address === null) {
      setShowAddShippingButton(false);
    }
  }, [address, count]);
  useEffect(() => {
    if (phoneNumber === "" || phoneNumber === null) {
      setShowAddContactButton(false);
    }
  }, [phoneNumber, count]);

  const handlePlaceOrderByRazor = async () => {
    try {
      const res = await axios.post("/api/cart/placeorderrequest", {
        customerId: currentUser.id,
        address,
        phoneNumber,
      });
      if (res.status !== 200) {
        //todo:toast msg
        setShowChoosePaymentModal(false);
        return;
      } else {
        setShowChoosePaymentModal(false);
      }
      console.log(res.data);
      const options = {
        key: razorpayKeyId,
        amount: res.data.totalAmount * 100,
        currency: "INR",
        name: "WeaveWhisper",
        description: "Add balance to WeaveWhisper wallet.",
        order_id: res.data.orderId,
        handler: async function (response) {
          try {
            setPaymentProcessingFlag(true);
            console.log(response);
            const res = await axios.post(
              "/api/cart/placeordersuccess",
              response
            );
            if (res.status === 400) {
              setPaymentProcessingFlag(false);
              toast.error(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else if (res.status !== 200) {
              setPaymentProcessingFlag(false);
              toast.error("Something went wrong.", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
            setPaymentProcessingFlag(false);
            dispatch(updateCartSuccess(0));
            navigate("/order-history");
            console.log(res.data);
          } catch (err) {
            console.log(err);
            setPaymentProcessingFlag(false);
            toast.error(err.response.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        },
        prefill: {
          name: res.data.fullName,
          email: res.data.email,
          contact: res.data.phoneNumber,
        },
        notes: {
          address: res.data.address,
        },
        theme: {
          // color: "#3399cc",
          color: "#272829",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        //   console.log("anything");
        //   toast.error("Something went wrong.", {
        //     position: toast.POSITION.TOP_RIGHT,
        //   });
      });

      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (paymentProcessingFlag) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "unset");
    }
  }, [paymentProcessingFlag]);

  const handlePlaceOrderByWallet = async () => {
    const totalAmount = totalMrp - totalDiscount;
    console.log(totalAmount);
    try {
      setPaymentProcessingFlag(true);
      const res = await axios.post("/api/cart/placeorderbywallet", {
        customerId: currentUser.id,
        address,
        phoneNumber,
      });
      if (res.status !== 200) {
        setShowChoosePaymentModal(false);
        toast.error("Payment error", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else {
        setShowChoosePaymentModal(false);
      }
      setPaymentProcessingFlag(false);
      dispatch(updateCartSuccess(0));
      dispatch(updateBalanceSuccess(currentUser.balance - totalAmount));
      console.log(res.data);
      navigate("/order-history");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (
        currentUser.id === null ||
        address === "" ||
        phoneNumber === "" ||
        address === null ||
        phoneNumber === null
      ) {
        toast.warn("Please add address and phone number to place order!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const totalAmount = totalMrp - totalDiscount;
      console.log(totalAmount);

      if (totalAmount > currentUser.balance) {
        handlePlaceOrderByRazor();
      } else {
        setShowChoosePaymentModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      {paymentProcessingFlag && (
        <div className="fixed top-0 z-40 w-full h-full bg-gray-800 blur opacity-40"></div>
      )}
      {showModal && (
        <RemoveFromCartModal
          item={cartItem}
          customerId={currentUser.id}
          closeModalAction={closeModalAction}
          removeFromCart={removeFromCart}
          handleMoveToWishList={handleMoveToWishList}
        />
      )}
      {showChoosePaymentModal && (
        <ChoosePaymentModal
          closeModalAction={closeModalAction}
          handlePlaceOrderByRazor={handlePlaceOrderByRazor}
          handlePlaceOrderByWallet={handlePlaceOrderByWallet}
        />
      )}
      <div className="p-3 max-w-6xl mx-auto mb-10">
        {loading ? (
          "Loading....."
        ) : cartItems && cartItems.length > 0 ? (
          <>
            <p className="text-center font-semibold text-3xl my-7 text-black flex items-center justify-center gap-2">
              <LiaShoppingBagSolid className="text-4xl" /> My Bag
            </p>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col flex-1 gap-4 w-full">
                {!loading &&
                  cartItems &&
                  cartItems.map((item, index) => (
                    <CartProductCard
                      key={index}
                      cartItem={item}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
              </div>
              <div className="flex flex-col flex-1 w-full gap-2 p-3 text-slate-600 pl-4 sm:border-l self-start sticky top-24 ">
                <div className="border p-3 mb-5 gap-2 flex flex-row items-center">
                  {showAddShippingButton ? (
                    <>
                      <div className="flex flex-col gap-2 w-full">
                        <p>
                          Deliver to:{" "}
                          <span className="font-semibold">
                            {currentUser.fullName}
                          </span>
                        </p>

                        {!showChangeAddress && (
                          <p>
                            Address:{" "}
                            <span className="font-semibold text-slate-500">
                              {address}
                            </span>
                          </p>
                        )}
                        {showChangeAddress && (
                          <textarea
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="w-full border outline-none h-28"
                          />
                        )}
                      </div>
                      <div className=" flex flex-col gap-2">
                        {showChangeAddress ? (
                          <>
                            <button
                              onClick={() => {
                                setAddress(newAddress);
                                console.log(address);
                                console.log(newAddress);
                                setNewAddress("");
                                setCount(count + 1);
                                setShowChangeAddress(false);
                              }}
                              className="rounded-sm border uppercase text-xs p-2 font-semibold text-green-400 border-green-400 cursor-pointer hover:shadow-md"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleAddress}
                              className="rounded-sm border uppercase text-xs p-2 font-semibold text-green-400 border-green-400 cursor-pointer hover:shadow-md"
                            >
                              Current Location
                            </button>
                            <button
                              onClick={() => {
                                setNewAddress("");
                                setShowChangeAddress(false);
                                if (address === "" || address === null) {
                                  setShowAddShippingButton(false);
                                }
                              }}
                              className="rounded-sm border uppercase text-xs p-2 font-semibold text-red-400 border-red-400 cursor-pointer hover:bg-red-500 hover:text-white"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handleChangeAddress}
                            className="border uppercase text-xs p-2 font-semibold text-orange-400 border-orange-400 cursor-pointer hover:shadow-md"
                          >
                            Change Address
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setShowAddShippingButton(true);
                        setShowChangeAddress(true);
                      }}
                      className="border mx-auto w-full uppercase text-sm p-2 font-semibold text-orange-400 border-orange-400 cursor-pointer hover:shadow-md"
                    >
                      Add Shipping Address
                    </button>
                  )}
                </div>
                <div className="border p-3 mb-5 justify-between flex flex-row items-center gap-4">
                  {showAddContactButton ? (
                    !showChangeContact ? (
                      <>
                        <p>
                          Contact:{" "}
                          <span className="font-semibold text-slate-500">
                            {phoneNumber}
                          </span>
                        </p>
                        <button
                          onClick={() => {
                            setShowChangeContact(true);
                          }}
                          className="border uppercase text-xs p-2 font-semibold text-orange-400 border-orange-400 cursor-pointer hover:shadow-md"
                        >
                          Change Phone Number
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="enter shipping contact number..."
                          className="outline-none w-full p-2 border"
                          maxLength={10}
                          value={newPhoneNumber}
                          onChange={(e) => {
                            setNewPhoneNumber(e.target.value);
                            !isFinite(e.target.value) ||
                            e.target.value.length !== 10
                              ? setPhNoError(true)
                              : setPhNoError(false);
                          }}
                        />

                        <button
                          disabled={phNoError}
                          onClick={() => {
                            setPhoneNumber(newPhoneNumber);
                            setNewPhoneNumber("");
                            setShowChangeContact(false);
                            setCount(count + 1);
                          }}
                          className="rounded-sm border disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none uppercase text-xs p-2 font-semibold text-green-400 border-green-400 cursor-pointer hover:shadow-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setNewPhoneNumber("");
                            if (phoneNumber === "" || phoneNumber === null) {
                              setShowAddContactButton(false);
                            }
                            setShowChangeContact(false);
                          }}
                          className="rounded-sm border uppercase text-xs p-2 font-semibold text-red-400 border-red-400 cursor-pointer hover:bg-red-500 hover:text-white"
                        >
                          Cancel
                        </button>
                      </>
                    )
                  ) : (
                    <button
                      onClick={() => {
                        setShowAddContactButton(true);
                        setShowChangeContact(true);
                      }}
                      className="border mx-auto w-full uppercase text-sm p-2 font-semibold text-orange-400 border-orange-400 cursor-pointer hover:shadow-md"
                    >
                      Add Contact No
                    </button>
                  )}
                </div>
                <hr />
                {cartItems && cartItems.length > 0 && (
                  <>
                    <p className="uppercase font-bold">
                      Price Details (
                      <span className="lowercase">
                        {cartItems.length} items
                      </span>
                      )
                    </p>
                    <div className="flex flex-row justify-between">
                      <p>Total MRP</p>
                      <p className="flex flex-row items-center">
                        <FaIndianRupeeSign className="text-xs" />
                        {totalMrp}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Discount on MRP</p>
                      <p className="text-green-500 flex flex-row items-center">
                        -<FaIndianRupeeSign className="ml-1 text-xs" />
                        {totalDiscount}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Platform Fee</p>
                      <p className="text-green-500">FREE</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Shipping Fee</p>
                      <p className="text-green-500">FREE</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between font-bold">
                      <p>Total Amount</p>
                      <p className="flex flex-row items-center">
                        <FaIndianRupeeSign className="text-xs" />
                        {totalMrp - totalDiscount}
                      </p>
                    </div>
                    <button
                      disabled={!placeOrderFlag}
                      onClick={handlePlaceOrder}
                      className="uppercase p-3 bg-pink-600 rounded-sm text-white font-semibold hover:opacity-90 disabled:opacity-70 outline-none"
                    >
                      place order
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full min-h-screen items-center ">
            <HiShoppingBag className="text-9xl text-orange-100 mt-40" />
            <p className="mt-4 font-semibold text-slate-700 text-xl">
              Hey, it feels so light!
            </p>
            <p className="text-sm text-slate-400">
              There is nothing in your bag. Let's add some items.
            </p>
            <Link
              to={"/wishlist"}
              className="uppercase border p-3 mt-4 text-sm font-semibold text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white rounded-sm"
            >
              Add items from wishlist
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
