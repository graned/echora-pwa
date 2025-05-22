import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import charactersReducer from "./slices/characersSlice";
import editorReducer from "./slices/editorSlice";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    characters: charactersReducer,
    editor: editorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
