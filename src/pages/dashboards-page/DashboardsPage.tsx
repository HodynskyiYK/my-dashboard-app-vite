import { useEffect } from "react";
import { Link, useSearchParams} from "react-router-dom";
import { useGetDashboardsQuery } from "@/entities/dashboards";
import { CreateDashboardForm } from "@/features/create-dashboard";
import { ListItemWithActions } from "@/shared/ui/list/ListItemWithActions";
import { DeleteDashboard } from "@/features/delete-dashboard";
import { EditDashboard } from "@/features/edit-dashboard";
import { SearchDashboardForm } from "@/features/search-dashboard";
import { Pagination } from "@/features/pagination";

const LIMIT_PER_PAGE = 10;

export function DashboardsPage() {
    const [searchParams, setParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    
    const page = Number(searchParams.get('page') ?? 1);
    const { data: dashboardsData, error, isLoading, isFetching } = useGetDashboardsQuery({ search, page });

    const pageChangeHandler = (newPage: number) => {
        setParams({ search, page: String(newPage) }, { replace: true });
    };

    useEffect(() => {
        if (dashboardsData?.length === 0 && page > 1) {
            setParams({ search, page: String(page - 1) }, { replace: true });
        }

        if (error && !dashboardsData) {
            setParams({ search: '', page: '1' }, { replace: true });
        }
    }, [error, dashboardsData, setParams, search, page]);

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
            <SearchDashboardForm
                searchValue={search}
                setSearch={setParams}
                currentPage={page}
            />
            <hr />
            {isFetching && (
                <div>Updating...</div>
            )}
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
            <Pagination
                page={page}
                hasNext={!!dashboardsData && dashboardsData.length === LIMIT_PER_PAGE}
                onChange={pageChangeHandler}
            />
            <hr />
            <CreateDashboardForm />
        </div>
    );
}
