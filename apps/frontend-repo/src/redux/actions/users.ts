import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../apis/user";
import { RootState } from "../store";

const userApi = new UserApi();

export const getUsers = createAsyncThunk("users/list", async (_, thunkApi) => {
  try {
    const rootState = thunkApi.getState() as RootState;
    
    if (!rootState.authReducer.token) {
      return thunkApi.rejectWithValue("No token available");
    }

    const response = await userApi.lists(rootState.authReducer.token);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
