import { useForm, type SubmitHandler } from "react-hook-form";
import { createDashboardValidation, type ICreateDashboardFormValues } from "@/features/create-dashboard";
import { useCreateDashboardMutation } from "@/entities/dashboards";

export function CreateDashboardForm() {
  const [createDashboard, { isLoading, isError, isSuccess }] = useCreateDashboardMutation();
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
    <>
      {isError && <p style={{ color: "red", border: "1px solid red" }}>Error creating dashboard</p>}
      {isSuccess && <p style={{ color: "green", border: "1px solid green" }}>Dashboard created successfully!</p>}
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
    </>
  )
}