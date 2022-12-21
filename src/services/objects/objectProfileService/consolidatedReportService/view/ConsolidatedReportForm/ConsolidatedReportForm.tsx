import React, { FC } from 'react';
import { Wrapper } from './ConsolidatedReportForm.styled';
import { ConsolidatedReportFormProps } from './ConsolidatedReportForm.types';
import { Form } from 'antd';

export const ConsolidatedReportForm: FC<ConsolidatedReportFormProps> = ({
  formId,
}) => {
  return <Form id={formId} onSubmitCapture={() => {}}></Form>;
};
