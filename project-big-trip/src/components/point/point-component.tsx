import React from 'react';
import { Dispatch, FC, useEffect, useState } from 'react';
import { Destination } from '../../types/destination';
import { OffersByType } from '../../types/offers-by-type';
import { Point } from '../../types/point';

type PointProps = {
  point: Point;
  offers: OffersByType[];
  destinations: Destination[];
  currentPointId: number | null;
  setCurrentPointId: Dispatch<number | null>;
};

const PointComponent: FC<PointProps> = ({
  point,
  currentPointId,
  setCurrentPointId,
  offers,
  destinations,
}) => {
  const [detailPointViewOpened, setDetailPointViewOpened] = useState<
    true | false
  >(false);
  const [currentPoint, setCurrentPoint] = useState(point);

  const handleDetailViewOpen = () => {
    setDetailPointViewOpened(true);
    setCurrentPointId(point.id);
  };

  const handleDetailViewClose = () => {
    setDetailPointViewOpened(false);
    setCurrentPointId(null);
  };

  useEffect(()=>{
    setDetailPointViewOpened(currentPointId === point.id)
  }, [currentPointId, point.id]);

  const handlePointChange = (
    evt:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = evt.target;
    setCurrentPoint({ ...currentPoint, [name]: value });
  };

  return !detailPointViewOpened ? (
    <li className="trip-events__item">
      <div className="event">
        <time className="event__date" dateTime="2019-03-18">
          {point.date_from}
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
            <time className="event__start-time" dateTime="2019-03-18T12:25">
              {point.date_from}
            </time>
            &mdash;
            <time className="event__end-time" dateTime="2019-03-18T13:35">
              {point.date_to}
            </time>
          </p>
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
          onClick={handleDetailViewOpen}
        >
          <span className="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  ) : (
    <li className="trip-events__item">
      <form className="event event--edit" action="#" method="post">
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
              Flight
            </label>
            <input
              className="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="Chamonix"
              list="destination-list-1"
            />
            <datalist id="destination-list-1">
              {destinations.map((destination) => (
                <option value={destination.name}></option>
              ))}
            </datalist>
          </div>

          <div className="event__field-group  event__field-group--time">
            <label className="visually-hidden" htmlFor="event-start-time-1">
              From
            </label>
            <input
              className="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="18/03/19 12:25"
            />
            &mdash;
            <label className="visually-hidden" htmlFor="event-end-time-1">
              To
            </label>
            <input
              className="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="18/03/19 13:35"
            />
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
              name="event-price"
              value="160"
            />
          </div>

          <button className="event__save-btn  btn  btn--blue" type="submit">
            Save
          </button>
          <button className="event__reset-btn" type="reset">
            Delete
          </button>
          <button
            className="event__rollup-btn"
            type="button"
            onClick={handleDetailViewClose}
          >
            <span className="visually-hidden">Open event</span>
          </button>
        </header>
        <section className="event__details">
          <section className="event__section  event__section--offers">
            <h3 className="event__section-title  event__section-title--offers">
              Offers
            </h3>
            {offers
              .find((offersByType) => offersByType.type === currentPoint.type)
              ?.offers.map((offer) => (
                <div className="event__offer-selector">
                  <input
                    className="event__offer-checkbox  visually-hidden"
                    id="event-offer-luggage-1"
                    type="checkbox"
                    name="event-offer-luggage"
                    checked
                  />
                  <label
                    className="event__offer-label"
                    htmlFor="event-offer-luggage-1"
                  >
                    <span className="event__offer-title">Add luggage</span>
                    &plus;&euro;&nbsp;
                    <span className="event__offer-price">50</span>
                  </label>
                </div>
              ))}

            <div className="event__available-offers">
              <div className="event__offer-selector">
                <input
                  className="event__offer-checkbox  visually-hidden"
                  id="event-offer-luggage-1"
                  type="checkbox"
                  name="event-offer-luggage"
                  checked
                />
                <label
                  className="event__offer-label"
                  htmlFor="event-offer-luggage-1"
                >
                  <span className="event__offer-title">Add luggage</span>
                  &plus;&euro;&nbsp;
                  <span className="event__offer-price">50</span>
                </label>
              </div>

              <div className="event__offer-selector">
                <input
                  className="event__offer-checkbox  visually-hidden"
                  id="event-offer-comfort-1"
                  type="checkbox"
                  name="event-offer-comfort"
                  checked
                />
                <label
                  className="event__offer-label"
                  htmlFor="event-offer-comfort-1"
                >
                  <span className="event__offer-title">Switch to comfort</span>
                  &plus;&euro;&nbsp;
                  <span className="event__offer-price">80</span>
                </label>
              </div>

              <div className="event__offer-selector">
                <input
                  className="event__offer-checkbox  visually-hidden"
                  id="event-offer-meal-1"
                  type="checkbox"
                  name="event-offer-meal"
                />
                <label
                  className="event__offer-label"
                  htmlFor="event-offer-meal-1"
                >
                  <span className="event__offer-title">Add meal</span>
                  &plus;&euro;&nbsp;
                  <span className="event__offer-price">15</span>
                </label>
              </div>

              <div className="event__offer-selector">
                <input
                  className="event__offer-checkbox  visually-hidden"
                  id="event-offer-seats-1"
                  type="checkbox"
                  name="event-offer-seats"
                />
                <label
                  className="event__offer-label"
                  htmlFor="event-offer-seats-1"
                >
                  <span className="event__offer-title">Choose seats</span>
                  &plus;&euro;&nbsp;
                  <span className="event__offer-price">5</span>
                </label>
              </div>

              <div className="event__offer-selector">
                <input
                  className="event__offer-checkbox  visually-hidden"
                  id="event-offer-train-1"
                  type="checkbox"
                  name="event-offer-train"
                />
                <label
                  className="event__offer-label"
                  htmlFor="event-offer-train-1"
                >
                  <span className="event__offer-title">Travel by train</span>
                  &plus;&euro;&nbsp;
                  <span className="event__offer-price">40</span>
                </label>
              </div>
            </div>
          </section>

          <section className="event__section  event__section--destination">
            <h3 className="event__section-title  event__section-title--destination">
              Destination
            </h3>
            <p className="event__destination-description">
              Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort
              area near the junction of France, Switzerland and Italy. At the
              base of Mont Blanc, the highest summit in the Alps, it's renowned
              for its skiing.
            </p>
          </section>
        </section>
      </form>
    </li>
  );
};

export default React.memo(PointComponent);
