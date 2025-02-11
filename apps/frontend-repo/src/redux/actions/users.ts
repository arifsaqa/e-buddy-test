import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/list", async (_, _thunkApi) => {
  try {
    const response = await fetch("https://jsonplaceholder.org/users");
    const data = await response.json();
    return data;
  } catch (error) {
    return _thunkApi.rejectWithValue(error);
  }
});