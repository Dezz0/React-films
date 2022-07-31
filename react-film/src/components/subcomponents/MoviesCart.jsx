import React from "react";
import { Link } from "react-router-dom";
import "../../styles/substyles/moviesCart.css";

export default function MoviesCart(item) {
  return (
    <div className="movies__cart">
      <Link to={`/movies/${item.kinopoiskId}`}>
        <img src={item.posterUrlPreview} alt={item.nameRu} />
        <span>{item.year}</span>
        <h4>{item.nameRu}</h4>
        <p className="movies__cart_genres">
          {item.genres.map((genre, index) => (
            <span key={index}>{genre.genre} </span>
          ))}
        </p>
        <span className="movies__cart_rating">{item.ratingImdb}</span>
      </Link>
    </div>
  );
}
