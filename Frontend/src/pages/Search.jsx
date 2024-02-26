/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Formik, useFormik } from "formik";
import { useSelector } from "react-redux";
import { VscTriangleLeft } from "react-icons/vsc";
import { VscTriangleRight } from "react-icons/vsc";

export default function Search() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [sortBy, setSortBy] = useState("LATEST");
  const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState(false);
  const [productIdsInWIshlist, setProductIdsInWIshlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageNumber, setPageNmber] = useState(1);
  const [offset, setOffset] = useState(8);
  const [categoryClick, setCategoryClick] = useState(false);
  const [brandClick, setBrandClick] = useState(false);
  const [colorClick, setColorClick] = useState(false);
  const [allBrands, setAllBrands] = useState([]);
  const [COLORENUM, setCOLORENUM] = useState([]);
  const [maxPageNo, setMaxPageNo] = useState(1);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const [CATEGORYENUM, setCATEGORYENUM] = useState([]);
  const [SIZEENUM, setSIZEENUM] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    fetchAllProducts();
  }, [count]);
  const onSubmit = async () => {
    setPageNmber(1);
    setCount(count + 1);
    console.log({
      ...values,
      pageNumber,
      offset,
    });
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      searchTerm: "",
      genders: [],
      colors: [],
      sizes: [],
      categories: [],
      priceMin: 0,
      priceMax: 9999999,
      brandNames: [],
    },
    onSubmit,
  });

  console.log(values);

  const handleCategoryClick = () => {
    setCategoryClick(!categoryClick);
  };
  const handleColorClick = () => {
    setColorClick(!colorClick);
  };
  const handleBrandClick = () => {
    setBrandClick(!brandClick);
  };
  const fetchAllProducts = async (state) => {
    console.log(values);
    console.log(state);
    try {
      setLoading(true);
      const res =
        state === undefined
          ? await axios.post("/api/products", {
              ...values,
              pageNumber,
              offset,
              sortBy,
            })
          : await axios.post("/api/products", {
              ...state,
              pageNumber,
              offset,
              sortBy,
            });
      if (res.status !== 200) {
        setLoading(false);
        console.log(res);
      }
      setLoading(false);
      console.log(res.data);
      setProducts(res.data.productSearchResponseDto);
      setTotalElements(res.data.totalElements);
      setMaxPageNo(Math.ceil(res.data.totalElements / res.data.offset));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(values);
  useEffect(() => {
    console.log(location);
    if (location.state !== null) {
      if (location.state.searchTerm) {
        setFieldValue("searchTerm", location.state.searchTerm);
      } else if (location.state.categories) {
        setFieldValue("categories", location.state.categories);
      } else if (location.state.genders) {
        setFieldValue("genders", location.state.genders);
      }
      fetchAllProducts(location.state);
    } else {
      fetchAllProducts();
    }
  }, [location, sortBy]);

  const onProductClick = () => {
    // TODO need to work on it, ISSUE when user clicks back button from product page to search page.
    console.log("onProductClickAction hit");
    location.state = null;
  };

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
        populateWishListedProductIdForCustomer();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchAllBrands = async () => {
    try {
      const res = await axios.get("/api/products/get/manufacturer/brandnames");
      if (res.status !== 200) {
        console.log(res);
      }
      // console.log(res.data);
      setAllBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllColors = async () => {
    try {
      const res = await axios.get("/api/products/getcolors");
      if (res.status !== 200) {
        console.log(res);
      }
      console.log(res.data);
      setCOLORENUM(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllSizes = async () => {
    try {
      const res = await axios.get("/api/products/getsizes");
      if (res.status !== 200) {
        console.log(res);
      }
      console.log(res.data);
      setSIZEENUM(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    fetchAllBrands();
    fetchAllSizes();
    fetchAllCategories();
    fetchAllColors();
  }, []);
  // console.log(products);
  const handleClearFilter = () => {
    setFieldValue("searchTerm", "");
    setFieldValue("genders", []);
    setFieldValue("colors", []);
    setFieldValue("sizes", []);
    setFieldValue("categories", []);
    setFieldValue("priceMin", 0);
    setFieldValue("priceMax", 999999);
    setFieldValue("brandNames", []);
    location.state = null;
    fetchAllProducts();
  };
  console.log(sortBy);
  return (
    <div className="flex flex-col md:flex-row mb-10 min-h-screen">
      <div className=" border-b-2 md:w-72 md:min-h-screen md:sticky md:top-20 md:h-fit">
        <div className=" border-b-2 ">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className=" flex items-center gap-2 mx-5 mt-5">
              <label className="whitespace-nowrap font-semibold">
                Search Term :{" "}
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-2 w-full"
                value={values.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between ml-5 mr-3 mb-[-15px] mt-5">
              <h1 className="font-bold">FILTERS</h1>
              <button
                className="text-xs font-semibold text-red-400 hover:text-red-600"
                onClick={handleClearFilter}
              >
                CLEAR ALL
              </button>
            </div>
            <hr />
            <div className=" flex flex-col gap-2 my-[-15px] mx-5 text-sm font-semibold text-slate-800">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="genders"
                  id="genders"
                  className="w-[16px] accent-black"
                  value={"MEN"}
                  onChange={handleChange}
                  checked={values.genders.includes("MEN")}
                />
                <p>Men</p>
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="genders"
                  id="genders"
                  className="w-[16px] accent-black"
                  value={"WOMEN"}
                  onChange={handleChange}
                  checked={values.genders.includes("WOMEN")}
                />
                <p>Women</p>
              </label>
            </div>

            <hr />
            <div className=" flex flex-col gap-2 my-[-15px] mx-5">
              <div
                className="font-bold text-[13px] text-gray-800 mb-2 flex justify-between cursor-pointer"
                onClick={handleBrandClick}
              >
                BRAND <span className="text-lg">{brandClick ? "-" : "+"}</span>
              </div>
              {brandClick &&
                allBrands.map((brand) => (
                  <>
                    <label className="flex gap-3 cursor-pointer" key={brand}>
                      <input
                        type="checkbox"
                        name="brandNames"
                        id="brandNames"
                        className="w-4 accent-black"
                        value={brand}
                        onChange={handleChange}
                        checked={values.brandNames.includes(brand)}
                      />
                      <p className="text-xs">{brand}</p>
                    </label>
                  </>
                ))}
            </div>
            <hr />
            <div className="relative flex flex-col gap-2 mt-[-15px] mx-5 mb-3">
              <p className="font-bold text-[13px] text-gray-800 mb-2">
                PRICE{" "}
                <span className="ml-3 text-gray-500">
                  0 - {values.priceMax}
                </span>
              </p>
              <input
                name="priceMax"
                type="range"
                min="0"
                max="9000"
                id="priceMax"
                className="cursor-pointer w-full outline-none focus:outline-none "
                value={values.priceMax}
                onChange={handleChange}
              />
              <span className="text-xs text-gray-500 absolute start-0 -bottom-6">
                Rs. 0
              </span>
              <span className="text-xs text-gray-500 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                3000
              </span>
              <span className="text-xs text-gray-500 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                6000
              </span>
              <span className="text-xs text-gray-500 absolute end-0 -bottom-6">
                9000
              </span>
            </div>
            <hr />
            <div className=" flex flex-col gap-2 my-[-15px] mx-5">
              <div
                className="font-bold text-[13px] text-gray-800 mb-2 flex justify-between items-center cursor-pointer"
                onClick={handleCategoryClick}
              >
                CATEGORY{" "}
                <span className="text-lg">{categoryClick ? "-" : "+"}</span>
              </div>
              {categoryClick &&
                CATEGORYENUM.map((item) => (
                  <>
                    <label className="flex gap-3 cursor-pointer" key={item}>
                      <input
                        type="checkbox"
                        name="categories"
                        id="categories"
                        className="w-4 accent-black"
                        value={item}
                        onChange={handleChange}
                        checked={values.categories.includes(item)}
                      />
                      <p className="text-[13px] capitalize">{item}</p>
                    </label>
                  </>
                ))}
            </div>
            <hr />
            <div className=" flex flex-wrap gap-6 my-[-15px] mx-5 items-center">
              <p className="font-bold text-[13px] text-gray-800">SIZE</p>
              {SIZEENUM.map((item) => (
                <label
                  className="flex gap-1 cursor-pointer items-center whitespace-nowrap"
                  key={item}
                >
                  <input
                    type="checkbox"
                    name="sizes"
                    id="sizes"
                    className="w-4 h-4 accent-black"
                    value={item}
                    onChange={handleChange}
                    checked={values.sizes.includes(item)}
                  />
                  <p className="text-[13px] capitalize">{item}</p>
                </label>
              ))}
            </div>

            <hr />
            <div className=" flex flex-col gap-2 my-[-15px] mx-5">
              <div
                className="font-bold text-[13px] text-gray-800 mb-2 flex justify-between cursor-pointer"
                onClick={handleColorClick}
              >
                COLOR <span className="text-lg">{colorClick ? "-" : "+"}</span>
              </div>
              {colorClick &&
                COLORENUM.map((item) => (
                  <>
                    <label className="flex gap-3 cursor-pointer" key={item}>
                      <input
                        type="checkbox"
                        name="colors"
                        id="colors"
                        className="w-4 accent-black"
                        value={item}
                        onChange={handleChange}
                        checked={values.colors.includes(item)}
                      />
                      <p className="text-[13px] capitalize">{item}</p>
                    </label>
                  </>
                ))}
            </div>
            <hr />

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black text-white uppercase hover:opacity-90 m-2 p-3 disabled:opacity-75"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 md:border-l-2 overflow-y-auto">
        <div className="border-b p-3 mt-3 flex flex-row items-center justify-between">
          <p className="text-2xl font-semibold  text-slate-700 ">
            Listing Results:{" "}
            <span className="text-slate-500">{totalElements} items found</span>
          </p>
          <div className="flex items-center gap-2 ">
            <label className="font-semibold">Sort By :</label>
            <select
              id="sortBy"
              name="sortBy"
              defaultValue={"LATEST"}
              className="border rounded-lg p-2 text-gray-700 outline-none cursor-pointer"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value={"LATEST"}>Latest</option>
              <option value={"OLDEST"}>Oldest</option>
              <option value={"PRICE_DESC"}>Price high to low</option>
              <option value={"PRICE_ASC"}>Price low to high</option>
            </select>
          </div>
        </div>
        <div className="p-3 flex flex-wrap justify-evenly">
          {!loading && products.length === 0 && (
            <p className="text-2xl text-slate-400 text-center mt-36 w-full">
              Sorry!! Nothing found!
            </p>
          )}
          {loading && (
            <p className="text-xl text-slate-600 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            products &&
            products.map((product) => {
              return (
                <ProductCard
                  onClick={onProductClick}
                  addWishListAction={addWishList}
                  deleteWishListAction={deleteWishList}
                  productIds={productIdsInWIshlist}
                  key={product.id}
                  listing={product}
                />
              );
            })}
        </div>
        {/* pagination */}
        {totalElements > offset && (
          <div className="flex flex-row items-center justify-center my-10 gap-6">
            <button
              onClick={() => {
                setPageNmber(pageNumber - 1);
                setCount(count + 1);
              }}
              disabled={pageNumber === 1}
              className="text-4xl  p-1 items-center justify-center cursor-pointer disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed  text-pink-500 hover:shadow-lg"
            >
              <VscTriangleLeft />
            </button>

            <p className="gap-2 flex flex-row items-center">
              <span className="font-semibold  bg-slate-100 text-blue-500 w-10 text-center p-2 ">
                {pageNumber}
              </span>
              <span className="font-bold text-blue-300">OF</span>
              <span className="font-semibold bg-slate-100 text-blue-500 w-10 text-center p-2 ">
                {maxPageNo}
              </span>
            </p>
            <button
              onClick={() => {
                setPageNmber(pageNumber + 1);
                setCount(count + 1);
              }}
              disabled={pageNumber === maxPageNo}
              className="text-4xl  p-1 items-center justify-center  cursor-pointer disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed  text-pink-500 hover:shadow-lg"
            >
              <VscTriangleRight />
            </button>
          </div>
        )}
        <br />
        <hr />
      </div>
    </div>
  );
}
