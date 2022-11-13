import { PointType } from '../const';
import { Offer } from './offer';

export type OffersByType = {
  type: PointType;
  offers: Offer[];
};
