import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  isConnected,
} from '../../../tt-components/localBases';
import {
  Title, SelectTT, ButtonTT, StyledFooter, AutoCompleteTT,
} from '../../../tt-components';
import { styles, StyledFormPage } from './styledComponents';
import { AddNodeContext } from '../index';
import {calculatorValidationSchema} from "./validationSchemas";
import ModalAddCalculator from "../modals/ModalAddCalculator";

const AddNodeSecondTab = () => {
  const {
    handleCancel,
    currentTabKey,
    handleNext,
    setNode,
    calculators,
    setAddCalculator,
    communicationPipes,
    isEmpty,
  } = useContext(AddNodeContext);

  const [validationSchema, setValidationSchema] = useState(calculatorValidationSchema);



  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      isConnected: true,
      calculatorId: null,
      entryNumber: null,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        isConnected: values.isConnected,
        entryNumber: values.entryNumber,
        calculatorId: values.calculatorId,
      };
      console.log(form);

      setNode((prevState) => ({
        ...prevState,
        ...form,
      }));
      handleNext();
    },
  });

  function setCalculator(id){
    setFieldValue('calculatorId', id)
  }


  useEffect(() => {
    setFieldValue('devices', communicationPipes);
  }, [communicationPipes]);

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
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

  return (
    <form
      hidden={Number(currentTabKey) !== 2}
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <StyledFormPage>
        <Title color="black" style={styles.w100}>Настройки соединения</Title>
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

        <Form.Item label="Вычислитель, к которому подключен узел" style={styles.w49}>
          <AutoCompleteTT
            options={calculators}
            onSelect={(value, option) => {
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

        <Form.Item
          label="Номер ввода"
          style={styles.w100}
        >
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
        <ButtonTT
          color="blue"
          big
          type="submit"
          disabled={!isEmpty(errors)}
        >
          Далее
        </ButtonTT>
        <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
          Отмена
        </ButtonTT>
      </StyledFooter>
      <ModalAddCalculator setCalculator={setCalculator}/>

    </form>
  );
};

export default AddNodeSecondTab;
