import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

export const filmsSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addNewFilm(state, action) {
      if (!state.items.reduce((_, item) => item.kinopoiskId === action.payload.kinopoiskId, false)) {
        state.items = [...state.items, action.payload];
      }
    },
    removeAllFilms(state) {
      state.items = [];
    }
  }
});

export const { addNewFilm, removeAllFilms } = filmsSlice.actions;

export const movies = (state) => state.favorites.items;

export default filmsSlice.reducer;
