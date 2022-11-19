import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { destinationsSlice } from './destinations/destinations.slice';
import { offersSlice } from './offers/offers.slice';
import { pointsSlice } from './points/points.slice';

export const rootReducer = combineReducers({
  [NameSpace.Points]: pointsSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.Destinations]: destinationsSlice.reducer,
});
