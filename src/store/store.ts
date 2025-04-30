import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import charactersReducer from "./slices/characersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
