import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../apis/user";
import { RootState } from "../store";
import { User } from "@repo/entities";

const userApi = new UserApi();

export const createUser = createAsyncThunk(
  "users/create",
  async (payload: Omit<User, "recentlyActive" | "id">, thunkApi) => {
    try {
      const rootState = thunkApi.getState() as RootState;

      if (!rootState.authReducer.token) {
        return thunkApi.rejectWithValue("No token available");
      }

      const response = await userApi.create(rootState.authReducer.token, payload);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

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

export const udpateUser = createAsyncThunk(
  "users/update",
  async (payload: Omit<User, "recentlyActive">, thunkApi) => {
    try {
      const rootState = thunkApi.getState() as RootState;

      if (!rootState.authReducer.token) {
        return thunkApi.rejectWithValue("No token available");
      }

      const { id, ...rest } = payload;

      await userApi.update(rootState.authReducer.token, id, rest);
      return payload;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (payload: string, thunkApi) => {
    try {
      const rootState = thunkApi.getState() as RootState;

      if (!rootState.authReducer.token) {
        return thunkApi.rejectWithValue("No token available");
      }

      await userApi.delete(rootState.authReducer.token, payload);
      return payload;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
