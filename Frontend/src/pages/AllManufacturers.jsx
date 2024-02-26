import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SiSymantec } from "react-icons/si";
import { Link } from "react-router-dom";
import DeleteBrandModal from "../components/DeleteBrandModal";
import { RiEmotionSadFill } from "react-icons/ri";

export default function AllManufacturers() {
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState();

  console.log(showModal);

  const openDeleteBrandModal = async (id) => {
    try {
      console.log(id);
      setSelectedBrandId(id);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const res = await axios.delete(`/api/users/delete/${selectedBrandId}`);
      if (res.status !== 200) {
        console.log(res.response.data.message);
        setShowModal(false);
        return;
      }
      setShowModal(false);
      fetchAllBrands();
    } catch (err) {
      console.log(err);
      setShowModal(false);
    }
  };

  const closeDeleteModal = () => {
    setShowModal(false);
  };

  const fetchAllBrands = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/getallmanufacturers");
      console.log(res.data);
      if (res.status !== 200) {
        setLoading(false);
        return;
      }
      setBrandList(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <div className="min-h-screen">
      {showModal && (
        <DeleteBrandModal
          handleDeleteBrand={handleDeleteBrand}
          closeModalAction={closeDeleteModal}
        />
      )}
      <ToastContainer newestOnTop={true} className="top-16 w-fit" />
      {loading === true ? (
        "Loading...."
      ) : (
        <>
          <div className="my-7 flex flex-col gap-3 max-w-4xl mx-auto items-center min-h-screen p-3">
            {brandList && brandList.length > 0 ? (
              <>
                <p className="flex flex-row gap-2 text-green-500 text-4xl items-center opacity-70">
                  <SiSymantec />
                  <span className="font-semibold capitalize">
                    Registered Brands
                  </span>
                </p>
                <hr className="w-full" />
                <div className="flex flex-col gap-4 w-full mt-3">
                  {brandList.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row p-4 gap-10 border-2 items-center rounded-sm justify-between pr-10"
                    >
                      <div className="flex flex-col gap-2 p-3 font-semibold text-slate-700">
                        <span>Brand Name : {item.brandName}</span>
                        <span>Email : {item.email}</span>
                        <span>Pan Number : {item.panNumber}</span>
                        <span>Registered On : {item.createdDate}</span>
                      </div>
                      <div className="flex flex-col gap-3 items-center">
                        <button
                          className="outline-none uppercase font-semibold p-2 border text-red-600 border-red-600 w-20 rounded-sm hover:text-white hover:bg-red-600"
                          onClick={() => {
                            openDeleteBrandModal(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <RiEmotionSadFill className="text-9xl text-blue-100 mt-40" />
                <p className="mt-4 font-semibold text-slate-400 text-xl">
                  No registered brands yet!
                </p>

                <Link
                  to={"/admin"}
                  className="uppercase border p-3 mt-4 text-sm font-semibold text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white rounded-sm"
                >
                  Go to Dashboard
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
