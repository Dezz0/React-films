import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFilms = createAsyncThunk("films/fetchFilms", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/", {
      method: "GET",
      headers: {
        "X-API-KEY": "cc809371-ee5a-4e62-b1f7-0c8edaf1c59d",
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Server error!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    rejectWithValue(error.message);
  }
});

const initialState = {
  items: [],
  error: null,
  status: null,
  filterBy: ""
};

export const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFilms.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchFilms.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.items = action.payload;
    },
    [fetchFilms.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    }
  }
});

export const {} = filmSlice.actions;

export const filmList = (state) => state.films.items;
export const status = (state) => state.films.status;

export default filmSlice.reducer;
