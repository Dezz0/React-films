import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      throw new Error("При загзузке произошла ошибка.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    rejectWithValue(error.message);
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
        throw new Error("При загзузке произошла ошибка.");
      }
      const data = await response.json();
      dispatch(addNewTVSeries(data));
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

export const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState,
  reducers: {
    addNewTVSeries(state, action) {
      const { items } = action.payload;
      state.items = [...state.items, ...items];
    }
  },
  extraReducers: {
    [fetchTVSeries.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
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

export default tvSeriesSlice.reducer;
