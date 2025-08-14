import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WatchlistState } from "../types";
import { toast } from "react-toastify";

const initialState: WatchlistState = {
  ids: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggleWatchlist: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((coinId) => coinId !== id);
        toast.success("Removed from watchlist!");
      } else {
        state.ids.push(id);
        toast.success("Added to watchlist!");
      }
    },
    setWatchlist: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
  },
});

export const { toggleWatchlist, setWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
