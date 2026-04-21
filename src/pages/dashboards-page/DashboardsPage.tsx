import { Link } from "react-router-dom";
import { useGetDashboardsQuery, useDeleteDashboardMutation } from "@/entities/dashboards";
import { CreateDashboardForm } from "@/features/create-dashboard";
import { ListItemWithActions } from "@/shared/ui/list/ListItemWithActions";

export function DashboardsPage() {
    const { data: dashboardsData, error, isLoading } = useGetDashboardsQuery();
    const [deleteDashboard] = useDeleteDashboardMutation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading dashboards</div>;
    }

    if (!dashboardsData || dashboardsData.length === 0) {
        return <div>No dashboards found</div>;
    }

    return (
        <div>
            <h1>Dashboards</h1>
            <hr />
            <CreateDashboardForm />
            <hr />
            <div>
                {dashboardsData.map((dashboard) => (
                    <ListItemWithActions
                        key={dashboard.id}
                        item={
                            <Link to={`/dashboards/${dashboard.id}`}>{dashboard.title}</Link>
                        }
                        actions={
                            <button onClick={() => deleteDashboard(dashboard.id)}>Delete</button>
                        }
                    />
                ))}
            </div>
        </div>
    );
}
