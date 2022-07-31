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

const initialState = {
  item: [],
  error: null,
  status: null
};

export const singlepageSlice = createSlice({
  name: "singlepage",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSinglePageFilm.pending]: pending,
    [fetchSinglePageFilm.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.item = action.payload;
    },
    [fetchSinglePageFilm.rejected]: setError
  }
});

export const singlePageFilm = (state) => state.singlepage.item;
export const similars = (state) => state.singlepage.similars;

export default singlepageSlice.reducer;
