import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Point } from '../../types/point';
import { loadPoints } from '../api-actions';

export type InitialState = {
  points: Point[];
  arePointsLoading: boolean;
};

const initialState: InitialState = {
  points: [],
  arePointsLoading: false,
};

export const pointsSlice = createSlice({
  name: NameSpace.Points,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(loadPoints.fulfilled, (state, action) => {
      state.points = action.payload;
      state.arePointsLoading = false;
    })
    .addCase(loadPoints.pending, (state) => {
      state.arePointsLoading = true;
    })
  }
});