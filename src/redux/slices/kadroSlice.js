import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCheckedKadroBySessionId,
  apiFetchKadroByDevamsizlik,
  apiFetchKadroBySessionId,
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

// iki tarih arası devamsızlıklar
export const getKAdroByDevamsizlik = createAsyncThunk(
  "getKAdroByDevamsizlik",
  async (formData, { rejectWithValue }) => {
    try {
      return await apiFetchKadroByDevamsizlik(formData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Devamsızlık için sessionId ye göre hocalar
export const getKadroByIdSession = createAsyncThunk(
  "getKadroByIdSession",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await apiFetchKadroBySessionId(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Devamsızlık Submit

export const checkedKadroByIdSession = createAsyncThunk(
  "checkedKadroByIdSession",
  async (data, { rejectWithValue }) => {
    try {
      return await apiCheckedKadroBySessionId(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const { setSelectedHoca } = kadroSlice.actions;

export default kadroSlice.reducer;
