/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiShirtFoldedLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandSuccess, signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteBrandModal from "../components/DeleteBrandModal";

export default function ManufacturerProfile() {
  const [loading, setLoading] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);
  const [deleteLoadingItem, setDeleteLoadingItem] = useState(-1);
  const [showListingsError, setShowListingError] = useState(false);
  const [show, setShow] = useState(false);
  const [listings, setListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const openDeleteBrandModal = async () => {
    try {
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeDeleteModal = () => {
    setShowModal(false);
  };

  const handleDeleteBrand = async () => {
    try {
      const res = await axios.delete(`/api/users/delete/${currentUser.id}`);
      if (res.status !== 200) {
        console.log(res.response.data.message);
        setShowModal(false);
        return;
      }
      dispatch(deleteBrandSuccess());
      setShowModal(false);
    } catch (err) {
      console.log(err);
      setShowModal(false);
    }
  };

  const handleListingDelete = async (productId) => {
    try {
      setDeleteLoadingItem(productId);
      const res = await axios.delete(
        `/api/products/delete/${productId}/manufacturer/${currentUser.id}`
      );
      if (res.status !== 200) {
        console.log(res.response.data.message);
        setDeleteLoadingItem(-1);
      }
      toast.info(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setDeleteLoadingItem(-1);
      handleShowListings();
    } catch (err) {
      setDeleteLoadingItem(-1);
      console.log(err.response.data.message);
    }
  };
  const handleShowListings = async () => {
    console.log("hello");
    setListingLoading(true);
    try {
      const res = await axios.get(
        `api/users/products/manufacturer/${currentUser.id}`
      );
      if (res.status !== 200) {
        setShowListingError(true);
        setListingLoading(false);
        console.log(res.response.data.message);
      }
      setListingLoading(false);
      setListings(res.data);
      setShow(true);
    } catch (err) {
      setListingLoading(false);
      console.log(err.response.data.message);
    }
  };
  const handleSignOut = () => {
    try {
      dispatch(signOutSuccess());
    } catch (err) {
      console.log(err);
    }
  };
  console.log(listings);
  // const handleSubmit = () => {};
  console.log(currentUser);
  return (
    <>
      {showModal && (
        <DeleteBrandModal
          closeModalAction={closeDeleteModal}
          handleDeleteBrand={handleDeleteBrand}
        />
      )}
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      <div className="p-6 max-w-5xl mx-auto flex flex-col sm:flex-row gap-2 min-h-screen">
        <div className="p-3 flex flex-col flex-1">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form className="flex flex-col gap-4">
            <PiShirtFoldedLight className="mx-auto text-7xl text-gray-700 bg-gray-100 rounded-full p-3" />
            <input
              type="text"
              defaultValue={currentUser.brandName}
              className=" border p-3 rounded-lg"
              disabled
            />
            <input
              type="email"
              defaultValue={currentUser.email}
              className=" border p-3 rounded-lg"
              disabled
            />
            {/* <input
              type="text"
              defaultValue={currentUser.email}
              className=" border p-3 rounded-lg"
              disabled
            /> */}
            {/* <button
              disabled={loading}
              className=" bg-black text-white rounded-lg p-3 uppercase hover:opacity-85 hover:shadow-lg  disabled:opacity-80"
            >
              {loading ? "Loading..." : "Update Password"}
            </button> */}
          </form>
          <hr className="my-4" />
          <div className="flex justify-between">
            <span
              onClick={openDeleteBrandModal}
              className="text-red-600 cursor-pointer border p-2 rounded-lg border-red-700 hover:shadow-md "
            >
              Delete account
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-600 cursor-pointer border p-2 rounded-lg border-red-700 hover:shadow-md "
            >
              Sign out
            </span>
          </div>
          <p className="text-red-700 mt-5"></p>
          <p className="text-green-700 mt-5"></p>
        </div>
        <div className="p-3 flex flex-col flex-1">
          <Link
            className="border border-[#379237] text-[#379237] hover:bg-[#379237] hover:text-white p-3 rounded-lg uppercase text-center my-4"
            to={"/create-product-listing"}
          >
            Create Listing
          </Link>

          {listingLoading ? (
            <button
              disabled={true}
              onClick={handleShowListings}
              className="bg-green-700 w-full rounded-lg p-3 uppercase text-white hover:shadow-md hover:opacity-90 disabled:opacity-75 mb-3 flex flex-row gap-2 justify-center items-center"
            >
              <div
                className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              />
              <span>Loading...</span>
            </button>
          ) : (
            <button
              onClick={handleShowListings}
              className="bg-green-700 w-full rounded-lg p-3 uppercase text-white hover:shadow-md hover:opacity-90 disabled:opacity-75 mb-3"
            >
              Show Listings
            </button>
          )}

          <p className="text-red-700 mt-5">
            {showListingsError ? "Error showing listings" : ""}
          </p>
          {!listingLoading && show && listings && listings.length < 1 && (
            <p className="text-red-600 text-xs">*No listing to show</p>
          )}
          {!listingLoading && show && listings && listings.length > 0 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold text-center ">
                Your Listings
              </h1>
              {listings.map((listingItem) => (
                <div
                  key={listingItem.id}
                  className="border p-3 shadow-sm flex  items-center justify-between gap-4"
                >
                  <Link to={`/product/${listingItem.id}`}>
                    <img
                      src={"/api/storage/view/" + listingItem.imageName}
                      alt="listing cover"
                      className="h-16 object-contain rounded-sm hover:shadow-md"
                    />
                  </Link>
                  <Link
                    to={`/product/${listingItem.id}`}
                    className="text-slate-700 font-semibold hover:underline truncate w-full flex-1"
                  >
                    <p>{listingItem.name}</p>
                  </Link>

                  <div className="flex flex-col items-center gap-1">
                    <button
                      disabled={deleteLoadingItem === listingItem.id}
                      onClick={() => handleListingDelete(listingItem.id)}
                      className="w-20 bg-red-600 text-white p-1 rounded-md hover:opacity-80 disabled:opacity-70"
                    >
                      Delete
                    </button>

                    <Link to={`/update-product/${listingItem.id}`}>
                      <button className="w-20 border border-yellow-600 p-1 rounded-md text-yellow-600 hover:text-white hover:bg-yellow-600">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
