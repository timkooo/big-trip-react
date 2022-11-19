import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersByType } from '../../types/offers-by-type';
import { loadOffers } from '../api-actions';

export type InitialState = {
  offers: OffersByType[];
  areOffersLoading: Boolean;
}

const initialState: InitialState = {
  offers: [],
  areOffersLoading: false,
}

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(loadOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.areOffersLoading = false;
    })
    .addCase(loadOffers.pending, (state) => {
      state.areOffersLoading = true;
    })
  }
});