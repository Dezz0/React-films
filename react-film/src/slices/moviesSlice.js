import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      throw new Error("При загзузке произошла ошибка.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error.message);
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
        throw new Error("При загзузке произошла ошибка.");
      }
      const data = await response.json();
      dispatch(addNewMovies(data));
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

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addNewMovies(state, action) {
      const { items } = action.payload;
      state.items = [...state.items, ...items];
    }
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
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

export default moviesSlice.reducer;
