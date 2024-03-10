import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { pagesApi } from "./api/pagesApi";
import { fieldApi } from "./api/fieldApi";
import { brandsApi } from "./api/brandsApi";
import { idApi } from "./api/idApi";
import { productsApi } from "./api/productsApi";
import currentPageReducer from "./slices/currentPageSlice";
import paramsReducer from "./slices/paramsSlice";

export const store = configureStore({
  reducer: combineReducers({
    [pagesApi.reducerPath]: pagesApi.reducer,
    [fieldApi.reducerPath]: fieldApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [idApi.reducerPath]: idApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    currentPage: currentPageReducer,
    params: paramsReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pagesApi.middleware)
      .concat(fieldApi.middleware)
      .concat(brandsApi.middleware)
      .concat(idApi.middleware)
      .concat(productsApi.middleware),
});
