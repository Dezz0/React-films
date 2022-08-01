import React from "react";

export default function Staff({ actors }) {
  return (
    <div className="singlepage_container_bottom_container_carts">
      {actors.slice(0, 10).map((actor, index) => (
        <div className="singlepage_container_bottom_cart" key={index}>
          <img src={actor.posterUrl} alt={actor.nameRu} />
          <p>{actor.nameRu}</p>
        </div>
      ))}
    </div>
  );
}
