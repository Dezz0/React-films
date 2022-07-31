import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, setError } from "./fetchHelper";

export const fetchFilmsFilter = createAsyncThunk("searchFilms/fetchFilms", async function (name, { rejectWithValue }) {
  try {
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${name}&page=1`, {
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

export const fetchMoreFilmsByName = createAsyncThunk(
  "searchFilms/fetchMoreMovies",
  async function ({ name, currentPage }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=${name}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error("При загзузке страницы произошла ошибка.");
      }
      const data = await response.json();
      dispatch(addMoreFilms(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  totalInfo: {},
  error: null,
  status: null
};

export const filmsSlice = createSlice({
  name: "searchFilms",
  initialState,
  reducers: {
    addMoreFilms(state, action) {
      const { items } = action.payload;
      state.status = "resolved";
      state.items = [...state.items, ...items];
    }
  },
  extraReducers: {
    [fetchFilmsFilter.pending]: pending,
    [fetchMoreFilmsByName.pending]: pending,
    [fetchFilmsFilter.fulfilled]: (state, action) => {
      const { items, total, totalPages } = action.payload;
      state.status = "resolved";
      state.items = items;
      state.totalInfo = { total, totalPages };
    },
    [fetchFilmsFilter.rejected]: setError,
    [fetchMoreFilmsByName.rejected]: setError
  }
});

const { addMoreFilms } = filmsSlice.actions;

export const filmsList = (state) => state.searchFilms.items;
export const infoTotalfilmsList = (state) => state.searchFilms.totalInfo;
export const status = (state) => state.searchFilms.status;
export const error = (state) => state.searchFilms.error;

export default filmsSlice.reducer;
