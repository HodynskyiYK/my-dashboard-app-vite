import { useDeleteDashboardMutation, type TDashboard } from "@/entities/dashboards";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";

interface IDeleteDashboardProps {
  dashboard: TDashboard;
}

export function DeleteDashboard({ dashboard }: IDeleteDashboardProps) {
  const [deleteDashboard, { isLoading, isError }] = useDeleteDashboardMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await deleteDashboard(dashboard.id).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isError && <ErrorMessage message="Failed to delete dashboard. Please try again." />}
      <Button type="primary" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}