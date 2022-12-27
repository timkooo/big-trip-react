import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/not-found/page-not-found';
import { loadDestinations, loadOffers, loadPoints } from '../../store/api-actions';
import { selectAreDestinationsLoading } from '../../store/destinations/destinations.selectors';
import { selectAreOffersLoading } from '../../store/offers/offers.selectors';
import { selectArePointsLoading } from '../../store/points/points.selectors';


export const App = () => {
  const arePointsLoading = useAppSelector(selectArePointsLoading);
  const areOffersLoading = useAppSelector(selectAreOffersLoading);
  const areDestinationsLoading = useAppSelector(selectAreDestinationsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPoints());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadOffers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadDestinations());
  }, [dispatch]);


  if (arePointsLoading || areOffersLoading || areDestinationsLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<Main />} />
      <Route path={AppRoutes.PageNotFount} element={<PageNotFound />} />
    </Routes>
  )
};
