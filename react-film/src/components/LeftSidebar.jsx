import React from "react";
import "../styles/leftSidebar.css";

export default function LeftSidebar() {
  function closeNav() {
    document.querySelector(".leftSidebar").style.width = "0";
  }
  function openNav() {
    document.querySelector(".leftSidebar").style.width = "160px";
    console.log(document.querySelector(".leftSidebar").width);
  }

  return (
    <>
      <div className="leftSidebar">
        <span href="/" className="closebtn" onClick={() => closeNav()}>
          x
        </span>
        <a href="/main">Главная</a>
        <a href="/films">Фильмы</a>
        <a href="/tv-seriae">Сериалы</a>
      </div>
      <span className="openbtn" onClick={() => openNav()}>
        ☰
      </span>
    </>
  );
}
