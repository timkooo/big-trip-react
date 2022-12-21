import { PointType } from '../const';
import { Destination } from './destination';
import { Offer } from './offer';

export type Point = {
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination;
  id: number;
  is_favorite: boolean;
  offers: Offer['id'][];
  type: PointType;
};
