import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { error, fetchMoreTVSeries, fetchTVSeries, status, tvSeriesList } from "../slices/tvSeriesSlice";
import LoadingInfo from "./subcomponents/LoadingInfo";
import MoviesCart from "./subcomponents/MoviesCart";

export default function TVSeries() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(2);
  const tvSeries = useSelector(tvSeriesList);
  const statusLoading = useSelector(status);
  const statusError = useSelector(error);

  useEffect(() => {
    dispatch(fetchTVSeries());
  }, [dispatch]);

  const loadMoreTVSeries = useCallback(() => {
    dispatch(fetchMoreTVSeries(currentPage));
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const render = tvSeries.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      {render}
      <LoadingInfo statusLoading={statusLoading} statusError={statusError} />
      <div className="btn_more_movies" onClick={() => loadMoreTVSeries()}>
        Показать ещё ▼
      </div>
    </div>
  );
}
