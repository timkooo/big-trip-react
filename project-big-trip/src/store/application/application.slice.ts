import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Filter, FilterTypes } from '../../utils/filter';
import { Sorting, SortingTypes } from '../../utils/sorting';

type InitialState = {
  currentSorting: Sorting;
  currentFilter: Filter;
}

const initialState: InitialState = {
  currentSorting: SortingTypes.DAY,
  currentFilter: FilterTypes.EVERYTHING,
}

export const applicationSlice = createSlice({
  name: NameSpace.Application,
  initialState,
  reducers: {
    changeSorting(state, action: PayloadAction<Sorting>) {
      state.currentSorting = action.payload;
    },
    changeFilter(state, action: PayloadAction<Filter>) {
      state.currentFilter = action.payload;
    },
  },
})

export const {changeSorting, changeFilter} = applicationSlice.actions;