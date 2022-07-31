import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const [value, setValue] = useState("");

  return (
    <div className="header">
      <div className="header_search">
        <input
          className="header__input"
          type="text"
          placeholder="Фильмы и сериалы"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="header__btn button">
          <Link to={`/search/${value}`}>Найти</Link>
        </button>
      </div>
      <div className="header__profile"></div>
    </div>
  );
}
