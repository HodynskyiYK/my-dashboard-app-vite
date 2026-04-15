import { useGetDashboardsQuery, type Dashboard } from "@/entities/dashboards";

export function DashboardsPage() {
    const { data: dashboardsData, error, isLoading } = useGetDashboardsQuery({});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading dashboards</div>;
    }

    return (
        <div>
            <h1>Dashboards</h1>
            <ul>
                {dashboardsData.map((dashboard: Dashboard) => (
                    <li key={dashboard.id}>{dashboard.title}</li>
                ))}
            </ul>
        </div>
    );
}
