import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, NameSpace } from '../const';
import { api } from '../services/api';
import { Destination } from '../types/destination';
import { OffersByType } from '../types/offers-by-type';
import { Point } from '../types/point';

// export const loadPlaces = createAsyncThunk(
//   `${NameSpace.Places}/loadPlaces`,
//   async () => {
//     const { data } = await api.get<Place[]>(APIRoutes.Places);
//     return data;
//   }
// );

// export const loadPlaceById = createAsyncThunk(
//   `${NameSpace.Places}/loadPlaceById`,
//   async (placeId: string) => {
//     const { data } = await api.get<Place>(`${APIRoutes.Places}/${placeId}`);
//     return data;
//   }
// );

// export const loadNearestPlaces = createAsyncThunk(
//   `${NameSpace.Places}/loadNearestPlaces`,
//   async (placeId: string) => {
//     const { data } = await api.get<Place[]>(
//       `${APIRoutes.Places}/${placeId}/nearby`
//     );
//     return data;
//   }
// );

// export const checkAuthAction = createAsyncThunk(
//   `${NameSpace.User}/checkAuth`,
//   async () => {
//     const { data } = await api.get<UserData>(APIRoutes.Login);
//     return data;
//   }
// );

// export const loginAction = createAsyncThunk(
//   `${NameSpace.User}/login`,
//   async (login: AuthData, { dispatch }) => {
//     const { data } = await api.post<UserData>(APIRoutes.Login, login);
//     saveToken(data.token);
//     dispatch(redirectToRoute(AppRoutes.Main));
//     return data;
//   }
// );

// export const logoutAction = createAsyncThunk(
//   `${NameSpace.User}/logout`,
//   async () => {
//     await api.delete(APIRoutes.Logout);
//     dropToken();
//   }
// );

// export const loadCommentsByPlaceId = createAsyncThunk(
//   `${NameSpace.Comments}/loadCommentsByPlaceId`,
//   async (placeId: string) => {
//     const { data } = await api.get<Comment[]>(
//       `${APIRoutes.Comments}/${placeId}`
//     );
//     return data;
//   }
// );

// export const postCommentAction = createAsyncThunk(
//   `${NameSpace.Comments}/postComment`,
//   async ({ formData, placeId }: { formData: CommentData; placeId: string }) => {
//     const { data } = await api.post<Comment[]>(
//       `${APIRoutes.Comments}/${placeId}`,
//       formData
//     );
//     return data;
//   }
// );

// export const loadFavorites = createAsyncThunk(
//   `${NameSpace.Favorites}/loadFavorites`,
//   async () => {
//     const { data } = await api.get<Place[]>(APIRoutes.Favorite);
//     return data;
//   }
// );

// export const changeFavoriteStatus = createAsyncThunk(
//   `${NameSpace.Favorites}/changeFavoriteStatus`,
//   async (
//     { placeId, status }: { placeId: number; status: number },
//     { dispatch }
//   ) => {
//     const { data } = await api.post<Place>(
//       `${APIRoutes.Favorite}/${placeId}/${status}`
//     );
//     dispatch(updatePlacesAction(data));
//     dispatch(loadFavorites());
//   }
// );

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

export const createPoint = createAsyncThunk(
  `${NameSpace.Points}/createPoint`,
  async (point: Point, { dispatch }) => {
    await api.post(APIRoutes.Points, point);
    dispatch(loadPoints());
  }
)