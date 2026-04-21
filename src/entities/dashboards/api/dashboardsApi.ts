import { nanoid } from '@reduxjs/toolkit';
import { baseApi } from "@/shared/api/baseApi";
import type { TDashboard } from "@/entities/dashboards";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDashboards: build.query<TDashboard[], void>({
            query: () => '/dashboards?sortBy=createdAt&order=desc',
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
                const tempId = `temp-${nanoid()}`;
                const patchResult = dispatch(
                    dashboardApi.util.updateQueryData(
                        "getDashboards",
                        undefined,
                        (draft) => {
                            draft.unshift({
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
            invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
        }),
    }),
});

export const { useGetDashboardsQuery, useCreateDashboardMutation, useDeleteDashboardMutation } = dashboardApi;