import { PointType } from '../const';
import { Destination } from './destination';
import { Offer } from './offer';

export type LocalPoint = {
  base_price: number;
  date_from: string;
  date_to: string;
  destination: Destination;
  id: number;
  is_favorite: false;
  offers: Offer[];
  type: PointType;
};
