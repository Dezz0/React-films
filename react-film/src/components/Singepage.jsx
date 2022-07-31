import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePageFilm, singlePageFilm } from "../slices/singlepageSlice";
import "../styles/singlepage.css";

export default function Singepage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const infoFilm = useSelector(singlePageFilm);

  useEffect(() => {
    dispatch(fetchSinglePageFilm(id));
  }, [dispatch, id]);

  return (
    <div className="singlepage_container">
      <div className="singlepage_container_leftBar">
        <img className="singlepage_container_poster" src={infoFilm.posterUrlPreview} alt="" />
      </div>
      <div className="singlepage_container_rigthBar">
        <h2 className="singlepage_container_nameRu">{infoFilm.nameRu}</h2>
        <p className="singlepage_container_name">{infoFilm.nameOriginal}</p>
        <a className="singlepage_container_watch_btn" href={infoFilm.webUrl}>
          Смотреть
        </a>
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
              <td className="odd_column">Рейтинг</td>
              <td className="even_column">{infoFilm.ratingImdb}</td>
            </tr>
            <tr>
              {infoFilm.countries && (
                <>
                  <td className="odd_column">Страны</td>
                  <td className="even_column">
                    {infoFilm.countries.map((cur, i) => (
                      <p key={i}>{cur.country}</p>
                    ))}
                  </td>
                </>
              )}
            </tr>
            <tr>
              {infoFilm.genres && (
                <>
                  <td className="odd_column">Жанры</td>
                  <td className="even_column">
                    {infoFilm.genres.map((cur, i) => (
                      <p key={i}>{cur.genre}</p>
                    ))}
                  </td>
                </>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
