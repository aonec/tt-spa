import React, { FC } from 'react';
import { GridContainer } from './NewHeatingStationForm.styled';
import {
  HeatingStation,
  NewHeatingStationFormProps,
} from './NewHeatingStationForm.types';
import { StyledSelect } from '01/shared/ui/Select/components';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import { validationSchema } from './newHeatingStationForm.constants';
export const NewHeatingStationForm: FC<NewHeatingStationFormProps> = ({
  setNewHeatingStationModalData,
  setCreateModalOpen,
  setEditModalOpen,
  setInputTypeDisplayingDivShow,
  formId,
  handleCreateHeatingStation,
}) => {
  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<HeatingStation>({
    initialValues: {
      heatingStationType: '',
      heatingStationNumber: '',
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      setNewHeatingStationModalData(data);
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
        <FormItem label="Тип">
          <StyledSelect
            placeholder="Выберите из списка"
            value={values.heatingStationType || undefined}
            onChange={(value) => setFieldValue('heatingStationType', value)}
          >
            <Select.Option value={'Элемент массива строк'}>
              {'Элемент массива строк'}
            </Select.Option>
          </StyledSelect>
          <ErrorMessage>{errors?.heatingStationType}</ErrorMessage>
        </FormItem>

        <FormItem label="Название">
          <Input
            placeholder="Введите"
            value={values.heatingStationNumber || undefined}
            onChange={(value) =>
              setFieldValue('heatingStationNumber', value.target.value)
            }
          />
          <ErrorMessage>{errors?.heatingStationNumber}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
