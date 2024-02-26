/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { MdNotes } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Wishlist() {
  const { currentUser } = useSelector((state) => state.user);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productIdsInWIshlist, setProductIdsInWIshlist] = useState([]);

  const navigate = useNavigate();

  const populateWishListedProductIdForCustomer = async () => {
    if (currentUser !== null && currentUser.type === "CUSTOMER") {
      try {
        const res = await axios.get(
          `/api/wishlists/getproductids/customer/${currentUser.id}`
        );
        if (res.status !== 200) {
          console.log(res);
        }
        console.log(res.data);
        setProductIdsInWIshlist(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    populateWishListedProductIdForCustomer();
  }, []);

  const addWishList = async (productId) => {
    if (currentUser === null) {
      navigate("/sign-in");
      return;
    } else if (currentUser.type === "CUSTOMER") {
      try {
        const res = await axios.post("/api/wishlists/add", {
          customerId: currentUser.id,
          productId,
        });
        if (res.status !== 200) {
          console.log(res.response.error.message);
        }
        populateWishListedProductIdForCustomer();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteWishList = async (productId) => {
    if (currentUser === null) {
      navigate("/sign-in");
      return;
    } else if (currentUser.type === "CUSTOMER") {
      try {
        const res = await axios.post("/api/wishlists/delete", {
          customerId: currentUser.id,
          productId,
        });
        console.log(res);
        if (res.status !== 200) {
          console.log(res);
        }
        toast.info(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        populateWishListedProductIdForCustomer();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchWishlistedItems = async () => {
      setLoading(true);
      const res = await axios.get(`/api/wishlists/customer/${currentUser.id}`);
      if (res.status !== 200) {
        setErrors(true);
        setLoading(false);
        console.log(res.response.message);
        return;
      }
      setProducts(res.data);
      setErrors(false);
      setLoading(false);
    };

    fetchWishlistedItems();
  }, []);
  return (
    <>
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="p-3 mt-10 max-w-6xl mx-auto">
        {loading ? (
          "Loading..."
        ) : products && products.length > 0 ? (
          <>
            <h1 className="uppercase text-lg font-bold text-slate-700 mb-2 ml-1">
              My Wishlist{" "}
              <span className="lowercase font-normal ml-1">
                {products.length} items
              </span>
            </h1>
            <hr />
            <div className="flex flex-wrap justify-evenly mt-2">
              {products.map((item, id) => {
                return (
                  <ProductCard
                    addWishListAction={addWishList}
                    deleteWishListAction={deleteWishList}
                    productIds={productIdsInWIshlist}
                    listing={item}
                    key={id}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full h-screen items-center ">
            <p className="mt-28 font-bold text-slate-700 text-lg uppercase">
              YOUR WISHLIST IS EMPTY
            </p>
            <p className="text-lg text-slate-400 w-96 mt-4">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <MdNotes className="text-8xl p-3 text-orange-200 my-8 border-2 rounded-md border-cyan-300" />
            <Link
              to={"/search"}
              className="uppercase border p-3 px-8 mt-4 text-lg font-bold text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white rounded-sm"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
