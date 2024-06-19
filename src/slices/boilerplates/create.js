import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createCreateSlice = (name, apiCreate) => {
  const initialState = {
    status: 'idle',
    message: '',
    data: {},
  };

  const create = createAsyncThunk(`${name}/create`, apiCreate);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(create.pending, (state) => {
          state.status = 'loading';
          state.message = '';
        })
        .addCase(create.fulfilled, (state, { payload }) => {
          state.status = 'success';
          state.message = 'Created successfully';
          state.data = payload;
        })
        .addCase(create.rejected, (state, { error }) => {
          state.status = 'failed';
          state.message = error.message;
        });
    },
  });

  return {
    create,
    resetState: slice.actions.resetState,
    select: (state) => state[name],
    reducer: slice.reducer,
  };
};
