import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "../slices/filmsSlice";
import moviesSlice from "../slices/moviesSlice";
import searchFilmSlice from "../slices/searchFilmSlice";
import singlepageSlice from "../slices/singlepageSlice";
import tvSeriesSlice from "../slices/tvSeriesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    films: filmsSlice,
    tvSeries: tvSeriesSlice,
    singlepage: singlepageSlice,
    searchFilms: searchFilmSlice
  }
});
