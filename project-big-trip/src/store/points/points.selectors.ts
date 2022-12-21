import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { RootState } from '../../types/store';
import { sorting } from '../../utils/sorting'; 
import { filter } from '../../utils/filter';
import { selectCurrentFilter, selectCurrentSorting } from '../application/application.selectors';

export const selectRawPoints = (state: RootState) => state[NameSpace.Points].points;
// export const selectPoints = createSelector([selectRawPoints, 
//   (state, currentSorting, currentFilter) => currentSorting,
//   (state, currentSorting, currentFilter) => currentFilter], (points, currentSorting, currentFilter) => {
//   return [...points].sort(sorting[currentSorting]).filter(filter[currentFilter]);
// })

export const selectPoints = createSelector([selectRawPoints, selectCurrentSorting, selectCurrentFilter], (points, currentSorting, currentFilter) => 
[...points].sort(sorting[currentSorting]).filter(filter[currentFilter]))

export const selectArePointsLoading = (state: RootState) => state[NameSpace.Points].arePointsLoading;