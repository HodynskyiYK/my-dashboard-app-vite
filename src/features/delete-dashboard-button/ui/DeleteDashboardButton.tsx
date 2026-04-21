import { useDeleteDashboardMutation } from "@/entities/dashboards";
import { Button } from "@/shared/ui/button/Button";

interface IDeleteDashboardButtonProps {
  id: string;
}

export function DeleteDashboardButton({ id }: IDeleteDashboardButtonProps) {
  const [deleteDashboard, { isLoading }] = useDeleteDashboardMutation();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await deleteDashboard(id).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button onClick={handleDelete} disabled={isLoading}>
      Delete
    </Button>
  );
}