import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  entryNumberList,
  ipv4RegExp,
  isConnected,
} from '../../../tt-components/localBases';
import {
  Title,
  SelectTT,
  ButtonTT,
  StyledFooter,
  AutoCompleteTT,
  styles,
  StyledFormPage,
  AutoCompleteInterface,
} from '../../../tt-components';

import ModalAddCalculator from '../modals/ModalAddCalculator';
import { AddNodeContext } from '../AddNodeContext';
import { AlertInterface } from '../../../tt-components/interfaces';
import * as Yup from 'yup';
import { boolean, number } from 'yup';
import { isEmpty } from '../../../_api/utils/isEmptyErrors';

const AddNodeFirstTab = () => {
  const {
    handleCancel,
    currentTabKey,
    handleNext,
    calculators,
    addCalculatorVisible,
    setAddCalculatorVisible,
    setCalculatorForm,
  } = useContext(AddNodeContext);

  const calculatorValidationSchema = Yup.object({
    isConnected: boolean().required(),
    calculatorId: number().required(),
    entryNumber: number().required(),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      isConnected: true,
      calculatorId: null,
      entryNumber: 1,
      hasErrors: true,
    },
    validationSchema: calculatorValidationSchema,
    onSubmit: async () => {
      const form = {
        entryNumber: values.entryNumber,
        calculatorId: values.calculatorId,
      };
      console.log(form);
      setCalculatorForm(form);
      handleNext();
    },
  });

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  useEffect(() => {
    setFieldValue('hasErrors', isEmpty(errors));
  }, [values]);

  return (
    <form hidden={Number(currentTabKey) !== 1} onSubmit={handleSubmit}>
      <StyledFormPage>
        <Title color="black" style={styles.w100}>
          Настройки соединения
        </Title>
        <Form.Item label="Подключение к вычислителю" style={styles.w100}>
          <SelectTT
            name="isConnected"
            onChange={(item) => {
              setFieldValue('isConnected', item);
            }}
            placeholder="Подключение к вычислителю"
            options={isConnected}
            value={values.isConnected}
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Вычислитель, к которому подключен узел"
          style={styles.w49}
        >
          <AutoCompleteTT
            options={calculators}
            filterOption
            onSelect={(value: string, option: AutoCompleteInterface) => {
              setFieldValue('calculatorId', option.key);
            }}
          />
        </Form.Item>

        <Form.Item label="&nbsp;" colon={false} style={styles.w49}>
          <ButtonTT
            style={styles.w100}
            color="white"
            type="button"
            onClick={() => {
              setAddCalculatorVisible(true);
            }}
          >
            + Создать вычислитель
          </ButtonTT>
        </Form.Item>

        <Form.Item label="Номер ввода" style={styles.w100}>
          <SelectTT
            name="entryNumber"
            onBlur={handleBlur}
            placeholder="Выберите номер ввода"
            onChange={(value) => {
              setFieldValue('entryNumber', value);
            }}
            options={entryNumberList}
            value={values.entryNumber}
          />
          <Alert name="entryNumber" />
        </Form.Item>
      </StyledFormPage>
      <StyledFooter form right>
        <ButtonTT color="blue" big type="submit" disabled={values.hasErrors}>
          Далее
        </ButtonTT>
        <ButtonTT
          type="button"
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: 16 }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
      <ModalAddCalculator />
    </form>
  );
};

export default AddNodeFirstTab;
