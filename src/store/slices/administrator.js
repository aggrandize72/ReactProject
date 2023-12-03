import { createSlice } from "@reduxjs/toolkit";

const administratorSlice = createSlice({
  name: "administrator",
  initialState: {
    administrator: {},
    isLogged: false,
  },
  reducers: {
    administratorSignIn: (state, action) => {
      state.administrator = action.payload;
      state.isLogged = true;
    },
    administratorSignOut: (state) => {
      state.administrator = {};
      state.isLogged = false;
    },
    administratorUpdate: (state, action) => {
      state.administrator = { ...state.administrator, ...action.payload };
      state.isLogged = true;
    },
  },
});

export const {
  administratorSignIn,
  administratorSignOut,
  administratorUpdate,
} = administratorSlice.actions;
export default administratorSlice.reducer;
