import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { signin, signout } from "../actions/auth";

const initialState: AuthState = {
  token: null,
  isLoggedin: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoggedin = true;
      state.user = action.payload.user;
    });
    builder.addCase(signout.fulfilled, (state, action) => {
      state.token = null;
      state.isLoggedin = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
