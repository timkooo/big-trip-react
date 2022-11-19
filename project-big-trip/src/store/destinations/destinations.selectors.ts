import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectDestinations = (state: RootState) => state[NameSpace.Destinations].destinations;
export const selectAreDestinationsLoading = (state: RootState) => state[NameSpace.Destinations].areDestinationsLoading;