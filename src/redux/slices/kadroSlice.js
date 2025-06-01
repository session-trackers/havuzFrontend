import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCoverImgHoca,
  deleteHoca,
  fetchKadro,
  updateHocaImage,
  updateHocaText,
} from "../../api/apiKadro";

const initialState = {
  kadro: [],
  selectedHoca: null,
  loadingKadroStatus: false,
  error: null,
};

export const getKadro = createAsyncThunk("kadro", async () => {
  try {
    return await fetchKadro();
  } catch (error) {
    console.log(error);
  }
});

export const updateHoca = createAsyncThunk(
  "hoca/update",
  async ({ formData, initialKapakImages }, { dispatch, rejectWithValue }) => {
    try {
      await updateHocaText(formData);

      if (formData.coverImage !== initialKapakImages) {
        if (!formData.coverImage) {
          await deleteCoverImgHoca(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("image", formData.coverImage);
          await updateHocaImage(formData.id, kapakData);
        }
      }
      await dispatch(getKadro());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeHoca = createAsyncThunk(
  "hoca/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteHoca(id);
      dispatch(setSelectedHoca(null));
      await dispatch(getKadro());
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const kadroSlice = createSlice({
  name: "kadroSlice",
  initialState,
  reducers: {
    setSelectedHoca(state, action) {
      state.selectedHoca = action.payload;
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

export const { setSelectedHoca } = kadroSlice.actions;

export default kadroSlice.reducer;
