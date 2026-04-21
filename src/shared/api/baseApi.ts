import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["Dashboard"],
    baseQuery: fetchBaseQuery({ baseUrl: "https://6995aa9db081bc23e9c40229.mockapi.io/api/v1" }),
    endpoints: () => ({}),
});