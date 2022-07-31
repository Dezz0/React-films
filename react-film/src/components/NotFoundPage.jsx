import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/notFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="movies_container">
      <div className="notfound_block_page">
        <h2>Страница не найдена.</h2>
        <NavLink to="/">Вернуться на главную</NavLink>
      </div>
    </div>
  );
}
