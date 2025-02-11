import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../actions/users';

interface UserState {
  data: [];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
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
        state.error = action.error.message ?? 'Failed to fetch data';
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
