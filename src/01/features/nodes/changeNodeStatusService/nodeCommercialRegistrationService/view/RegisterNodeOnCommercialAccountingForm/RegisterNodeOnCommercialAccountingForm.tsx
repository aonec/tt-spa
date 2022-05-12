import { Form } from 'antd';
import { useFormik } from 'formik';
import { NodeAdmissionActRequest } from 'myApi';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { RegisterNodeOnCommercialAccountingFormProps } from './RegisterNodeOnCommercialAccountingForm.types';

export const RegisterNodeOnCommercialAccountingForm: FC<RegisterNodeOnCommercialAccountingFormProps> = ({ handleSubmit }) => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const { handleSubmit: submitForm } = useFormik<NodeAdmissionActRequest>({
    initialValues: {} as any,
    onSubmit: (values) =>
      handleSubmit({ data: values, pipeNodeId: Number(nodeId) }),
  });

  return <Form id='register-node-on-commertion-accounting-form' onSubmitCapture={submitForm}></Form>;
};
