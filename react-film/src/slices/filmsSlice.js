import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFilms = createAsyncThunk("movies/fetchFilms", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&page=1", {
      method: "GET",
      headers: {
        "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("При загзузке произошла ошибка.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error.message);
  }
});

export const fetchMoreFilms = createAsyncThunk(
  "movies/fetchMoreMovies",
  async function (page, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&page=${page}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("При загзузке произошла ошибка.");
      }
      const data = await response.json();
      dispatch(addNewFilms(data));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  error: null,
  status: null
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    addNewFilms(state, action) {
      const { items } = action.payload;
      state.items = [...state.items, ...items];
    }
  },
  extraReducers: {
    [fetchFilms.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchFilms.fulfilled]: (state, action) => {
      const { items } = action.payload;
      state.status = "resolved";
      state.items = items;
    },
    [fetchFilms.rejected]: setError,
    [fetchMoreFilms.rejected]: setError
  }
});

const { addNewFilms } = filmsSlice.actions;

export const filmsList = (state) => state.films.items;
export const status = (state) => state.films.status;

export default filmsSlice.reducer;
