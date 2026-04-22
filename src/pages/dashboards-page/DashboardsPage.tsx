import { useEffect } from "react";
import { Link, useSearchParams} from "react-router-dom";
import { useGetDashboardsQuery } from "@/entities/dashboards";
import { CreateDashboardForm } from "@/features/create-dashboard";
import { ListItemWithActions } from "@/shared/ui/list/ListItemWithActions";
import { DeleteDashboard } from "@/features/delete-dashboard";
import { EditDashboard } from "@/features/edit-dashboard";
import { SearchDashboardForm } from "@/features/search-dashboard";

export function DashboardsPage() {
    const [searchParams, setParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    
    const page = parseInt(searchParams.get('page') || '1', 10);
    const { data: dashboardsData, error, isLoading } = useGetDashboardsQuery({ search, page });

    useEffect(() => {
        if (error && !dashboardsData) {
            setParams({ search: '', page: '1' }, { replace: true });
        }
    }, [error, dashboardsData, setParams]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error && !dashboardsData) {
        return <div>Error loading dashboards</div>;
    }

    return (
        <div>
            <h1>Dashboards</h1>
            <hr />
            <SearchDashboardForm searchValue={search} setSearch={setParams} />
            <hr />
            {!dashboardsData?.length ? (
                <div>
                    <h4>No results found</h4>
                </div>
            ) : (
                <div>
                    {dashboardsData.map((dashboard) => (
                        <ListItemWithActions
                            key={dashboard.id}
                            item={
                                <Link to={`/dashboards/${dashboard.id}`}>{dashboard.title}</Link>
                            }
                            actions={[
                                <EditDashboard dashboard={dashboard} />,
                                <DeleteDashboard dashboard={dashboard} />,
                            ]}
                        />
                    ))}
                </div>
            )}
            <hr />
            <CreateDashboardForm />
        </div>
    );
}
