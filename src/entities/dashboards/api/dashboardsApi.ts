import { baseApi } from "@/shared/api/baseApi";
import type { Dashboard } from "@/entities/dashboards";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query<Dashboard[], void>({
            query: () => "/dashboards",
            providesTags: [{ type: "Dashboard" }],
        }),
        createDashboard: build.mutation<Dashboard, Partial<Dashboard>>({
            query: (newDashboard) => ({
                url: "/dashboards",
                method: "POST",
                body: newDashboard,
            }),
            invalidatesTags: [{ type: "Dashboard" }],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation } = dashboardApi;