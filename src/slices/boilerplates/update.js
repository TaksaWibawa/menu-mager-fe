import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createUpdateSlice = (name, apiUpdate) => {
  const initialState = {
    status: 'idle',
    message: '',
    data: {},
  };

  const update = createAsyncThunk(`${name}/update`, apiUpdate);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(update.pending, (state) => {
          state.status = 'loading';
          state.message = '';
        })
        .addCase(update.fulfilled, (state, { payload }) => {
          state.status = 'success';
          state.message = 'Updated successfully';
          state.data = payload;
        })
        .addCase(update.rejected, (state, { error }) => {
          state.status = 'failed';
          state.message = error.message;
        });
    },
  });

  return {
    update,
    resetState: slice.actions.resetState,
    select: (state) => state[name],
    reducer: slice.reducer,
  };
};
