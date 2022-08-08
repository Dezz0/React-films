import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/leftSidebar.css";

export default function LeftSidebar() {
  function closeNav() {
    document.querySelector(".leftSidebar").style.width = "0";
  }
  function openNav() {
    document.querySelector(".leftSidebar").style.width = "190px";
  }

  return (
    <>
      <div className="leftSidebar">
        <div className="leftSidebar_top">
          <h2 className="leftSidebar_header">REACT-FILMS</h2>
          <span href="/" className="closebtn" onClick={() => closeNav()}>
            x
          </span>
          <NavLink to="/React-films">Главная</NavLink>
          <NavLink to="/films">Фильмы</NavLink>
          <NavLink to="/tv-series">Сериалы</NavLink>
          <NavLink to="/favorites">Избранное</NavLink>
        </div>
        <div className="leftSidebar_bottom">
          <a href="https://github.com/Dezz0?tab=repositories">
            Профиль Github: <img src="https://img.icons8.com/fluency/36/000000/github.png" alt="" />
          </a>
        </div>
      </div>
      <span className="openbtn" onClick={() => openNav()}>
        ☰
      </span>
    </>
  );
}
