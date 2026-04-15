import { baseApi } from "@/shared/api/baseApi";


const dashboardsApi = baseApi.enhanceEndpoints({
    addTagTypes: ["Dashboards"],
}).injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query({
            query: () => "/dashboards",
            providesTags: [{ type: "Dashboards" }],
        }),
        createDashboard: build.mutation({
            query: (newDashboard) => ({
                url: "/dashboards",
                method: "POST",
                body: newDashboard,
            }),
            invalidatesTags: [{ type: "Dashboards" }],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation } = dashboardsApi;