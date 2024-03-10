import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL, authString } from "../constants";

export const idApi = createApi({
  reducerPath: "idApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ["Ids"],
  endpoints: (builder) => ({
    getIds: builder.query({
      query: ({ currentPage, limit, params }) => ({
        method: "POST",
        headers: {
          "X-Auth": authString,
          "Content-Type": "application/json",
        },
        body: {
          action: params ? "filter" : "get_ids",
          params: params || { offset: limit * (currentPage - 1), limit },
        },
      }),
      transformResponse: (response) => response.result,
    }),
  }),
});

export const { useGetIdsQuery } = idApi;
