import React, { FC } from 'react';
import { GridContainer } from './NewHeatingStationForm.styled';
import {
  HeatingStation,
  HeatingStationType,
  NewHeatingStationFormProps,
} from './NewHeatingStationForm.types';
import { StyledSelect } from '01/shared/ui/Select/components';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import { Input } from 'ui-kit/Input';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { Form } from 'antd';
import {
  HeatingStationTypeDictionary,
  validationSchema,
} from './newHeatingStationForm.constants';

export const NewHeatingStationForm: FC<NewHeatingStationFormProps> = ({
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
      isThermalChamber: null,
      name: null,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      handleCreateHeatingStation(data);
      console.log(data);
    },
    validateOnChange: false,
    validationSchema,
  });
  return (
    <Form id={formId} onSubmitCapture={handleSubmit}>
      <GridContainer>
        <FormItem label="Тип">
          <StyledSelect
            placeholder="Выберите из списка"
            value={values.isThermalChamber || undefined}
            onChange={(value) => setFieldValue('isThermalChamber', value)}
          >
            {Object.values(HeatingStationType).map((e) => (
              <Select.Option value={e} key={e}>
                {HeatingStationTypeDictionary[e]}
              </Select.Option>
            ))}
          </StyledSelect>
          <ErrorMessage>{errors?.isThermalChamber}</ErrorMessage>
        </FormItem>

        <FormItem label="Название">
          <Input
            placeholder="Введите"
            value={values.name || undefined}
            onChange={(value) => setFieldValue('name', value.target.value)}
          />
          <ErrorMessage>{errors?.name}</ErrorMessage>
        </FormItem>
      </GridContainer>
    </Form>
  );
};
