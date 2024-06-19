import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIAuth } from '@/apis/APIAuth';

const initialState = {
  status: 'idle',
  message: '',
};

export const login = createAsyncThunk('admin/login', APIAuth.login);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.status = 'idle';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.message = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = '';

        const { token } = action.payload.data;
        Cookies.set('token', token, { expires: 1 / 24 });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'fail';
        state.message = action.error.message;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export const adminSelector = (state) => state.admin;
export const adminReducer = adminSlice.reducer;
