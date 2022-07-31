import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms, fetchMoreFilms, filmsList, error, status } from "../slices/filmsSlice";
import LoadingInfo from "./subcomponents/LoadingInfo";
import MoviesCart from "./subcomponents/MoviesCart";

export default function Films() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const films = useSelector(filmsList);
  const statusLoading = useSelector(status);
  const statusError = useSelector(error);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const loadMoreFilms = useCallback(() => {
    dispatch(fetchMoreFilms(currentPage));
    setCurrentPage(currentPage + 1);
  }, [currentPage, dispatch]);

  const render = films.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      {render}
      <LoadingInfo statusLoading={statusLoading} statusError={statusError} />
      <div className="btn_more_movies" onClick={() => loadMoreFilms()}>
        Показать ещё ▼
      </div>
    </div>
  );
}
