import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getUsers, udpateUser } from "../actions/users";
import { User } from "@repo/entities";

interface UserState {
  data: Array<User>;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch data";
        state.loading = false;
      });

    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to create data";
      });

    builder
      .addCase(udpateUser.fulfilled, (state, action) => {
        state.data = state.data.map((prevValue) =>
          prevValue.id === action.payload.id ? action.payload : prevValue
        );
        state.loading = false;
      })
      .addCase(udpateUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update data";
      });

    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((prev) => prev.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete data";
      });
  },
});

export default userSlice.reducer;
