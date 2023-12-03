import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: {},
    isLogged: false,
  },
  reducers: {
    teacherSignIn: (state, action) => {
      state.teacher = action.payload;
      state.isLogged = true;
    },
    teacherSignOut: (state) => {
      state.teacher = {};
      state.isLogged = false;
    },
    teacherUpdate: (state, action) => {
      state.teacher = { ...state.teacher, ...action.payload };
      state.isLogged = false;
    },
  },
});

export const { teacherSignIn, teacherSignOut, teacherUpdate } =
  teacherSlice.actions;
export default teacherSlice.reducer;
