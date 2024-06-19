import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createGetAllSlice = (name, apiGetAll) => {
  const initialState = {
    status: 'idle',
    message: '',
    data: [],
  };

  const fetchAll = createAsyncThunk(`${name}/fetchAll`, apiGetAll);

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.status = 'loading';
          state.message = '';
        })
        .addCase(fetchAll.fulfilled, (state, { payload }) => {
          state.status = 'success';
          state.message = '';
          state.data = payload;
        })
        .addCase(fetchAll.rejected, (state, { error }) => {
          state.status = 'failed';
          state.message = error.message;
        });
    },
  });

  return {
    fetchAll,
    resetState: slice.actions.resetState,
    select: (state) => state[name],
    reducer: slice.reducer,
  };
};
