import { useForm, type SubmitHandler } from "react-hook-form";
import { createDashboardValidation, type ICreateDashboardFormValues } from "@/features/create-dashboard";
import { useCreateDashboardMutation } from "@/entities/dashboards";

export function CreateDashboardForm() {
  const [createDashboard, { isLoading }] = useCreateDashboardMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ICreateDashboardFormValues>();
  const onSubmitHandler: SubmitHandler<ICreateDashboardFormValues> = async (data) => {
    try {
      await createDashboard(data).unwrap();
    reset();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label htmlFor="title">Dashboard title</label>
        <br />
        <input {...register("title", createDashboardValidation.title)} />
        <p style={{color: "red"}}>{errors?.title?.message}</p>
      </div>
      <div>
        <button type="submit" disabled={isLoading}>Create</button>
      </div>
    </form>
  )
}