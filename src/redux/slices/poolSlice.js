import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCoverImgPool,
  deletePool,
  fetchPools,
  updatePoolImage,
  updatePoolText,
} from "../../api/apiPool";

const initialState = {
  pools: [],
  selectedPool: null,
  loadingPoolsStatus: false,
  error: null,
};

export const getPools = createAsyncThunk("pools", async () => {
  try {
    return await fetchPools();
  } catch (error) {
    console.log(error);
  }
});

export const updatePool = createAsyncThunk(
  "pool/update",
  async ({ formData, initialKapakImages }, { dispatch, rejectWithValue }) => {
    try {
      await updatePoolText(formData);

      if (formData.coverImage !== initialKapakImages) {
        if (!formData.coverImage) {
          await deleteCoverImgPool(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("image", formData.coverImage);
          await updatePoolImage(formData.id, kapakData);
        }
      }
      await dispatch(getPools());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removePool = createAsyncThunk(
  "pool/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deletePool(id);
      dispatch(setSelectedPool(null));
      await dispatch(getPools());
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const poolSlice = createSlice({
  name: "poolSlice",
  initialState,
  reducers: {
    setSelectedPool(state, action) {
      state.selectedPool = action.payload;
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getKadro.pending, (state) => {
  //       state.loadingKadroStatus = true;
  //       state.error = null;
  //     })
  //     .addCase(getKadro.fulfilled, (state, action) => {
  //       state.kadro = action.payload;
  //       state.loadingKadroStatus = false;
  //     })
  //     .addCase(getKadro.rejected, (state, action) => {
  //       state.loadingKadroStatus = false;
  //       state.error = action.error.message;
  //     });
  // },
});

export const { setSelectedPool } = poolSlice.actions;

export default poolSlice.reducer;
