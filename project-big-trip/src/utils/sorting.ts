import dayjs from 'dayjs';
import { Point } from '../types/point';

export const SortingTypes: Record<string, string> = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer',
};

const sortByDay = (point1: Point, point2: Point) => {
  if (dayjs(point1.date_from).isAfter(point2.date_from)) {
    return 1;
  }
  if (dayjs(point1.date_from).isBefore(point2.date_from)) {
    return -1;
  }
  return 0;
};

const sortByTime = (point1: Point, point2: Point) => {
  const duration1 = dayjs(point1.date_from).diff(dayjs(point1.date_to), 'minute');
  const duration2 = dayjs(point2.date_from).diff(dayjs(point2.date_to), 'minute');
  if (duration1 > duration2) {
    return 1;
  }
  if (duration1 < duration2) {
    return -1;
  }
  return 0;
};

const sortByPrice = (point1: Point, point2: Point) => {
  if (point1.base_price < point2.base_price) {
    return 1;
  }
  if (point1.base_price > point2.base_price) {
    return -1;
  }
  return 0;
};

export const sorting = {
  [SortingTypes.DAY] : (point1: Point, point2: Point) => sortByDay(point1, point2),
  [SortingTypes.TIME] : (point1: Point, point2: Point) => sortByTime(point1, point2),
  [SortingTypes.PRICE] : (point1: Point, point2: Point) => sortByPrice(point1, point2),
};

export type Sorting = keyof typeof SortingTypes;
