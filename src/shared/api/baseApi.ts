import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    tagTypes: ["Dashboard"],
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: () => ({}),
});