import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createDeleteSlice = (name, apiDelete) => {
  const initialState = {
    status: 'idle',
    message: '',
    data: {},
  };

  const remove = createAsyncThunk(`${name}/remove`, apiDelete);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(remove.pending, (state) => {
          state.status = 'loading';
          state.message = '';
        })
        .addCase(remove.fulfilled, (state, { payload }) => {
          state.status = 'success';
          state.message = 'Deleted successfully';
          state.data = payload;
        })
        .addCase(remove.rejected, (state, { error }) => {
          state.status = 'failed';
          state.message = error.message;
        });
    },
  });

  return {
    remove,
    resetState: slice.actions.resetState,
    select: (state) => state[name],
    reducer: slice.reducer,
  };
};
