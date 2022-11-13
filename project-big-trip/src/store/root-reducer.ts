import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { pointsSlice } from './points/points.slice';

export const rootReducer = combineReducers({
  [NameSpace.Points]: pointsSlice.reducer,
});
