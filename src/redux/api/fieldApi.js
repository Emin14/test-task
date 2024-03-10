import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL, authString } from "../constants";

export const fieldApi = createApi({
  reducerPath: "fieldApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ["Fields"],
  endpoints: (builder) => ({
    getField: builder.query({
      query: () => ({
        method: "POST",
        headers: {
          "X-Auth": authString,
          "Content-Type": "application/json",
        },
        body: { action: "get_fields" },
      }),
      transformResponse: (response) => response.result,
      keepUnusedDataFor: 180,
    }),
  }),
});

export const { useGetFieldQuery } = fieldApi;
