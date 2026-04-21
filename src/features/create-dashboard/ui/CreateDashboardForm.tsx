import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createDashboardValidation, type ICreateDashboardFormValues } from "@/features/create-dashboard";
import { useCreateDashboardMutation } from "@/entities/dashboards";
import { SuccessMessage, ErrorMessage } from "@/shared/ui";

export function CreateDashboardForm() {
  const [isShowingSuccessMessage, setIsShowingSuccessMessage] = useState<boolean>(false);
  const [isShowingErrorMessage, setIsShowingErrorMessage] = useState<boolean>(false);
  const [createDashboard, { isLoading, reset: resetMutation }] = useCreateDashboardMutation();
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

      setIsShowingSuccessMessage(true);
    } catch (error) {
      setIsShowingErrorMessage(true);
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsShowingSuccessMessage(false);
        setIsShowingErrorMessage(false);
        resetMutation();
      }, 2500);
    }
  };

  return (
    <>
      {isShowingErrorMessage && <ErrorMessage message="Error creating dashboard" />}
      {isShowingSuccessMessage && <SuccessMessage message="Dashboard created successfully!" />}
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
};