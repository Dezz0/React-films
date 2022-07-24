import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms, filmList, status } from "../filmSlice";
import "../styles/main.css";
import FilmCart from "./subcomponents/FilmCart";

export default function Main() {
  const dispatch = useDispatch();
  const films = useSelector(filmList);
  const statusLoading = useSelector(status);

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const render =
    statusLoading === "resolved" && films.items.map((item) => <FilmCart key={item.kinopoiskId} {...item} />);

  return <div className="main">{render}</div>;
}
