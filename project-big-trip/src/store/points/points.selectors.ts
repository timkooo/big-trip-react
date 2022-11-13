import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectPoints = (state: RootState) => state[NameSpace.Points].points;
export const selectArePointsLoading = (state: RootState) => state[NameSpace.Points].arePointsLoading;