import dayjs from 'dayjs';
import { Point } from '../types/point';

export const FilterTypes: Record<string, string> = {
  EVERYTHING : 'everything',
  FUTURE : 'future',
  PAST : 'past',
};

const isEventDateFuture = (point: Point) => dayjs().isBefore(point.date_from, 'D') || (dayjs().isAfter(point.date_from, 'D') && dayjs().isBefore(point.date_to, 'D'));

const isEventDatePast = (point: Point) => dayjs().isAfter(point.date_to, 'D') || (dayjs().isAfter(point.date_from, 'D') && dayjs().isBefore(point.date_to, 'D'));

export const filter = {
  [FilterTypes.EVERYTHING] : (point: Point) => (point),
  [FilterTypes.FUTURE] : (point: Point) => isEventDateFuture(point),
  [FilterTypes.PAST] : (point: Point) => isEventDatePast(point),
};

export type Filter = keyof typeof FilterTypes;