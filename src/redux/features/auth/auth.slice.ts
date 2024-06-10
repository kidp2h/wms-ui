import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, refreshToken: null } as {
    accessToken: null | string;
    refreshToken: null | string
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { accessToken, refreshToken } }: PayloadAction<{ accessToken: string, refreshToken: string }>,
    ) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.accessToken;
