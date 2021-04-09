import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  entryNumberList,
  isConnected,
} from '../../../tt-components/localBases';
import {
  Title,
  SelectTT,
  ButtonTT,
  StyledFooter,
  styles,
  StyledFormPage,
  AutoCompleteTT,
} from '../../../tt-components';

import ModalAddCalculator from '../modals/ModalAddCalculator';
import { AddNodeContext } from '../AddNodeContext';
import { AlertInterface } from '../../../tt-components/interfaces';
import { isEmpty } from '../../../_api/utils/isEmptyErrors';
import * as Yup from 'yup';

const AddNodeFirstTab = () => {
  const {
    handleCancel,
    currentTabKey,
    handleNext,
    setNode,
    calculators,
    setAddCalculator,
    communicationPipes,
  } = useContext(AddNodeContext);

  const validationSchema = Yup.object({
    calculatorId: Yup.number().required(),
    entryNumber: Yup.number().required(),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      isConnected: true,
      calculatorId: undefined,
      entryNumber: 1,
      disabled: true,
    },
    validationSchema: validationSchema,

    onSubmit: async () => {
      const form = {
        isConnected: values.isConnected,
        entryNumber: values.entryNumber,
        calculatorId: values.calculatorId,
      };
      console.log(form);

      setNode((prevState: any) => ({
        ...prevState,
        ...form,
      }));
      handleNext();
    },
  });

  useEffect(() => {
    setFieldValue('devices', communicationPipes);
  }, [communicationPipes]);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  const handleModalAddCalculator = () => {
    setAddCalculator(true);
  };

  useEffect(() => {
    setFieldValue('disabled', isEmpty(errors));
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
            filterOption
            options={calculators}
            onSelect={(value: string, option: any) => {
              setFieldValue('calculatorId', option.key);
            }}
          />
        </Form.Item>

        <Form.Item label="&nbsp;" colon={false} style={styles.w49}>
          <ButtonTT
            style={styles.w100}
            color="white"
            type="button"
            onClick={handleModalAddCalculator}
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
      <StyledFooter form>
        <ButtonTT color="blue" big type="submit" disabled={values.disabled}>
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
