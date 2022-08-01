import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, setError } from "./fetchHelper";

export const fetchSinglePageFilm = createAsyncThunk(
  "singlepage/fetchSinglePageFilm",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
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
  }
);

export const fetchStaff = createAsyncThunk(
  "singlepage/fetchMoreFilmsByName",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
        method: "GET",
        headers: {
          "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Неудалось найти актерский состав.");
      }
      const data = await response.json();
      dispatch(getStaff(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  item: [],
  staff: [],
  error: null,
  status: null
};

export const singlepageSlice = createSlice({
  name: "singlepage",
  initialState,
  reducers: {
    getStaff(state, action) {
      state.staff = action.payload;
    }
  },
  extraReducers: {
    [fetchSinglePageFilm.pending]: pending,
    [fetchStaff.pending]: (state) => {
      state.status = "loading";
      state.error = null;
      state.staff = [];
    },
    [fetchSinglePageFilm.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.item = action.payload;
    },
    [fetchSinglePageFilm.rejected]: setError,
    [fetchStaff.rejected]: setError
  }
});

const { getStaff } = singlepageSlice.actions;

export const singlePageFilm = (state) => state.singlepage.item;
export const staff = (state) => state.singlepage.staff;
export const error = (state) => state.singlepage.error;

export default singlepageSlice.reducer;
