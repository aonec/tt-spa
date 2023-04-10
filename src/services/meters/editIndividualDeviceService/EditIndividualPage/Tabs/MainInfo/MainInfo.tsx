import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Wrapper } from './MainInfo.styled';
import { MainInfoProps } from './MainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';

export const MainInfo: FC<MainInfoProps> = ({ individualDevice }) => {
  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      serialNumber: individualDevice?.serialNumber,
      lastCheckingDate: individualDevice?.lastCheckingDate,
      futureCheckingDate: individualDevice?.futureCheckingDate,
      
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required('Это поле обязательно'),
      lastCheckingDate: yup.string().required('Это поле обязательно'),
      futureCheckingDate: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      // onSubmit(data);
    },
  });
  return (
    <Wrapper>
      <FormItem label="Тип ресурса">
        <Select value={values.resource} disabled />
      </FormItem>
    </Wrapper>
  );
};
