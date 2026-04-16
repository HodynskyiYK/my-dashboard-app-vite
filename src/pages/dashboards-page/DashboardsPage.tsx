import { useGetDashboardsQuery } from "@/entities/dashboards";
import { CreateDashboardForm } from "@/features/create-dashboard";

export function DashboardsPage() {
    const { data: dashboardsData, error, isLoading } = useGetDashboardsQuery();

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
            <ul>
                {dashboardsData.map((dashboard) => (
                    <li key={dashboard.id}>{dashboard.title}</li>
                ))}
            </ul>
            <hr />
            <CreateDashboardForm />
        </div>
    );
}
