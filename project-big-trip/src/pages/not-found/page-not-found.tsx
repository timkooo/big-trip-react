import { Link } from "react-router-dom";
import { AppRoutes } from "../../const";

export const PageNotFound = () => (
  <>
    <h1>404</h1>
    <Link to={AppRoutes.Main}>Назад</Link>
  </>
);
