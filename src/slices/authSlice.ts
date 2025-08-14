import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types";
import { toast } from "react-toastify";

const initialState: AuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      toast.success("Logged in successfully!");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      toast.success("Logged out successfully!");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
