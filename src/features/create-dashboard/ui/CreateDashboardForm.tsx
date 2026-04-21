import { useState, useEffect } from "react";
import { set, useForm, type SubmitHandler } from "react-hook-form";
import { createDashboardValidation, type ICreateDashboardFormValues } from "@/features/create-dashboard";
import { useCreateDashboardMutation } from "@/entities/dashboards";
import { SuccessMessage, ErrorMessage } from "@/shared/ui";
import type { TCreateDashboardStatus } from "../model/types";

export function CreateDashboardForm() {
  const [status, setStatus] = useState<TCreateDashboardStatus>('idle');
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
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  useEffect(() => {
  if (status === 'idle') return;

  const timer = setTimeout(() => {
    setStatus('idle');
  }, 2500);

  return () => clearTimeout(timer);
}, [status]);

  return (
    <>
      {status === "error" && <ErrorMessage message="Error creating dashboard" />}
      {status === "success" && <SuccessMessage message="Dashboard created successfully!" />}
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