import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Offer } from '../types/offer';
import { OffersByType } from '../types/offers-by-type';
import { Point } from '../types/point';
import {sorting, SortingTypes} from './sorting';

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;

export const formatDateAttribute = (date: string) =>
  new Date(date).toLocaleDateString('en-CA');

export const humanizeDate = (date: string) => dayjs(date).format('MMM DD');
export const humanizeTime = (date: string) => dayjs(date).format('HH:mm');
export const humanizeEditTime = (date: string) => dayjs(date).format('DD/MM/YY HH:mm');

export const getDuration = (date1: string, date2: string) => {
  const fromDate = dayjs(date1);
  const toDate = dayjs(date2);
  const minutes = fromDate.diff(toDate, 'minute');
  const days = Math.floor(minutes / MINUTES_IN_DAY);
  const hours = Math.floor((minutes - days * MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  dayjs.extend(duration);
  if (days === 0 && hours !== 0) {
    return `${dayjs.duration(minutes, 'minutes').format('HH[H] mm[M]')}`;
  }
  if (days === 0 && hours === 0) {
    return `${dayjs.duration(minutes, 'minutes').format('mm[M]')}`;
  }
  return `${dayjs.duration(minutes, 'minutes').format('DD[D] HH[H] mm[M]')}`;
};

export const getTripInfo = (points: Point[], offers: OffersByType[]) => {
  if (points.length === 0 || offers.length === 0) {
    return null;
  }

  const sortedPoints = [...points].sort(sorting[SortingTypes.DAY]);
  const getOffersPrice = (point: Point, offers: OffersByType[]) => {
    const pointType = point.type;
    const pointOffers = point.offers;

    if (point.offers.length === 0) {
      return 0;
    }

    const selectedOffers = offers.find((offertByType) => offertByType.type === pointType)?.offers.filter((offer) => pointOffers.includes(offer.id)); 
    if (selectedOffers) {
      return selectedOffers.reduce((accumulator, offer) => accumulator + +offer.price, 0);
    } else {
      return 0;
    }
  };

  const getTripPrice = () => sortedPoints.reduce((accumulator, point) => accumulator + +point.base_price + +getOffersPrice(point, offers), 0);

  const getThirdDestination = () => {
    if (sortedPoints.length > 3) {
      return ' -  . . .  - ';
    }
    if (sortedPoints.length === 3) {
      return ` ${points[1].destination.name} `;
    }
    if (sortedPoints.length < 2) {
      return ' &mdash; ';
    }
  };

  return {
    fromDestination: sortedPoints[0] ? sortedPoints[0].destination.name : '',
    toDestination: sortedPoints.length >= 2 ? sortedPoints[sortedPoints.length - 1].destination.name : '. . .',
    thirdDestination: getThirdDestination(),
    fromDate: sortedPoints[0].date_from,
    toDate: sortedPoints[sortedPoints.length - 1].date_to,
    tripPrice: getTripPrice(),
  };
};
