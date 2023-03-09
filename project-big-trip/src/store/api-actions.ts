import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { APIRoutes, NameSpace } from '../const';
import { api } from '../services/api';
import { Destination } from '../types/destination';
import { OffersByType } from '../types/offers-by-type';
import { Point } from '../types/point';

export const loadPoints = createAsyncThunk(
  `${NameSpace.Points}/loadPoints`,
  async () => {
    const { data } = await api.get<Point[]>(APIRoutes.Points);
    return data;
  }
);

export const loadOffers = createAsyncThunk(
  `${NameSpace.Offers}/loadOffers`,
  async () => {
    const { data } = await api.get<OffersByType[]>(APIRoutes.Offers);
    return data;
  }
);

export const loadDestinations = createAsyncThunk(
  `${NameSpace.Destinations}/loadDestinations`,
  async () => {
    const { data } = await api.get<Destination[]>(APIRoutes.Destinations);
    return data;
  }
);

export const editPoint = createAsyncThunk(
  `${NameSpace.Points}/editPoint`,
  async (point: Point, { dispatch }) => {
    await api.put(`${APIRoutes.Points}/${point.id}`, point);
    dispatch(loadPoints());
  }
);

export const deletePoint = createAsyncThunk(
  `${NameSpace.Points}/deletePoint`,
  async (pointId: number, { dispatch }) => {
    await api.delete(`${APIRoutes.Points}/${pointId}`);
    dispatch(loadPoints());
  }
);

export const createPoint = createAsyncThunk<void, Point>(
  `${NameSpace.Points}/createPoint`,
  async (point: Point, { dispatch, rejectWithValue }) => {
    try {
      await api.post(APIRoutes.Points, point);
    }
    // catch (error) {
    //   if (error instanceof AxiosError) {
    //     console.log('6666666666666666');
    //     //throw error;
    //     return rejectWithValue(error);
    //   }
    //   else {
    //     console.log('2222222222');
    //     return rejectWithValue(error);
    //   }
    // }

    catch (err) {
      if (err instanceof AxiosError) {
        console.log('first:', err);
        if (!err.response) {
          throw err
        }
        console.log('memememe');
        throw rejectWithValue(err)
      }
    }
  //dispatch(loadPoints());
  }
)