import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visb: false,
  message: "",
  status: "", // "success" | "error"
};

export const showAlertWithTimeoutKullanici =
  (payload, timeout = 2000) =>
  (dispatch) => {
    dispatch(showAlertKullanici(payload));
    setTimeout(() => {
      dispatch(hideAlertKullanici());
    }, timeout);
  };

const alertSliceKullanici = createSlice({
  name: "alertKullanici",
  initialState,
  reducers: {
    showAlertKullanici: (state, action) => {
      state.visb = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    hideAlertKullanici: (state) => {
      state.visb = false;
      state.message = "";
    },
  },
});

export const { showAlertKullanici, hideAlertKullanici } =
  alertSliceKullanici.actions;
export default alertSliceKullanici.reducer;
