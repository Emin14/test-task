import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL, authString } from "../constants";
import { removeDuplicates } from "../../utils/removeDuplicates";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (ids) => ({
        method: "POST",
        headers: {
          "X-Auth": authString,
          "Content-Type": "application/json",
        },
        body: {
          action: "get_items",
          params: { ids },
        },
      }),
      transformResponse: (response) => removeDuplicates(response.result),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
