import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectOffers = (state: RootState) => state[NameSpace.Offers].offers;
export const selectAreOffersLoading = (state: RootState) => state[NameSpace.Offers].areOffersLoading;