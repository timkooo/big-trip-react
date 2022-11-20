import { useEffect, useState } from 'react';
import PointComponent from '../../components/point/point-component';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import {
  loadDestinations,
  loadOffers,
  loadPoints,
} from '../../store/api-actions';
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
import LoadingScreen from '../loading-screen/loading-screen';

export const Main = () => {
  const points = useAppSelector(selectPoints);
  const destinations = useAppSelector(selectDestinations);
  const offersByType = useAppSelector(selectOffers);
  const arePointsLoading = useAppSelector(selectArePointsLoading);
  const areOffersLoading = useAppSelector(selectAreOffersLoading);
  const areDestinationsLoading = useAppSelector(selectAreDestinationsLoading);
  const [currentPointId, setCurrentPointId] = useState<null | number>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPoints());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadDestinations());
  }, [dispatch]);

  if (arePointsLoading || areOffersLoading || areDestinationsLoading) {
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
                <h1 className="trip-info__title">My BigTrip</h1>

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
                      checked
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
                    />
                    <label
                      className="trip-filters__filter-label"
                      htmlFor="filter-future"
                    >
                      Future
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
              type="button"
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
                  disabled
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
                  checked
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
              {points.map((point) => (
                <PointComponent
                  key={point.id}
                  point={point}
                  offers={offersByType}
                  destinations={destinations}
                  currentPointId={currentPointId}
                  setCurrentPointId={setCurrentPointId}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};
