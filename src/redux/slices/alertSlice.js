// src/redux/alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visb: false,
  message: "",
  status: "", // "success" | "error"
};

export const showAlertWithTimeout =
  (payload, timeout = 2000) =>
  (dispatch) => {
    dispatch(showAlert(payload));
    setTimeout(() => {
      dispatch(hideAlert());
    }, timeout);
  };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.visb = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    hideAlert: (state) => {
      state.visb = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
