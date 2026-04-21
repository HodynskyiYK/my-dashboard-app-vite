import { baseApi } from "@/shared/api/baseApi";
import type { Dashboard } from "@/entities/dashboards";
import type { TDashboard } from "@/shared/model";


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
            // invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
            async onQueryStarted(newDashboard, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    dashboardApi.util.updateQueryData(
                        "getDashboards",
                        undefined,
                        (draft) => {
                            const tempId = `temp-${Date.now()}`;
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
                                const index = draft.findIndex(d => d.id.startsWith("temp-"));

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
            invalidatesTags: (result, error, dashboardId) => [
                { type: "Dashboard", id: dashboardId },
                { type: "Dashboard", id: "LIST" },
            ],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation, useDeleteDashboardMutation } = dashboardApi;