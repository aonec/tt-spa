import React, { FC } from 'react';
import { GridContainer } from './NewHeatingPointForm.styled';
import {
  HeatingPoint,
  NewHeatingPointFormProps,
} from './NewHeatingPointForm.types';
import { StyledSelect } from '01/shared/ui/Select/components';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { validationSchema } from './newHeatingPointForm.constants';
export const NewHeatingPointForm: FC<NewHeatingPointFormProps> = ({
  setNewHeatingPointModalData,
  setCreateModalOpen,
  setEditModalOpen,
  setInputTypeDisplayingDivShow,
  formId,
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<HeatingPoint>({
    initialValues: {
      heatingPointType: '',
      heatingPointNumber: '',
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      setNewHeatingPointModalData(data);
      console.log(data);
      setCreateModalOpen && setCreateModalOpen(false);
      setEditModalOpen && setEditModalOpen(false);
      setInputTypeDisplayingDivShow && setInputTypeDisplayingDivShow(true);
    },
    validateOnBlur: true,
    validationSchema,
  });
  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Тип ТП">
          <StyledSelect
            placeholder="Выберите из списка"
            value={values.heatingPointType}
            onChange={(value) => setFieldValue('heatingPointType', value)}
          >
            <Select.Option value={'Элемент массива строк'}>
              {'Элемент массива строк'}
            </Select.Option>
          </StyledSelect>
          <ErrorMessage>{errors?.heatingPointType}</ErrorMessage>
        </FormItem>

        <FormItem label="Номер ТП">
          <Input
            placeholder="Введите"
            value={values.heatingPointNumber}
            onChange={(value) =>
              setFieldValue('heatingPointNumber', value.target.value)
            }
          />
          <ErrorMessage>{errors?.heatingPointNumber}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
