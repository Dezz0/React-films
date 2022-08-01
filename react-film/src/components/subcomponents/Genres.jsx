import React from "react";

export default function Genres({ genres }) {
  return (
    <>
      <td className="odd_column">Жанры</td>
      <td className="even_column">
        {genres.map((cur, i) => (
          <p key={i}>{cur.genre}</p>
        ))}
      </td>
    </>
  );
}
