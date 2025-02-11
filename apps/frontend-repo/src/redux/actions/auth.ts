import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../types";

export const signin = createAsyncThunk(
  "auth/signin",
  async (payload: Omit<AuthState, 'isLoggedin'>, _thunkApi) => {
    const { token } = payload;
    try {
      await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      return payload;
    } catch (error) {
      return _thunkApi.rejectWithValue(error);
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async (_, _thunkApi) => {
  try {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    return _thunkApi.rejectWithValue(error);
  }
});
