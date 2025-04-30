import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  plan: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    name: "Demo User",
    email: "demo@echora.app",
    plan: "Premium",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    upgradePlan: (state, action: PayloadAction<string>) => {
      state.user.plan = action.payload;
    },
  },
});

export const { login, logout, upgradePlan } = authSlice.actions;
export default authSlice.reducer;
