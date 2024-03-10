import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiURL, authString } from "../constants";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        method: "POST",
        headers: {
          "X-Auth": authString,
          "Content-Type": "application/json",
        },
        body: {
          action: "get_fields",
          params: { field: "brand" },
        },
      }),
      transformResponse: (response) => {
        const { result } = response;
        const data = result.filter((item) => item);
        const uniqueData = [...new Set(data)];
        return uniqueData;
      },
      keepUnusedDataFor: 180,
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
