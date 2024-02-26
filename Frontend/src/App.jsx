/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ManufacturerSignUp from "./pages/ManufacturerSignUp";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import CreateProductListing from "./pages/CreateProductListing";
import AllowAddress from "./components/AllowAddress";
import LoggedOutRoute from "./components/LoggedOutRoute";
import PrivateRouteCustomer from "./components/PrivateRouteCustomer";
import Cart from "./pages/Cart";
import CustomerProfile from "./pages/CustomerProfile";
import PrivateRouteManufacturer from "./components/PrivateRouteManufacturer";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import ManufacturerProfile from "./pages/ManufacturerProfile";
import UpdateProduct from "./pages/UpdateProduct";
import Wallet from "./pages/Wallet";
import OrderHistory from "./pages/OrderHistory";
import PageNotFound from "./pages/PageNotFound";
import ManufacturerVerification from "./pages/ManufacturerVerification";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import VerifyManufacturers from "./pages/VerifyManufacturers";
import AllManufacturers from "./pages/AllManufacturers";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import OrderTracking from "./pages/OrderTracking";
import OrderReturn from "./pages/OrderReturn";
import RegistrationBonusHeader from "./components/RegistrationBonusHeader";

export default function App() {
  return (
    <BrowserRouter>
      <RegistrationBonusHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/address" element={<AllowAddress />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/manufacturer-verification"
          element={<ManufacturerVerification />}
        />

        <Route element={<LoggedOutRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/manufacturers/sign-up"
            element={<ManufacturerSignUp />}
          />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route
            path="/admin-verify-manufacturer"
            element={<VerifyManufacturers />}
          />
          <Route
            path="/admin-list-manufacturer"
            element={<AllManufacturers />}
          />
        </Route>

        <Route element={<PrivateRouteCustomer />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Route>

        <Route element={<PrivateRouteManufacturer />}>
          <Route
            path="/create-product-listing"
            element={<CreateProductListing />}
          />
          <Route path="/brand" element={<ManufacturerProfile />} />
          <Route path="/update-product/:pId" element={<UpdateProduct />} />
          <Route path="/brand-dashboard" element={<ManufacturerDashboard />} />
          <Route
            path="/brand-dashboard/update-ordertracking"
            element={<OrderTracking />}
          />
          <Route
            path="/brand-dashboard/update-orderreturn-status"
            element={<OrderReturn />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
