import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Destination } from '../../types/destination';
import { loadDestinations } from '../api-actions';

export type InitialState = {
  destinations: Destination[];
  areDestinationsLoading: Boolean;
}

const initialState: InitialState = {
  destinations: [],
  areDestinationsLoading: false,
}

export const destinationsSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(loadDestinations.fulfilled, (state, action) => {
      state.destinations = action.payload;
      state.areDestinationsLoading = false;
    })
    .addCase(loadDestinations.pending, (state) => {
      state.areDestinationsLoading = true;
    })
  }
});