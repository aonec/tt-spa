import React, { useContext, useEffect, useState } from 'react';
import { AutoComplete, Form } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import { isConnected } from '../../../tt-components/localBases';
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

import { calculatorValidationSchema } from './validationSchemas';
import ModalAddCalculator from '../modals/ModalAddCalculator';
import { AddNodeContext } from '../AddNodeContext';
import { AlertInterface } from '../../../tt-components/interfaces';

const AddNodeFirstTab = () => {
  const {
    handleCancel,
    currentTabKey,
    handleNext,
    calculators,
    addCalculator,
    setAddCalculator,
    communicationPipes,
    isEmpty,
    setFirstTab,
  } = useContext(AddNodeContext);

  const [validationSchema, setValidationSchema] = useState(
    calculatorValidationSchema
  );

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
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        entryNumber: values.entryNumber,
        calculatorId: values.calculatorId,
      };
      console.log(form);
      setFirstTab(form);
      handleNext();
    },
  });

  function setCalculator(id: number) {
    setFieldValue('calculatorId', id);
  }

  useEffect(() => {
    setFieldValue('devices', communicationPipes);
  }, [communicationPipes]);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  const entryNumberList = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
  ];

  const handleModalAddCalculator = () => {
    setAddCalculator(true);
  };

  useEffect(() => {
    console.log('values', values);
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
      <StyledFooter form right>
        <ButtonTT color="blue" big type="submit" disabled={!isEmpty(errors)}>
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
      <ModalAddCalculator
        setVisible={setAddCalculator}
        visible={addCalculator}
      />
    </form>
  );
};

export default AddNodeFirstTab;
