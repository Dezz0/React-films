import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms, fetchMoreFilms, filmsList } from "../slices/filmsSlice";
import MoviesCart from "./subcomponents/MoviesCart";

export default function Films() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const films = useSelector(filmsList);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const loadMoreFilms = useCallback(() => {
    dispatch(fetchMoreFilms(currentPage));
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const render = films.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      {render}{" "}
      <div className="btn_more_movies" onClick={() => loadMoreFilms()}>
        Показать ещё ▼
      </div>
    </div>
  );
}
