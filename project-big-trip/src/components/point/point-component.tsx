import React, { useRef } from 'react';
import { Dispatch, FC, useEffect, useState } from 'react';
import { Destination } from '../../types/destination';
import { Offer } from '../../types/offer';
import { OffersByType } from '../../types/offers-by-type';
import { Point } from '../../types/point';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/material_green.css';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { createPoint, deletePoint, editPoint } from '../../store/api-actions';
import { ComponentType, PointViewMode } from '../../const';
import { formatDateAttribute, getDuration, humanizeDate, humanizeTime } from '../../utils/common';

type PointProps = {
  point: Point;
  offers: OffersByType[];
  destinations: Destination[];
  currentPointId: number | null | 'new';
  setCurrentPointId: Dispatch<number | null | 'new'>;
  compType: ComponentType;
};

const PointComponent: FC<PointProps> = ({
  point,
  currentPointId,
  setCurrentPointId,
  offers,
  destinations,
  compType,
}) => {
  const [currentPoint, setCurrentPoint] = useState(point);
  const eventTypeSelector = useRef<HTMLInputElement | null>(null);
  const destinationInput = useRef<HTMLInputElement | null>(null);
  const [componentType] = useState<ComponentType>(compType);
  const [currentPointViewMode, setCurrentPointViewMode] =
    useState<PointViewMode>(PointViewMode.VIEW_MODE);
  const dispatch = useAppDispatch();

  const handleEditModeToggle = () => {
    setCurrentPointViewMode(PointViewMode.EDIT_MODE);
    setCurrentPointId(point.id);
  };

  const handleViewModeToggle = () => {
    setCurrentPointViewMode(PointViewMode.VIEW_MODE);
    setCurrentPointId(null);
    setCurrentPoint(point);
  };

  // const handleHiddenModeToggle = () => {
  //   setCurrentPointViewMode(PointViewMode.HIDDEN_MODE);
  // };

  // const handleCreateModeToggle = () => {
  //   setCurrentPointViewMode(PointViewMode.CREATE_MODE);
  //   setCurrentPointId('new');
  // };

  const handleDeletePoint = () => {
    dispatch(deletePoint(currentPoint.id));
  };

  const handleEditPoint = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    switch (currentPointViewMode) {
      case PointViewMode.EDIT_MODE:
        await dispatch(editPoint(currentPoint));
        break;
      case PointViewMode.CREATE_MODE:
        await dispatch(createPoint(currentPoint));
        break;
    }
    handleViewModeToggle();
  };

  const createOfferName = (offer: Offer) => {
    return `${offer.title.toLowerCase().replace(/\s/g, '-')}--${offer.id}`;
  };

  const getOfferId = (name: string) => Number(/--(\d*)/gm.exec(name)?.[1]);

  useEffect(() => {
    if (currentPointId === point.id) {
      setCurrentPointViewMode(PointViewMode.EDIT_MODE);
      return;
    }
    if (currentPointId === 'new' && componentType === ComponentType.CREATE) {
      console.log('1111111111');
      setCurrentPointViewMode(PointViewMode.CREATE_MODE);
      return;
    }
    if (currentPointId !== point.id || currentPointId === null) {
      if (componentType === ComponentType.EDIT) {
        setCurrentPointViewMode(PointViewMode.VIEW_MODE);
        return;
      }
      if (componentType === ComponentType.CREATE) {
        setCurrentPointViewMode(PointViewMode.HIDDEN_MODE);
        return;
      }
    }
  }, [componentType, currentPointId, point.id]);

  const handlePointChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: { name: string; value: string | number } = evt.target;

    if (name === 'base_price') {
      value = Number(value);
    }

    if (name === 'destination') {
      if (destinationInput.current) {
        destinationInput.current.value = value as string;
      }
      const currentDestination = destinations.find(
        (destination) => destination.name === value
      );
      if (currentDestination) {
        setCurrentPoint((prevCurrentPoint) => ({
          ...prevCurrentPoint,
          destination: currentDestination,
        }));
      }
      return;
    }

    setCurrentPoint({ ...currentPoint, [name]: value });

    if (evt.target.closest('.event__type-input')) {
      if (eventTypeSelector.current) {
        eventTypeSelector.current.checked = false;
      }
      setCurrentPoint((prevCurrentPoint) => ({
        ...prevCurrentPoint,
        offers: [],
      }));
    }
    if (evt.target.closest('.event__offer-checkbox')) {
      let offers = [...currentPoint.offers];
      const offerId = getOfferId(name);
      console.log('111111111');
      if (evt.target.checked === true && offerId) {
        console.log('fdfdfdfd');
        offers.push(offerId);
        setCurrentPoint((prevCurrentPoint) => ({
          ...prevCurrentPoint,
          offers: offers,
        }));
      }
      if (evt.target.checked === false && offerId) {
        console.log('4444444444');
        offers = offers.filter((id) => id !== offerId);
        setCurrentPoint((prevCurrentPoint) => ({
          ...prevCurrentPoint,
          offers: offers,
        }));
      }
    }
  };

  const renderComponentByViewMode = () => {
    switch (currentPointViewMode) {
      case PointViewMode.HIDDEN_MODE:
        return '';
      case PointViewMode.VIEW_MODE:
        return (
          <li className="trip-events__item">
            <div className="event">
              <time className="event__date" dateTime="2019-03-18">
                {humanizeDate(point.date_from)}
              </time>
              <div className="event__type">
                <img
                  className="event__type-icon"
                  width="42"
                  height="42"
                  src={`img/icons/${point.type}.png`}
                  alt="Event type icon"
                />
              </div>
              <h3 className="event__title">{point.destination.name}</h3>
              <div className="event__schedule">
                <p className="event__time">
                  <time
                    className="event__start-time"
                    dateTime="2019-03-18T12:25"
                  >
                    {humanizeTime(point.date_from)}
                  </time>
                  &mdash;
                  <time className="event__end-time" dateTime="2019-03-18T13:35">
                    {humanizeTime(point.date_to)}
                  </time>
                </p>
                <p className="event__duration">{getDuration(point.date_to, point.date_from)}</p>
              </div>
              <p className="event__price">
                &euro;&nbsp;
                <span className="event__price-value">{point.base_price}</span>
              </p>
              <h4 className="visually-hidden">Offers:</h4>
              <ul className="event__selected-offers">
                {point.offers.map((offerId) => (
                  <li className="event__offer">
                    <span className="event__offer-title">
                      {
                        offers
                          .find((offer) => offer.type === point.type)
                          ?.offers.find((offer) => offer.id === offerId)?.title
                      }
                    </span>
                    &nbsp;&#43;&euro;&nbsp;
                    <span className="event__offer-price">
                      {
                        offers
                          .find((offer) => offer.type === point.type)
                          ?.offers.find((offer) => offer.id === offerId)?.price
                      }
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className="event__rollup-btn"
                type="button"
                onClick={handleEditModeToggle}
              >
                <span className="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        );
      case PointViewMode.EDIT_MODE:
      case PointViewMode.CREATE_MODE:
        return (
          <li className="trip-events__item">
            <form
              className="event event--edit"
              action="#"
              method="put"
              onSubmit={(evt) => handleEditPoint(evt)}
            >
              <header className="event__header">
                <div className="event__type-wrapper">
                  <label
                    className="event__type  event__type-btn"
                    htmlFor="event-type-toggle-1"
                  >
                    <span className="visually-hidden">Choose event type</span>
                    <img
                      className="event__type-icon"
                      width="17"
                      height="17"
                      src={`img/icons/${currentPoint.type}.png`}
                      alt="Event type icon"
                    />
                  </label>
                  <input
                    className="event__type-toggle  visually-hidden"
                    id="event-type-toggle-1"
                    type="checkbox"
                    defaultChecked={false}
                    ref={eventTypeSelector}
                  />

                  <div className="event__type-list">
                    <fieldset className="event__type-group">
                      <legend className="visually-hidden">Event type</legend>

                      <div className="event__type-item">
                        <input
                          id="event-type-taxi-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="taxi"
                          checked={currentPoint.type === 'taxi'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--taxi"
                          htmlFor="event-type-taxi-1"
                        >
                          Taxi
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-bus-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="bus"
                          checked={currentPoint.type === 'bus'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--bus"
                          htmlFor="event-type-bus-1"
                        >
                          Bus
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-train-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="train"
                          checked={currentPoint.type === 'train'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--train"
                          htmlFor="event-type-train-1"
                        >
                          Train
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-ship-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="ship"
                          checked={currentPoint.type === 'ship'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--ship"
                          htmlFor="event-type-ship-1"
                        >
                          Ship
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-drive-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="drive"
                          checked={currentPoint.type === 'drive'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--drive"
                          htmlFor="event-type-drive-1"
                        >
                          Drive
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-flight-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="flight"
                          checked={currentPoint.type === 'flight'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--flight"
                          htmlFor="event-type-flight-1"
                        >
                          Flight
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-check-in-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="check-in"
                          checked={currentPoint.type === 'check-in'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--check-in"
                          htmlFor="event-type-check-in-1"
                        >
                          Check-in
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-sightseeing-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="sightseeing"
                          checked={currentPoint.type === 'sightseeing'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--sightseeing"
                          htmlFor="event-type-sightseeing-1"
                        >
                          Sightseeing
                        </label>
                      </div>

                      <div className="event__type-item">
                        <input
                          id="event-type-restaurant-1"
                          className="event__type-input  visually-hidden"
                          type="radio"
                          name="type"
                          value="restaurant"
                          checked={currentPoint.type === 'restaurant'}
                          onChange={handlePointChange}
                        />
                        <label
                          className="event__type-label  event__type-label--restaurant"
                          htmlFor="event-type-restaurant-1"
                        >
                          Restaurant
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="event__field-group  event__field-group--destination">
                  <label
                    className="event__label  event__type-output"
                    htmlFor="event-destination-1"
                  >
                    {currentPoint.type}
                  </label>
                  <input
                    className="event__input  event__input--destination"
                    id="event-destination-1"
                    type="text"
                    name="destination"
                    defaultValue={currentPoint.destination.name}
                    onChange={handlePointChange}
                    list="destination-list-1"
                    ref={destinationInput}
                  />
                  <datalist id="destination-list-1">
                    {destinations.map((destination) => (
                      <option
                        key={destination.name}
                        value={destination.name}
                      ></option>
                    ))}
                  </datalist>
                </div>

                <div className="event__field-group  event__field-group--time">
                  <Flatpickr
                    options={{
                      enableTime: true,
                      wrap: true,
                      time_24hr: true,
                      dateFormat: 'd/m/y H:i',
                    }}
                    onChange={(dates) => {
                      setCurrentPoint({
                        ...currentPoint,
                        date_from: dates[0].toISOString().toString(),
                      });
                    }}
                  >
                    <label
                      className="visually-hidden"
                      htmlFor="event-end-time-1"
                    >
                      To
                    </label>
                    <input
                      className="event__input  event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="date_from"
                      value={currentPoint.date_from}
                      data-input
                    />
                  </Flatpickr>
                  &mdash;
                  <Flatpickr
                    options={{
                      minDate: currentPoint.date_from,
                      enableTime: true,
                      wrap: true,
                      time_24hr: true,
                      dateFormat: 'd/m/y H:i',
                    }}
                    onChange={(dates) => {
                      setCurrentPoint({
                        ...currentPoint,
                        date_to: dates[0].toISOString().toString(),
                      });
                    }}
                  >
                    <label
                      className="visually-hidden"
                      htmlFor="event-end-time-1"
                    >
                      To
                    </label>
                    <input
                      className="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="date_to"
                      value={currentPoint.date_to}
                      data-input
                    />
                  </Flatpickr>
                </div>

                <div className="event__field-group  event__field-group--price">
                  <label className="event__label" htmlFor="event-price-1">
                    <span className="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input
                    className="event__input  event__input--price"
                    id="event-price-1"
                    type="text"
                    name="base_price"
                    value={currentPoint.base_price}
                    onChange={handlePointChange}
                  />
                </div>

                {currentPointViewMode === PointViewMode.EDIT_MODE && (
                  <>
                    <button
                      className="event__save-btn  btn  btn--blue"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="event__reset-btn"
                      type="reset"
                      onClick={handleDeletePoint}
                    >
                      Delete
                    </button>
                    <button
                      className="event__rollup-btn"
                      type="button"
                      onClick={handleViewModeToggle}
                    >
                      <span className="visually-hidden">Open event</span>
                    </button>
                  </>
                )}

                {currentPointViewMode === PointViewMode.CREATE_MODE && (
                  <>
                    <button
                      className="event__save-btn  btn  btn--blue"
                      type="submit"
                    >
                      Save
                    </button>
                    <button 
                      className="event__reset-btn" 
                      type="reset"
                      onClick={handleViewModeToggle}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </header>
              <section className="event__details">
                <section className="event__section  event__section--offers">
                  <h3 className="event__section-title  event__section-title--offers">
                    Offers
                  </h3>
                  <div className="event__available-offers">
                    {offers
                      .find(
                        (offersByType) =>
                          offersByType.type === currentPoint.type
                      )
                      ?.offers.map((offer) => (
                        <div key={offer.id} className="event__offer-selector">
                          <input
                            className="event__offer-checkbox  visually-hidden"
                            id={createOfferName(offer)}
                            type="checkbox"
                            name={createOfferName(offer)}
                            checked={currentPoint.offers.some(
                              (offerId) => offerId === offer.id
                            )}
                            onChange={handlePointChange}
                          />
                          <label
                            className="event__offer-label"
                            htmlFor={createOfferName(offer)}
                          >
                            <span className="event__offer-title">
                              {offer.title}
                            </span>
                            &nbsp;&#43;&euro;&nbsp;
                            <span className="event__offer-price">
                              {offer.price}
                            </span>
                          </label>
                        </div>
                      ))}
                  </div>
                </section>

                <section className="event__section  event__section--destination">
                  <h3 className="event__section-title  event__section-title--destination">
                    Destination
                  </h3>
                  <p className="event__destination-description">
                    Chamonix-Mont-Blanc (usually shortened to Chamonix) is a
                    resort area near the junction of France, Switzerland and
                    Italy. At the base of Mont Blanc, the highest summit in the
                    Alps, it's renowned for its skiing.
                  </p>
                </section>
              </section>
            </form>
          </li>
        );
      default:
        return '';
    }
  };

  return <React.Fragment>{renderComponentByViewMode()}</React.Fragment>;
};

export default React.memo(PointComponent);
