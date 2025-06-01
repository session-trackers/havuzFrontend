import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCoverImgPool,
  deletePool,
  fetchPools,
  updateImgsPoll,
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
  async (
    { formData, initialCoverImages, initialImages },
    { rejectWithValue }
  ) => {
    try {
      await updatePoolText({
        name: formData.name,
        description: formData.description,
        adress: formData.adress,
        addressUrl: formData.addressUrl,
      });

      if (formData.coverImage !== initialCoverImages) {
        if (!formData.coverImage) {
          await deleteCoverImgPool(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("coverImage", formData.coverImage);
          await updatePoolImage(formData.id, kapakData);
        }
      }

      if (formData.images !== initialImages) {
        const addeds = formData.images?.filter((img) => img instanceof File);
        const removeds = initialImages?.filter(
          (img) => !formData.images.some((currImg) => currImg.id === img.id)
        );

        if (
          (addeds && addeds.length > 0) ||
          (removeds && removeds.length > 0)
        ) {
          const newFile = new FormData();
          addeds?.forEach((added) => newFile.append("newImages", added));
          removeds?.forEach((removed) =>
            newFile.append("deleteImages", removed.id)
          );

          await updateImgsPoll(formData.id, newFile);
        }
      }
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
