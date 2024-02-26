/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signInFaliure: (state) => {},

    signOutSuccess: (state) => {
      state.currentUser = null;
    },

    deleteBrandSuccess: (state) => {
      state.currentUser = null;
    },
    updateCustomerSuccess: (state, action) => {
      state.currentUser = action.payload;
    },

    updateCartSuccess: (state, action) => {
      state.currentUser.cartCount = action.payload;
    },
    updateBalanceSuccess: (state, action) => {
      state.currentUser.balance = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFaliure,
  signOutSuccess,
  deleteBrandSuccess,
  updateCustomerSuccess,
  updateCartSuccess,
  updateBalanceSuccess,
} = userSlice.actions;

export default userSlice.reducer;
