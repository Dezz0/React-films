import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/leftSidebar.css";

export default function LeftSidebar() {
  function closeNav() {
    document.querySelector(".leftSidebar").style.width = "0";
  }
  function openNav() {
    document.querySelector(".leftSidebar").style.width = "170px";
    console.log(document.querySelector(".leftSidebar").width);
  }

  return (
    <>
      <div className="leftSidebar">
        <span href="/" className="closebtn" onClick={() => closeNav()}>
          x
        </span>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/films">Фильмы</NavLink>
        <NavLink to="/tv-series">Сериалы</NavLink>
        <NavLink to="/favorites">Избранное</NavLink>
      </div>
      <span className="openbtn" onClick={() => openNav()}>
        ☰
      </span>
    </>
  );
}
