import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSeanses,
  apiUpdateSeans,
  fetchSeansesList,
  fetchSeansesByDate,
  fetchSeansesNoList,
  fetchSeansesByPaketId,
  apiChangeUsersInSeans,
  fetchSeansesByDateHoca,
} from "../../api/apiSeans";

const initialState = {
  seanses: [],
  selectedSeans: null,
  loadingSeansesStatus: false,
  error: null,
};

export const getSeansesFilter = createAsyncThunk("seanses", async (item) => {
  try {
    return await fetchSeanses(item);
  } catch (error) {
    console.log(error);
  }
});

export const getSeansesByPaketId = createAsyncThunk(
  "getSeansesByDate",
  async (id) => {
    try {
      return await fetchSeansesByPaketId(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSeansesByDate = createAsyncThunk(
  "getSeansesByDate",
  async (date) => {
    try {
      return await fetchSeansesByDate(date);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSeansesByDateHoca = createAsyncThunk(
  "getSeansesByDate",
  async (date) => {
    try {
      return await fetchSeansesByDateHoca(date);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSeansesList = createAsyncThunk("seansesList", async () => {
  try {
    return await fetchSeansesList();
  } catch (error) {
    console.log(error);
  }
});

export const getSeansesNoList = createAsyncThunk("seansesNoList", async () => {
  try {
    return await fetchSeansesNoList();
  } catch (error) {
    console.log(error);
  }
});

export const updateSeans = createAsyncThunk(
  "seans/update",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    try {
      await apiUpdateSeans(formData);
      await dispatch(getSeansesFilter());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const seansSlice = createSlice({
  name: "seansSlice",
  initialState,
  reducers: {
    setSelectedSeans(state, action) {
      state.selectedSeans = action.payload;
    },

    resetTheSeanses(state) {
      state.seanses = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSeansesFilter.pending, (state) => {
        state.loadingSeansesStatus = true;
        state.error = null;
      })
      .addCase(getSeansesFilter.fulfilled, (state, action) => {
        state.seanses = action.payload;
        state.loadingSeansesStatus = false;
      })
      .addCase(getSeansesFilter.rejected, (state, action) => {
        state.loadingSeansesStatus = false;
        state.error = action.error.message;
      })

      .addCase(getSeansesList.pending, (state) => {
        state.loadingSeansesStatus = true;
        state.error = null;
      })
      .addCase(getSeansesList.fulfilled, (state, action) => {
        state.seanses = action.payload;
        state.loadingSeansesStatus = false;
      })
      .addCase(getSeansesList.rejected, (state, action) => {
        state.loadingSeansesStatus = false;
        state.error = action.error.message;
      })

      .addCase(getSeansesByDate.pending, (state) => {
        state.loadingSeansesStatus = true;
        state.error = null;
      })
      .addCase(getSeansesByDate.fulfilled, (state, action) => {
        state.seanses = action.payload;
        state.loadingSeansesStatus = false;
      })
      .addCase(getSeansesByDate.rejected, (state, action) => {
        state.loadingSeansesStatus = false;
        state.error = action.error.message;
      });
  },
});

export const updateSeansTheUser = createAsyncThunk(
  "updateSeansTheUser",
  async ({
    selectedSeansId,
    selectedStudentIds,
    initialStudentIds,
    selectedPaketId,
  }) => {
    try {
      const added = selectedStudentIds.filter(
        (id) => !initialStudentIds.includes(id)
      );
      const removed = initialStudentIds.filter(
        (id) => !selectedStudentIds.includes(id)
      );

      await apiChangeUsersInSeans({
        sessionId: selectedSeansId,
        packageId: selectedPaketId,
        addCustomerIds: added.length > 0 ? added : [],
        removeCustomerIds: removed.length > 0 ? removed : [],
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setSelectedSeans, resetTheSeanses } = seansSlice.actions;

export default seansSlice.reducer;
