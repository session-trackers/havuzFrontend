import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCoverImgHoca,
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
      await updateHocaText(formData.id, {
        name: formData.name,
        lastName: formData.lastName,
        username: formData.username,
        description: formData.description,
        phoneNo: formData.phoneNo,
        title: formData.title,
      });

      if (formData.coverImage !== initialKapakImages) {
        if (!formData.coverImage) {
          await deleteCoverImgHoca(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("coverImage", formData.coverImage);
          kapakData.append("id", formData.id);
          await updateHocaImage(kapakData);
        }
      }
      await dispatch(getKadro());
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

  extraReducers: (builder) => {
    builder
      .addCase(getKadro.pending, (state) => {
        state.loadingKadroStatus = true;
        state.error = null;
      })
      .addCase(getKadro.fulfilled, (state, action) => {
        state.kadro = action.payload;
        state.loadingKadroStatus = false;
      })
      .addCase(getKadro.rejected, (state, action) => {
        state.loadingKadroStatus = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedHoca } = kadroSlice.actions;

export default kadroSlice.reducer;
