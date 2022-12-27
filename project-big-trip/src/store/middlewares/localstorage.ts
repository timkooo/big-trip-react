import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';
import { NameSpace } from '../../const';
import { Sorting } from '../../utils/sorting';
import { Filter } from '../../utils/filter';
import { addToLocalStorage } from '../../utils/localStorage';

type Reducer = ReturnType<typeof rootReducer>;

export const localStorage: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === `${NameSpace.Application}/changeSorting`) {
          addToLocalStorage<Sorting>('currentSorting', action.payload);
        }
        if (action.type === `${NameSpace.Application}/changeFilter`) {
          addToLocalStorage<Filter>('currentFilter', action.payload);
        }
        return next(action);
      };
