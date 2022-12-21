import { useEffect, useLayoutEffect, useState } from 'react';
import PointComponent from '../../components/point/point-component';
import { ComponentType, PointType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { useTripInfo } from '../../hooks/useTripInfo';
import {
  loadDestinations,
  loadOffers,
  loadPoints,
} from '../../store/api-actions';
import { selectCurrentFilter, selectCurrentSorting } from '../../store/application/application.selectors';
import { changeFilter, changeSorting } from '../../store/application/application.slice';
import {
  selectAreDestinationsLoading,
  selectDestinations,
} from '../../store/destinations/destinations.selectors';
import {
  selectAreOffersLoading,
  selectOffers,
} from '../../store/offers/offers.selectors';
import {
  selectArePointsLoading,
  selectPoints,
} from '../../store/points/points.selectors';
import { humanizeDate } from '../../utils/common';
import { Filter, FilterTypes } from '../../utils/filter';
import { Sorting, SortingTypes } from '../../utils/sorting';
import LoadingScreen from '../loading-screen/loading-screen';

export const Main = () => {
  // const [currentSorting, setCurrentSorting] = useState<keyof typeof SortingTypes>(SortingTypes.PRICE);
  // const [currentFilter, setCurrentFilter] = useState<keyof typeof FilterTypes>(FilterTypes.EVERYTHING);
  const points = useAppSelector(selectPoints);
  // const points = useAppSelector(selectPoints);
  const destinations = useAppSelector(selectDestinations);
  const offersByType = useAppSelector(selectOffers);
  const currentSorting = useAppSelector(selectCurrentSorting);
  const currentFilter = useAppSelector(selectCurrentFilter);
  // const arePointsLoading = useAppSelector(selectArePointsLoading);
  // const areOffersLoading = useAppSelector(selectAreOffersLoading);
  // const areDestinationsLoading = useAppSelector(selectAreDestinationsLoading);
  const [currentPointId, setCurrentPointId] = useState<null | number | 'new'>(null);
  const dispatch = useAppDispatch();
  const {tripInfo, generateTripInfo} = useTripInfo();



  const handleCreatePointToggle = () => {
    setCurrentPointId('new');
  }

  const handleChangeSorting = (sorting: Sorting) => {
    dispatch(changeSorting(sorting));
  }

  const handleChangeFilter = (filter: Filter) => {
    dispatch(changeFilter(filter));
    dispatch(changeSorting(SortingTypes.DAY));
  }

  useEffect(() => generateTripInfo(), []);

  // useEffect(() => {
  //   dispatch(loadPoints());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(loadOffers());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(loadDestinations());
  // }, [dispatch]);

  if (tripInfo === null || !tripInfo) {
    console.log('FFFFFFFFFFFFFFFFF');
    return <LoadingScreen />;
  }

  return (
    <>
      <header className="page-header">
        <div className="page-body__container  page-header__container">
          <img
            className="page-header__logo"
            src="img/logo.png"
            width="42"
            height="42"
            alt="Trip logo"
          />

          <div className="trip-main">
  
              <section className="trip-main__trip-info  trip-info">
                <div className="trip-info__main">
                  <h1 className="trip-info__title">My BigTrip{tripInfo.fromDate}</h1>
    
                  <p className="trip-info__dates">Sometimes…</p>
                </div>
              </section>


            <div className="trip-main__trip-controls  trip-controls">
              <div className="trip-controls__filters">
                <h2 className="visually-hidden">Filter events</h2>
                <form className="trip-filters" action="#" method="get">
                  <div className="trip-filters__filter">
                    <input
                      id="filter-everything"
                      className="trip-filters__filter-input  visually-hidden"
                      type="radio"
                      name="trip-filter"
                      value="everything"
                      onChange={() => handleChangeFilter(FilterTypes.EVERYTHING)}
                      checked={currentFilter === FilterTypes.EVERYTHING}
                    />
                    <label
                      className="trip-filters__filter-label"
                      htmlFor="filter-everything"
                    >
                      Everything
                    </label>
                  </div>

                  <div className="trip-filters__filter">
                    <input
                      id="filter-future"
                      className="trip-filters__filter-input  visually-hidden"
                      type="radio"
                      name="trip-filter"
                      value="future"
                      onChange={() => handleChangeFilter(FilterTypes.FUTURE)}
                      checked={currentFilter === FilterTypes.FUTURE}
                    />
                    <label
                      className="trip-filters__filter-label"
                      htmlFor="filter-future"
                    >
                      Future
                    </label>
                  </div>

                  <div className="trip-filters__filter">
                    <input
                      id="filter-past"
                      className="trip-filters__filter-input  visually-hidden"
                      type="radio"
                      name="trip-filter"
                      value="past"
                      onChange={() => handleChangeFilter(FilterTypes.PAST)}
                      checked={currentFilter === FilterTypes.PAST}
                    />
                    <label
                      className="trip-filters__filter-label"
                      htmlFor="filter-past"
                    >
                      Past
                    </label>
                  </div>

                  <button className="visually-hidden" type="submit">
                    Accept filter
                  </button>
                </form>
              </div>
            </div>

            <button
              className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
              type="button" onClick={handleCreatePointToggle}
            >
              New event
            </button>
          </div>
        </div>
      </header>

      <main className="page-body__page-main  page-main">
        <div className="page-body__container">
          <section className="trip-events">
            <h2 className="visually-hidden">Trip events</h2>

            <form
              className="trip-events__trip-sort  trip-sort"
              action="#"
              method="get"
            >
              <div className="trip-sort__item  trip-sort__item--day">
                <input
                  id="sort-day"
                  className="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-day"
                  onChange={() => handleChangeSorting(SortingTypes.DAY)}
                  checked={currentSorting === SortingTypes.DAY}
                />
                <label className="trip-sort__btn" htmlFor="sort-day">
                  Day
                </label>
              </div>

              <div className="trip-sort__item  trip-sort__item--event">
                <input
                  id="sort-event"
                  className="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-event"
                  disabled
                />
                <label className="trip-sort__btn" htmlFor="sort-event">
                  Event
                </label>
              </div>

              <div className="trip-sort__item  trip-sort__item--time">
                <input
                  id="sort-time"
                  className="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-time"
                  onChange={() => handleChangeSorting(SortingTypes.TIME)}
                  checked={currentSorting === SortingTypes.TIME}
                />
                <label className="trip-sort__btn" htmlFor="sort-time">
                  Time
                </label>
              </div>

              <div className="trip-sort__item  trip-sort__item--price">
                <input
                  id="sort-price"
                  className="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-price"
                  onChange={() => handleChangeSorting(SortingTypes.PRICE)}
                  checked={currentSorting === SortingTypes.PRICE}
                />
                <label className="trip-sort__btn" htmlFor="sort-price">
                  Price
                </label>
              </div>

              <div className="trip-sort__item  trip-sort__item--offer">
                <input
                  id="sort-offer"
                  className="trip-sort__input  visually-hidden"
                  type="radio"
                  name="trip-sort"
                  value="sort-offer"
                  disabled
                />
                <label className="trip-sort__btn" htmlFor="sort-offer">
                  Offers
                </label>
              </div>
            </form>

            <ul className="trip-events__list">
            <PointComponent
                point={{
                  id: 0,
                  base_price: 0,
                  date_from: new Date().toISOString().toString(),
                  date_to: new Date().toISOString().toString(),
                  destination: {
                    description: '',
                    name: '',
                    pictures: [],
                  },
                  is_favorite: false,
                  offers: [],
                  type: PointType.Taxi,
                }}
                offers={offersByType}
                destinations={destinations}
                currentPointId={currentPointId}
                setCurrentPointId={setCurrentPointId}
                compType={ComponentType.CREATE}
              />
              {points.map((point) => (
                <PointComponent
                  key={point.id}
                  point={point}
                  offers={offersByType}
                  destinations={destinations}
                  currentPointId={currentPointId}
                  setCurrentPointId={setCurrentPointId}
                  compType={ComponentType.EDIT}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};
