import { baseApi } from "@/shared/api/baseApi";
import type { TDashboard } from "@/entities/dashboards";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query<TDashboard[], void>({
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
        createDashboard: build.mutation<TDashboard, Partial<TDashboard>>({
            query: (newDashboard) => ({
                url: "/dashboards",
                method: "POST",
                body: newDashboard,
            }),
            // invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
            async onQueryStarted(newDashboard, { dispatch, queryFulfilled }) {
                const tempId = `temp-${Date.now()}`;
                const patchResult = dispatch(
                    dashboardApi.util.updateQueryData(
                        "getDashboards",
                        undefined,
                        (draft) => {
                            draft.push({
                                id: tempId,
                                title: newDashboard.title || "Untitled Dashboard",
                                createdAt: new Date().toISOString(),
                            } as TDashboard);
                        }
                    )
                );

                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        dashboardApi.util.updateQueryData(
                            "getDashboards",
                            undefined,
                            (draft) => {
                                const index = draft.findIndex(d => d.id === tempId);

                                if (index !== -1) {
                                    draft[index] = data;
                                }
                            }
                        )
                    );
                } catch {
                    patchResult.undo();
                }
            },
        }),
        deleteDashboard: build.mutation<void, string>({
            query: (dashboardId) => ({
                url: `/dashboards/${dashboardId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, dashboardId) => [
                { type: "Dashboard", id: dashboardId },
                { type: "Dashboard", id: "LIST" },
            ],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation, useDeleteDashboardMutation } = dashboardApi;