import React, { FC, useState } from 'react';
import { GridContainer } from './AddNewApartmentStage.styled';
import { AddNewApartmentStageProps } from './AddNewApartmentStage.types';
import { PersonalNumberForm } from 'services/homeowner/personalNumber/components/PersonalNumberForm';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Form } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

export const AddNewApartmentStage: FC<AddNewApartmentStageProps> = ({
  apartment,
  formId,
  handleSubmitAddNewApartmentStage,
}) => {
  const address = apartment?.housingStock?.address?.mainAddress;

  const { values, setFieldValue, errors, handleSubmit } = useFormik<{
    apartmentNumber: number | null;
  }>({
    initialValues: {
      apartmentNumber: null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    // enableReinitialize: true,
    onSubmit: (data) => {},
  });

  return (
    <>
      <Form onSubmitCapture={handleSubmit} id={formId}>
        <GridContainer>
          <FormItem label="Улица">
            <Input value={address?.street || undefined} disabled />
          </FormItem>
          <FormItem label="Дом">
            <Input value={address?.number || undefined} disabled />
          </FormItem>
          <FormItem label="Квартира">
            <Input
              type="number"
              value={values.apartmentNumber || undefined}
              onChange={(value) =>
                setFieldValue('apartmentNumber', value.target.value)
              }
            />
            <ErrorMessage>{errors.apartmentNumber}</ErrorMessage>
          </FormItem>
        </GridContainer>
      </Form>

      <PersonalNumberForm
        type={PersonalNumberActions.Split}
        formId={formId}
        handleSubmitAddNewApartmentStage={handleSubmitAddNewApartmentStage}
        apartmentNumber={values.apartmentNumber}
        apartmentId={apartment?.id}
      />
    </>
  );
};
