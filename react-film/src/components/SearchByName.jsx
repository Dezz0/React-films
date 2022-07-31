import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  error,
  fetchFilmsFilter,
  fetchMoreFilmsByName,
  filmsList,
  infoTotalfilmsList,
  status
} from "../slices/searchFilmSlice";
import MoviesCart from "./subcomponents/MoviesCart";
import "../styles/searchByName.css";
import LoadingInfo from "./subcomponents/LoadingInfo";
import { useCallback } from "react";

export default function SearchByName() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const listOfMovies = useSelector(filmsList);
  const totalInfoOfMovies = useSelector(infoTotalfilmsList);
  const statusLoading = useSelector(status);
  const statusError = useSelector(error);

  useEffect(() => {
    dispatch(fetchFilmsFilter(name));
  }, [dispatch, name]);

  const loadMoreMovies = useCallback(() => {
    dispatch(fetchMoreFilmsByName({ name, currentPage }));
    setCurrentPage(currentPage + 1);
  }, [currentPage, dispatch, name]);

  const render = listOfMovies.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      <h2 className="search_result">
        Поиск по результату: <span>"{name}"</span>. Найдено совпадений <span>{totalInfoOfMovies.total}</span>
      </h2>
      {render}
      <LoadingInfo statusLoading={statusLoading} statusError={statusError} />
      {currentPage <= totalInfoOfMovies.totalPages && (
        <div className="btn_more_movies" onClick={() => loadMoreMovies()}>
          Показать ещё ▼
        </div>
      )}
    </div>
  );
}
