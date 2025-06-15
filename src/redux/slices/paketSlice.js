import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiChangeUsersInPaket,
  apiCreateUsersInPaket,
  apiDeletePaketById,
  apiDeleteUsersInPaket,
  apiGetPaketByPaketId,
  apiGetPakets,
  apiListPaketByUserId,
  updateImgsPaket,
  updatePaketCoverImage,
  updatePaketText,
} from "../../api/apiPaket";
import { showAlertWithTimeoutKullanici } from "./alertKullaniciSlice";

const initialState = {
  paketler: [],
  selectedPaket: null,
  loadingPaketStatus: false,
  error: null,
};

export const getPakets = createAsyncThunk("paketsGet", async () => {
  try {
    return await apiGetPakets();
  } catch (error) {
    console.log(error);
  }
});

export const getPaketByPaketId = createAsyncThunk(
  "getPaketByPaketId",
  async (id) => {
    try {
      return await apiGetPaketByPaketId(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPaketsByUserId = createAsyncThunk(
  "paketsByUserIdGet",
  async (id) => {
    try {
      return await apiListPaketByUserId(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePaketsByUserId = createAsyncThunk(
  "paketsByUserIdDelete",
  async ({ paketId, userId }) => {
    try {
      return await apiDeletePaketById(paketId, userId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePaketsTheUser = createAsyncThunk(
  "updatePaketsTheUser",
  async (
    { selectedSeansId, selectedStudentIds, initialStudentIds, selectedPaketId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const added = selectedStudentIds.filter(
        (id) => !initialStudentIds.includes(id)
      );
      const removed = initialStudentIds.filter(
        (id) => !selectedStudentIds.includes(id)
      );

      await apiChangeUsersInPaket({
        sessionId: selectedSeansId,
        packageId: selectedPaketId,
        addCustomerIds: added.length > 0 ? added : [],
        removeCustomerIds: removed.length > 0 ? removed : [],
      });
    } catch (error) {
      console.error("Paket güncelleme hatası:", error);
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response.message,
          status: "error",
        })
      );
      return rejectWithValue(error.response?.data || "Bir hata oluştu");
    }
  }
);

export const updatePaket = createAsyncThunk(
  "paket/updatFrom",
  async (
    { formData, initialCoverImages, initialImages },
    { rejectWithValue }
  ) => {
    try {
      await updatePaketText(formData.id, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        color: formData.color,
        capacity: formData.capacity,
        longDescription: formData.longDescription,
        public: formData.public,
      });

      if (formData.coverImage !== initialCoverImages) {
        if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("coverImage", formData.coverImage);
          kapakData.append("id", formData.id);
          await updatePaketCoverImage(kapakData);
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

          await updateImgsPaket(formData.id, newFile);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const paketSlice = createSlice({
  name: "paketSlice",
  initialState,
  reducers: {
    setSelectedPaket(state, action) {
      state.selectedPaket = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPaketsByUserId.pending, (state) => {
        state.loadingStudentsStatus = true;
        state.error = null;
      })
      .addCase(getPaketsByUserId.fulfilled, (state, action) => {
        state.paketler = action.payload;
        state.loadingStudentsStatus = false;
      })
      .addCase(getPaketsByUserId.rejected, (state, action) => {
        state.loadingStudentsStatus = false;
        state.error = action.error.message;
      })
      .addCase(getPakets.pending, (state) => {
        state.loadingStudentsStatus = true;
        state.error = null;
      })
      .addCase(getPakets.fulfilled, (state, action) => {
        state.paketler = action.payload;
        state.loadingStudentsStatus = false;
      })
      .addCase(getPakets.rejected, (state, action) => {
        state.loadingStudentsStatus = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPaket } = paketSlice.actions;

export default paketSlice.reducer;
