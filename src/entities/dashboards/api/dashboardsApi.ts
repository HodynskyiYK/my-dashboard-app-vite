import { baseApi } from "@/shared/api/baseApi";
import type { Dashboard } from "@/entities/dashboards";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query<Dashboard[], void>({
            query: () => '/dashboards',
            providesTags: (result) =>
                result
                ? [
                    { type: 'Dashboard', id: 'LIST' },
                    ...result.map((dashboard) => ({
                        type: 'Dashboard' as const,
                        id: dashboard.id,
                    })),
                ] : [
                    { type: 'Dashboard', id: 'LIST' }
                ],
        }),
        createDashboard: build.mutation<Dashboard, Partial<Dashboard>>({
            query: (newDashboard) => ({
                url: "/dashboards",
                method: "POST",
                body: newDashboard,
            }),
            invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation } = dashboardApi;