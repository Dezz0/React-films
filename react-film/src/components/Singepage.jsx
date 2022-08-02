import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addNewFilm } from "../slices/favoritesSlice";
import { fetchStaff, fetchSinglePageFilm, singlePageFilm, staff, error } from "../slices/singlepageSlice";
import "../styles/singlepage.css";
import Countries from "./subcomponents/Countries";
import Directors from "./subcomponents/Directors";
import Genres from "./subcomponents/Genres";
import Staff from "./subcomponents/Staff";
import Writers from "./subcomponents/Writers";

export default function Singepage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const infoFilm = useSelector(singlePageFilm);
  const infoStaff = useSelector(staff);
  const statusError = useSelector(error);
  const directors = infoStaff.filter((staff) => staff.professionKey === "DIRECTOR");
  const writers = infoStaff.filter((staff) => staff.professionKey === "WRITER");
  const actors = infoStaff.filter((staff) => staff.professionKey === "ACTOR");

  useEffect(() => {
    dispatch(fetchSinglePageFilm(id));
    dispatch(fetchStaff(id));
  }, [dispatch, id]);

  function handleClick() {
    dispatch(addNewFilm(infoFilm));
  }

  return (
    <div className="singlepage_container">
      <div className="singlepage_container_leftBar">
        <img className="singlepage_container_poster" src={infoFilm.posterUrlPreview} alt="" />
      </div>
      <div className="singlepage_container_rigthBar">
        <h2 className="singlepage_container_nameRu">{infoFilm.nameRu}</h2>
        <p className="singlepage_container_name">{infoFilm.nameOriginal}</p>
        <div className="singlepage_container_btns">
          <a className="singlepage_container_watch_btn" href={infoFilm.webUrl}>
            Смотреть
          </a>
          <img
            src="https://img.icons8.com/office/30/000000/like--v1.png"
            alt="heart-icon"
            onClick={() => handleClick()}
          />
        </div>
        <p className="singlepage_container_year">
          <span>Год:</span> {infoFilm.year}
        </p>
        <p className="singlepage_container_duration">
          {infoFilm.filmLength && (
            <span>
              Длительность: <span className="singlepage_container_duration_dur">{infoFilm.filmLength + " мин."}</span>
            </span>
          )}
        </p>
        <p className="singlepage_container_description">
          <span>Описание:</span>
          <br />
          {infoFilm.description ? infoFilm.description : "Описание не найдено."}
        </p>
        <table className="singlepage_container_info">
          <tbody>
            <tr>
              {infoFilm.ratingImdb && (
                <>
                  <td className="odd_column">Рейтинг</td>
                  <td className="even_column">{infoFilm.ratingImdb}</td>
                </>
              )}
            </tr>
            <tr>{infoFilm.countries && <Countries countries={infoFilm.countries} />}</tr>
            <tr>{infoFilm.genres && <Genres genres={infoFilm.genres} />}</tr>
            <tr>{directors.length !== 0 && <Directors directors={directors} />}</tr>
            <tr>{writers.length !== 0 && <Writers writers={writers} />}</tr>
          </tbody>
        </table>
      </div>
      <div className="singlepage_container_bottom">
        {actors.length === 0 ? <h3>{statusError}</h3> : <h3>Актёрский состав</h3>}
        <Staff actors={actors} />
        {actors.length > 10 && (
          <p className="singlepage_container_bottom_actors_info">И другие {actors.length - 10} чел.</p>
        )}
      </div>
    </div>
  );
}
