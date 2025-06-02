import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSeanses,
  apiUpdateSeans,
  fetchSeansesList,
} from "../../api/apiSeans";

const initialState = {
  seanses: [
    // {
    //   id: "1",
    //   name: "Sabah Seansı",
    //   startHour: "09:00",
    //   endHour: "10:30",
    //   date: "2025-06-01",
    //   students: [
    //     {
    //       id: "stu1",
    //       name: "Ahmet Yılmaz",
    //       age: 16,
    //       gender: "male",
    //       attendance: true,
    //     },
    //     {
    //       id: "stu2",
    //       name: "Elif Demir",
    //       age: 15,
    //       gender: "female",
    //       attendance: false,
    //     },
    //   ],
    // },
    // {
    //   id: "2",
    //   name: "Öğle Seansı",
    //   startHour: "13:00",
    //   endHour: "14:30",
    //   date: "2025-06-01",
    //   students: [
    //     {
    //       id: "stu3",
    //       name: "Mert Can",
    //       age: 17,
    //       gender: "male",
    //       attendance: false,
    //     },
    //     {
    //       id: "stu4",
    //       name: "Zeynep Kaya",
    //       age: 16,
    //       gender: "female",
    //       attendance: true,
    //     },
    //   ],
    // },
  ],
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

export const getSeansesList = createAsyncThunk("seansesList", async () => {
  try {
    return await fetchSeansesList();
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
      });
  },
});

export const { setSelectedSeans, resetTheSeanses } = seansSlice.actions;

export default seansSlice.reducer;
