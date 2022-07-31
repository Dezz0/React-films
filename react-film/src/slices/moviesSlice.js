import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, setError } from "./fetchHelper";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films", {
      method: "GET",
      headers: {
        "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("При загзузке страницы произошла ошибка.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchMoreMovies = createAsyncThunk(
  "movies/fetchMoreMovies",
  async function (page, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${page}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("При загзузке страницы произошла ошибка.");
      }
      const data = await response.json();
      dispatch(addNewMovies(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  error: null,
  status: null
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addNewMovies(state, action) {
      const { items } = action.payload;
      state.items = [...state.items, ...items];
      state.status = "resolved";
    }
  },
  extraReducers: {
    [fetchMovies.pending]: pending,
    [fetchMoreMovies.pending]: pending,
    [fetchMovies.fulfilled]: (state, action) => {
      const { items } = action.payload;
      state.status = "resolved";
      state.items = items;
    },
    [fetchMovies.rejected]: setError,
    [fetchMoreMovies.rejected]: setError
  }
});

const { addNewMovies } = moviesSlice.actions;

export const moviesList = (state) => state.movies.items;
export const status = (state) => state.movies.status;
export const error = (state) => state.movies.error;

export default moviesSlice.reducer;
