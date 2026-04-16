import type { RegisterOptions } from 'react-hook-form';
import type { ICreateDashboardFormValues } from './types';

export const createDashboardValidation: {
  title: RegisterOptions<ICreateDashboardFormValues, "title">
} = {
  title: {
    required: 'Title is required',
    minLength: {
      value: 10,
      message: 'Min length is 10',
    },
    maxLength: {
      value: 100,
      message: 'Max length is 100',
    },
  },
};