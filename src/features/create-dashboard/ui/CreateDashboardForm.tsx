import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createDashboardValidation, type ICreateDashboardFormValues } from "@/features/create-dashboard";
import { useCreateDashboardMutation } from "@/entities/dashboards";
import { SuccessMessage, ErrorMessage } from "@/shared/ui";
import type { TCreateDashboardStatus } from "../model/types";

import styles from "./CreateDashboardForm.module.css";
import { Button } from "@/shared/ui/button/Button";

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
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles.form}
      >
        <div>
          <input
            placeholder="Enter dashboard title" {...register("title", createDashboardValidation.title)}
            className={`${styles.input} ${errors?.title ? styles.error : ""}`}
          />
          <p className={styles.error}>{errors?.title?.message}</p>
        </div>
        <div>
          <Button disabled={isLoading}>Create</Button>
        </div>
      </form>
    </>
  )
};