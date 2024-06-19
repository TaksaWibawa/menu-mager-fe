import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createGetDetailSlice = (name, apiGetDetail) => {
  const initialState = {
    status: 'idle',
    message: '',
    data: {},
  };

  const fetchDetail = createAsyncThunk(`${name}/fetchDetail`, apiGetDetail);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDetail.pending, (state) => {
          state.status = 'loading';
          state.message = '';
        })
        .addCase(fetchDetail.fulfilled, (state, { payload }) => {
          state.status = 'success';
          state.message = '';
          state.data = payload;
        })
        .addCase(fetchDetail.rejected, (state, { error }) => {
          state.status = 'failed';
          state.message = error.message;
        });
    },
  });

  return {
    fetchDetail,
    resetState: slice.actions.resetState,
    select: (state) => state[name],
    reducer: slice.reducer,
  };
};
