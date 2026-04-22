import { useUpdateDashboardMutation, useGetDashboardByIdQuery } from "@/entities/dashboards";
import { Button } from "@/shared/ui/button";
import { ErrorMessage } from "@/shared/ui/error-message";

interface IEditDashboardProps {
  id: string;
}

export function EditDashboard({ id }: IEditDashboardProps) {
  const [editDashboard, { isLoading, isError }] = useUpdateDashboardMutation();
  const dashboard = useGetDashboardByIdQuery(id).data;

  const handleEdit = async () => {
    const newTitle = prompt("Enter new title", dashboard?.title);
    if (!newTitle?.trim()) return;

    try {
      await editDashboard({ id, title: newTitle }).unwrap();
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
