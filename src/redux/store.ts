import { configureStore } from "@reduxjs/toolkit";
import fruitsReducer from "./slices/fruits.slice";
import jarReducer from "./slices/jar.slice";

export const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
    jar: jarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
