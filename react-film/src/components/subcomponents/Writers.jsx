import React from "react";

export default function Writers({ writers }) {
  return (
    <>
      <td className="odd_column">Сценаристы</td>
      <td className="even_column">
        {writers.slice(0, 4).map((writer, i) => (
          <p key={i}>{writer.nameRu}</p>
        ))}
        {writers.length > 4 && <p style={{ color: "#818181" }}>и другие</p>}
      </td>
    </>
  );
}
