import React from "react";

export default function Directors({ directors }) {
  return (
    <>
      <td className="odd_column">Режиссеры</td>
      <td className="even_column">
        {directors.slice(0, 4).map((director, i) => (
          <p key={i}>{director.nameRu}</p>
        ))}
        {directors.length > 4 && <p style={{ color: "#818181" }}>и другие</p>}
      </td>
    </>
  );
}
