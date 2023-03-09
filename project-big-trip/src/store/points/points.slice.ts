import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Point } from '../../types/point';
import { createPoint, loadPoints } from '../api-actions';

export type InitialState = {
  points: Point[];
  arePointsLoading: boolean;
  isPointUpdating: boolean;
  occuredError: string | null;
};

const initialState: InitialState = {
  points: [],
  arePointsLoading: false,
  isPointUpdating: false,
  occuredError: null,
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
    .addCase(createPoint.pending, (state) => {
      state.isPointUpdating = true;
      console.log('555555');
    })
    .addCase(createPoint.rejected, (state, action) => {
      if (action.payload) {
        console.log('second:', action.payload);
      } else {
        console.log(action.error.message);
      }

     // state.occuredError = JSON.stringify(action.error);
      console.log(action.payload);
      console.log('3333333333');
    })
    .addCase(createPoint.fulfilled, (state, action) => {
     // state.occuredError = JSON.stringify(action.error);
      console.log('44444');
    })
  }
});