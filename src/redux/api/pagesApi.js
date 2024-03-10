import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL, authString } from "../constants";

export const pagesApi = createApi({
  reducerPath: "pagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ["Pages"],
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => ({
        method: "POST",
        headers: {
          "X-Auth": authString,
          "Content-Type": "application/json",
        },
        body: { action: "get_ids" },
      }),
      transformResponse: (response) => response.result.length,
      keepUnusedDataFor: 180,
    }),
  }),
});

export const { useGetPagesQuery } = pagesApi;
