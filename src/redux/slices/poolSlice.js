import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCoverImgPool,
  fetchPools,
  updateImgsPoll,
  updatePoolCoverImage,
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
      await updatePoolText(formData.id, {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        addressUrl: formData.addressUrl,
      });

      if (formData.coverImage !== initialCoverImages) {
        if (!formData.coverImage) {
          await deleteCoverImgPool(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("coverImage", formData.coverImage);
          kapakData.append("id", formData.id);
          await updatePoolCoverImage(kapakData);
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

  extraReducers: (builder) => {
    builder
      .addCase(getPools.pending, (state) => {
        state.loadingPoolsStatus = true;
        state.error = null;
      })
      .addCase(getPools.fulfilled, (state, action) => {
        state.pools = action.payload;
        state.loadingPoolsStatus = false;
      })
      .addCase(getPools.rejected, (state, action) => {
        state.loadingPoolsStatus = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPool } = poolSlice.actions;

export default poolSlice.reducer;
