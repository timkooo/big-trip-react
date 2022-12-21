import React, { useEffect, useState } from 'react';
import { selectAreOffersLoading, selectOffers } from '../store/offers/offers.selectors';
import { selectArePointsLoading, selectRawPoints } from '../store/points/points.selectors';
import { OffersByType } from '../types/offers-by-type';
import { Point } from '../types/point';
import { getTripInfo } from '../utils/common';
import { useAppSelector } from './rtkHooks';

export const useTripInfo = () => {
  const offerss = useAppSelector(selectOffers);
  const pointss = useAppSelector(selectRawPoints);
  // const arePointsLoading = useAppSelector(selectArePointsLoading);
  // const areOffersLoading = useAppSelector(selectAreOffersLoading);
  const [tripInfo, setTripInfo] = useState<ReturnType<typeof getTripInfo> | null>(null);
  // const isTripInfoLoading = arePointsLoading && areOffersLoading;
 
  //const ggggg = React.useCallback((pointss: Point[], offerss: OffersByType[]) => getTripInfo(pointss, offerss))

  // const generateTripInfo = () => {
  //   setTripInfo(ggggg);
  // };

  // useEffect(() => {
  //   setTripInfo(getTripInfo(pointss, offerss));
  // }, [offerss, pointss])
  const generateTripInfo = () => {
    setTripInfo(getTripInfo(pointss, offerss));
  };
  
  return {tripInfo, generateTripInfo};
}