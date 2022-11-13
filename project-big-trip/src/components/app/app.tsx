import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { Main } from '../../pages/main/main';
import { PageNotFound } from '../../pages/not-found/page-not-found';

export const App = () => (
  <Routes>
    <Route path={AppRoutes.Main} element={<Main />} />
    <Route path={AppRoutes.PageNotFount} element={<PageNotFound />} />
  </Routes>
);
