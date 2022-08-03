import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movies, removeAllFilms } from "../slices/favoritesSlice";
import MoviesCart from "./subcomponents/MoviesCart";
import "../styles/favorites.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const moviesList = useSelector(movies);

  function handleClick() {
    dispatch(removeAllFilms());
  }

  const render = moviesList.map((item) => <MoviesCart key={item.kinopoiskId} {...item} />);

  return (
    <div className="movies_container">
      {moviesList.length !== 0 ? (
        <>
          <p className="clear_all_btn" onClick={() => handleClick()}>
            Очистить весь список
          </p>
          {render}
        </>
      ) : (
        <h2 className="list_info">Список пуст</h2>
      )}
    </div>
  );
}
