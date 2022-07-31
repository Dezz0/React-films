import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pending, setError } from "./fetchHelper";

export const fetchTVSeries = createAsyncThunk("tvSeries/fetchTVSeries", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES&page=1", {
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

export const fetchMoreTVSeries = createAsyncThunk(
  "tvSeries/fetchMoreTVSeries",
  async function (page, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?type=TV_SERIES&page=${page}`, {
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
      dispatch(addNewTVSeries(data));
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

export const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState,
  reducers: {
    addNewTVSeries(state, action) {
      const { items } = action.payload;
      state.items = [...state.items, ...items];
      state.status = "resolved";
    }
  },
  extraReducers: {
    [fetchTVSeries.pending]: pending,
    [fetchMoreTVSeries.pending]: pending,
    [fetchTVSeries.fulfilled]: (state, action) => {
      const { items } = action.payload;
      state.status = "resolved";
      state.items = items;
    },
    [fetchTVSeries.rejected]: setError,
    [fetchMoreTVSeries.rejected]: setError
  }
});

const { addNewTVSeries } = tvSeriesSlice.actions;

export const tvSeriesList = (state) => state.tvSeries.items;
export const status = (state) => state.tvSeries.status;
export const error = (state) => state.tvSeries.error;

export default tvSeriesSlice.reducer;
