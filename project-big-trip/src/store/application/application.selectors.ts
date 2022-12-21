import { NameSpace } from '../../const';
import { RootState } from '../../types/store';

export const selectCurrentSorting = (state: RootState) => state[NameSpace.Application].currentSorting;
export const selectCurrentFilter = (state: RootState) => state[NameSpace.Application].currentFilter;