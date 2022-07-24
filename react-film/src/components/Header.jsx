import React from "react";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header_search">
        <input className="header__input" type="text" placeholder="Фильмы и сериалы" />
        <button className="header__btn button">Найти</button>
      </div>
      <div className="header__profile"></div>
    </div>
  );
}
