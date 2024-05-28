import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null } as {
    accessToken: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>,
    ) => {
      state.accessToken = accessToken;
    },

    logout: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.accessToken;
