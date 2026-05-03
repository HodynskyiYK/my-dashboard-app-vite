import { useGetDashboardByIdQuery } from "@/entities/dashboards";
import { Button } from "@/shared/ui/button";
import { useNavigate, useParams,  } from "react-router-dom";

export function DashboardDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: pageDetails, isLoading, error } = useGetDashboardByIdQuery(id || "");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading dashboard details</div>;
    }

    const createdAt = pageDetails?.createdAt ? new Date(pageDetails.createdAt).toLocaleDateString() : "Unknown date";

    return (
        <>
            <h1>{`Dashboard ${pageDetails?.title}`}</h1>
            <hr />
            <p>
                <em>{`Created at: ${createdAt}`}</em>
            </p>
            <hr />
            <Button type="primary" onClick={() => navigate("/dashboards")}>
                Back to list
            </Button>
        </>
    );
}
