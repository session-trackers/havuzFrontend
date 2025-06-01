import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteSeans, fetchSeanses, apiUpdateSeans } from "../../api/apiSeans";

const initialState = {
  seanses: [],
  selectedSeans: null,
  loadingSeansesStatus: false,
  error: null,
};

export const getSeanses = createAsyncThunk("seanses", async () => {
  try {
    return await fetchSeanses();
  } catch (error) {
    console.log(error);
  }
});

export const updateSeans = createAsyncThunk(
  "seans/update",
  async ({ formData }, { dispatch, rejectWithValue }) => {
    try {
      await apiUpdateSeans(formData);
      await dispatch(getSeanses());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSeans = createAsyncThunk(
  "pool/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteSeans(id);
      dispatch(setSelectedSeans(null));
      await dispatch(getSeanses());
      return id;
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

export const { setSelectedSeans } = seansSlice.actions;

export default seansSlice.reducer;
