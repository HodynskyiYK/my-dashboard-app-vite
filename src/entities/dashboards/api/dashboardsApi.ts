import { baseApi } from "@/shared/api/baseApi";
import type { TDashboard } from "@/entities/dashboards";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query<
            TDashboard[],
            { search?: string; page?: number }
        >({
            query: ({ search = '', page = 1 }) => `/dashboards?sortBy=createdAt&order=desc&search=${search}&page=${page}&limit=10`,
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
        getDashboardById: build.query<TDashboard, string>({
            query: (id) => `/dashboards/${id}`,
            providesTags: (_result, _error, id) => [
                { type: 'Dashboard', id },
                { type: "Dashboard", id: "LIST" },
            ],
        }),
        createDashboard: build.mutation<TDashboard, Partial<TDashboard>>({
            query: (newDashboard) => ({
                url: "/dashboards",
                method: "POST",
                body: newDashboard,
            }),
            invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
        }),
        deleteDashboard: build.mutation<void, string>({
            query: (dashboardId) => ({
                url: `/dashboards/${dashboardId}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
        }),
        updateDashboard: build.mutation<
            TDashboard,
            { id: string; data: Partial<TDashboard> }
        >({
            query: ({ id, data }) => ({
                url: `/dashboards/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
        }),
    }),
});

export const {
    useGetDashboardsQuery,
    useGetDashboardByIdQuery,
    useCreateDashboardMutation,
    useDeleteDashboardMutation,
    useUpdateDashboardMutation
} = dashboardApi;