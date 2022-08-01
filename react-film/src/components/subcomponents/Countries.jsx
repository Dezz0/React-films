import React from "react";

export default function Countries({ countries }) {
  return (
    <>
      <td className="odd_column">Страны</td>
      <td className="even_column">
        {countries.map((cur, i) => (
          <p key={i}>{cur.country}</p>
        ))}
      </td>
    </>
  );
}
