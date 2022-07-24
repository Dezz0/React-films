import React from "react";
import "../../styles/substyles/filmCart.css";

export default function FilmCart(item) {
  return (
    <div className="film__cart">
      <img src={item.posterUrlPreview} alt={item.nameRu} />
      <h4>{item.nameRu}</h4>
      <p className="film__cart_genres">
        {item.genres.map((genre, index) => (
          <span key={index}>{genre.genre} </span>
        ))}
      </p>
      <p className="film__cart_bottom">
        <span className="film__cart_rating">☆{item.ratingKinopoisk}</span> {item.year}
      </p>
    </div>
  );
}
