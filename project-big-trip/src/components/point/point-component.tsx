import { FC } from 'react';
import { Point } from '../../types/point';

type PointProps = {
  point: Point;
}

export const PointComponent: FC<PointProps> = ({point}) => {
  return (
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
          &euro;&nbsp;<span className="event__price-value">{point.base_price}</span>
        </p>
        <h4 className="visually-hidden">Offers:</h4>
        <ul className="event__selected-offers">
          <li className="event__offer">
            <span className="event__offer-title">Add breakfast</span>
            &plus;&euro;&nbsp;
            <span className="event__offer-price">50</span>
          </li>
        </ul>
        <button className="event__rollup-btn" type="button">
          <span className="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  );
};
