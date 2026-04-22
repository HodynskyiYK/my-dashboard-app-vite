import { useUpdateDashboardMutation, type TDashboard } from "@/entities/dashboards";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";

interface IEditDashboardProps {
  dashboard: TDashboard;
}

export function EditDashboard({ dashboard }: IEditDashboardProps) {
  const [editDashboard, { isLoading, isError }] = useUpdateDashboardMutation();

  const handleEdit = async () => {
    if (!dashboard?.title) return;

    const newTitle = prompt("Enter new title", dashboard.title);
    if (!newTitle?.trim() || newTitle.trim() === dashboard.title) return;

    try {
      await editDashboard({
        id: dashboard.id,
        data: { title: newTitle.trim() },
      }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isError && <ErrorMessage message="Failed to edit dashboard. Please try again." />}
      <Button onClick={handleEdit} disabled={isLoading} type="danger">
        {isLoading ? "Editing..." : "Edit"}
      </Button>
    </>
  );
};
