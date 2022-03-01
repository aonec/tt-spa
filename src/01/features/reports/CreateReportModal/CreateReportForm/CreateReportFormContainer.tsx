import { useForm } from 'effector-forms/dist';
import React from 'react';
import { form } from '../models';
import { CreateReportForm } from './CreateReportForm';

export const CreateReportFormContainer = () => {
  const {
    fields: {
      type: { value, onChange },
    },
  } = useForm(form);

  return <CreateReportForm type={value} setType={onChange} />;
};
