import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCheckedStudentBySessionId,
  apiFetchStudent,
  apiFetchStudentByDevamsizlik,
  apiFetchStudentById,
  apiFetchStudentByPaketId,
  apiFetchStudentBySessionId,
  updateStudentImage,
  updateStudentText,
} from "../../api/apiStudent";
const initialState = {
  students: [],
  selectedStudent: null,
  loadingStudentsStatus: false,
  error: null,
};

export const getStudents = createAsyncThunk("students", async () => {
  try {
    return await apiFetchStudent();
  } catch (error) {
    console.log(error);
  }
});

export const getStudentsById = createAsyncThunk("studentsById", async (id) => {
  try {
    return await apiFetchStudentById(id);
  } catch (error) {
    console.log(error);
  }
});

export const getStudentsByPaketId = createAsyncThunk(
  "studentsByIdPaket",
  async (id) => {
    try {
      return await apiFetchStudentByPaketId(id);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateStundet = createAsyncThunk(
  "student/update",
  async ({ formData, initialIdentityImage }, { rejectWithValue }) => {
    try {
      await updateStudentText(formData.id, {
        name: formData.name,
        lastName: formData.lastName,
        phoneNo: formData.phoneNo,
        birthDate: formData.birthDate,
        bloodType: formData.bloodType,
        identity: formData.identity,
        parentName: formData.parentName,
        parentPhoneNo: formData.parentPhoneNo,
        address: formData.address,
        email: formData.email,
      });

      if (formData.identityImage !== initialIdentityImage) {
        if (formData.identityImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("identityImage", formData.identityImage);
          await updateStudentImage(formData.id, kapakData);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// iki tarih arası devamsızlıklar
export const getStudentsByDevamsizlik = createAsyncThunk(
  "getStudentsByDevamsizlik",
  async (formData, { rejectWithValue }) => {
    try {
      return await apiFetchStudentByDevamsizlik(formData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Devamsızlık için sessionId ye göre öğrenciler
export const getStudentsByIdSession = createAsyncThunk(
  "getStudentsByIdSession",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await apiFetchStudentBySessionId(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Devamsızlık Submit
export const checkedStudentsByIdSession = createAsyncThunk(
  "checkedStudentsByIdSession",
  async (data, { rejectWithValue }) => {
    try {
      return await apiCheckedStudentBySessionId(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {
    setSelectedStudent(state, action) {
      state.selectedStudent = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loadingStudentsStatus = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loadingStudentsStatus = false;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loadingStudentsStatus = false;
        state.error = action.error.message;
      });
    // .addCase(getStudentsByPaketId.pending, (state) => {
    //   state.loadingStudentsStatus = true;
    //   state.error = null;
    // })
    // .addCase(getStudentsByPaketId.fulfilled, (state, action) => {
    //   state.students = action.payload;
    //   state.loadingStudentsStatus = false;
    // })
    // .addCase(getStudentsByPaketId.rejected, (state, action) => {
    //   state.loadingStudentsStatus = false;
    //   state.error = action.error.message;
    // });
  },
});

export const { setSelectedStudent } = studentSlice.actions;

export default studentSlice.reducer;
