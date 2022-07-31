import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { error, fetchMoreMovies, fetchMovies, moviesList, status } from "../slices/moviesSlice";
import LoadingInfo from "./subcomponents/LoadingInfo";
import MoviesCart from "./subcomponents/MoviesCart";

export default function Main() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const movies = useSelector(moviesList);
  const statusLoading = useSelector(status);
  const statusError = useSelector(error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const loadMoreMovies = useCallback(() => {
    dispatch(fetchMoreMovies(currentPage));
    setCurrentPage(currentPage + 1);
  }, [currentPage, dispatch]);

  const render = movies.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      {render}
      <LoadingInfo statusLoading={statusLoading} statusError={statusError} />
      <div className="btn_more_movies" onClick={() => loadMoreMovies()}>
        Показать ещё ▼
      </div>
    </div>
  );
}
