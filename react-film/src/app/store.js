import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "../slices/filmsSlice";
import moviesSlice from "../slices/moviesSlice";
import tvSeriesSlice from "../slices/tvSeriesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    films: filmsSlice,
    tvSeries: tvSeriesSlice
  }
});
