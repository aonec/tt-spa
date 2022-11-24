import React, { FC } from 'react';
import { GridContainer } from './CreateNewHeatingPointForm.styled';
import {
  CreateNewHeatingPointFormProps,
  HeatingPoint,
} from './CreateNewHeatingPointForm.types';
import { StyledSelect } from '01/shared/ui/Select/components';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
export const CreateNewHeatingPointForm: FC<CreateNewHeatingPointFormProps> = ({
  setNewHeatingPointModalData,
  setCreateModalOpen,
}) => {
  const validationsSchema = yup.object().shape({
    heatingPoint: yup.object().shape({
      heatingPointType: yup.string().required('Обязательное поле'),
      heatingPointNumber: yup.string().required('Обязательное поле'),
    }),
  });

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<HeatingPoint>({
    initialValues: {
      heatingPoint: { heatingPointType: '', heatingPointNumber: '' },
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      setNewHeatingPointModalData(data);
      setCreateModalOpen(false);
    },
    validateOnBlur: true,
    validationSchema: validationsSchema,
  });
  return (
    <GridContainer>
      <FormItem label="Тип ТП">
        <StyledSelect
          placeholder="Выберите из списка"
          value={values.heatingPoint.heatingPointType}
          onChange={(value) =>
            setFieldValue('heatingPoint', {
              ...values.heatingPoint,
              heatingPointType: value,
            })
          }
        >
          <Select.Option value={'Элемент массива строк'}>
            {'Элемент массива строк'}
          </Select.Option>
        </StyledSelect>
        <ErrorMessage>{errors.heatingPoint?.heatingPointType}</ErrorMessage>
      </FormItem>

      <FormItem label="Номер ТП">
        <Input
          placeholder="Введите"
          value={values.heatingPoint.heatingPointNumber}
          onChange={(value) =>
            setFieldValue('heatingPoint', {
              ...values.heatingPoint,
              heatingPointNumber: value.target.value,
            })
          }
        />
        <ErrorMessage>{errors.heatingPoint?.heatingPointNumber}</ErrorMessage>
      </FormItem>
    </GridContainer>
  );
};
