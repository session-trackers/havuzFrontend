import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  isLogin: false,
  firstName: "",
  lastName: "",
  userName: "",
  role: "",
  isAuthChecked: false, // 👈 yeni eklendi
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLogin = true;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.username;
      state.role = action.payload.role;
      state.isAuthChecked = true; // 👈
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setLogout: (state) => {
      state.accessToken = null;
      state.isLogin = false;
      state.firstName = "";
      state.lastName = "";
      state.userName = "";
      state.role = "";
      state.isAuthChecked = true;
    },
  },
});

export const { setLogin, setLogout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
