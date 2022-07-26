import React from "react";
import "../../styles/substyles/moviesCart.css";

export default function MoviesCart(item) {
  return (
    <div className="movies__cart">
      <img src={item.posterUrlPreview} alt={item.nameRu} />
      <h4>{item.nameRu}</h4>
      <p className="movies__cart_genres">
        {item.genres.map((genre, index) => (
          <span key={index}>{genre.genre} </span>
        ))}
      </p>
      <p className="movies__cart_bottom">
        <span className="movies__cart_rating">☆{item.ratingKinopoisk}</span> {item.year}
      </p>
    </div>
  );
}
