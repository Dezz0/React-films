export const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const pending = (state) => {
  state.status = "loading";
  state.error = null;
};
