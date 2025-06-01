// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { setAccessTokenGetter, setDispatcher } from "../api/api";
import kadroReducer from "./slices/kadroSlice";
import alertReducer from "./slices/alertSlice";
import poolReducer from "./slices/poolSlice";
import seansReducer from "./slices/seansSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    kadroSlice: kadroReducer,
    poolSlice: poolReducer,
    seansSlice: seansReducer,
    alert: alertReducer,
  },
});

export default store;

setAccessTokenGetter(() => store.getState().authSlice.accessToken);
setDispatcher(store.dispatch);
