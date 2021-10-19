import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  resources,
  magistrals,
  housingMeteringDeviceTypes,
  isConnected,
  ipv4RegExp,
} from '../../../../../../tt-components/localBases';
import {
  Title,
  SelectTT,
  InputTT,
  DatePickerTT,
  StyledModalBody,
  ButtonTT,
  StyledFooter,
} from '../../../../../../tt-components';
import { addOdpu, getCalculator } from '../apiAddOdpu';
import TabsComponent from './TabsComponent';

import { styles, StyledFormPage } from './styledComponents';
import styled from 'styled-components';
import { handleTabsBeforeFormSubmit } from '../../../../../../utils/handleTabsBeforeFormSubmit';
import {
  validationSchemaFlowMeter,
  validationSchemaTemperatureSensor,
} from './validationSchemas';

const StyledHint = styled.div`
  color: rgba(39, 47, 90, 0.7);
`;

const AddDeviceForm = (props) => {
  const { calculators, handleCancel, setAddOdpu } = props;
  const [currentTabKey, setTab] = useState('1');
  const [calculator, setCalculator] = useState();
  const [coldandthermo, setColdandthermo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const tabErrors = [
    {
      key: '1',
      value: ['model', 'serialNumber', 'diameter'],
    },
    {
      key: '2',
      value: ['entryNumber', 'pipeNumber', 'calculatorId'],
    },
  ];

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
      isConnected: isConnected[0].value,
      serialNumber: '',
      lastCheckingDate: moment().toISOString(true),
      futureCheckingDate: moment().add(3, 'years').toISOString(true),
      lastCommercialAccountingDate: moment().toISOString(true),
      futureCommercialAccountingDate: moment().toISOString(true),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
      resource: resources[0].value,
      model: '',
      diameter: null,
      calculatorId: null,
      entryNumber: null,
      pipeNumber: null,
      magistral: magistrals[0].value,
    },
    validationSchema,

    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        documentsIds: [],
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource: values.resource,
        model: values.model,
        diameter: values.diameter,
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: values.entryNumber,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral,
        },
      };
      addOdpu(form).then(() => {
        setTimeout(() => {
          setAddOdpu(false);
        }, 1000);
      });
    },
  });

  useEffect(() => {
    setValidationSchema(validationSchemaFlowMeter);
  }, []);

  useEffect(() => {
    if (
      values.resource === 'ColdWaterSupply' &&
      values.housingMeteringDeviceType === 'TemperatureSensor'
    ) {
      setColdandthermo(true);
    } else setColdandthermo(false);
  }, [values.resource, values.housingMeteringDeviceType]);

  useEffect(() => {
    if (values.housingMeteringDeviceType === 'FlowMeter') {
      setValidationSchema(validationSchemaFlowMeter);
    }
    if (values.housingMeteringDeviceType === 'TemperatureSensor') {
      setValidationSchema(validationSchemaTemperatureSensor);
      setFieldValue('diameter', null);
    }
  }, [values.housingMeteringDeviceType]);

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  function handleChangeTab(value) {
    setTab(value);
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handleSubmitForm() {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError === true) {
      setTab(errorTab);
    }
  }

  return (
    <form id="formikFormAddOdpu" onSubmit={handleSubmit}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
        {/*<Warning*/}
        {/*  hidden={!coldandthermo}*/}
        {/*  title="Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс."*/}
        {/*/>*/}
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Выберите тип прибора" style={styles.w100}>
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(value) => {
                setFieldValue('housingMeteringDeviceType', value);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>
          <Form.Item label="Выберите тип ресурса" style={styles.w100}>
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              defaultValue={resources[0].value}
              value={values.resource}
            />
            <Alert name="resource" />
          </Form.Item>
          <Form.Item label="Выберите модель прибора" style={styles.w49}>
            <InputTT
              name="model"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
            />
            <Alert name="model" />
          </Form.Item>
          <Form.Item label="Серийный номер" style={styles.w49}>
            <InputTT
              name="serialNumber"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.serialNumber}
            />
            <Alert name="serialNumber" />
          </Form.Item>
          {values.housingMeteringDeviceType === 'FlowMeter' ? (
            <Form.Item label="Диаметр трубы (мм)" style={styles.w100}>
              <InputTT
                name="diameter"
                placeholder="Укажите диаметр трубы в мм"
                type="number"
                onChange={handleChange}
                value={values.diameter}
                onBlur={handleBlur}
              />
              <Alert name="diameter" />
            </Form.Item>
          ) : null}
          <Form.Item label="Дата поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date.toISOString(true));
              }}
              value={moment(values.lastCheckingDate)}
            />
          </Form.Item>
          <Form.Item label="Дата следующей поверки" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString(true));
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>
          <Form.Item
            label="Дата начала Акта действия допуска"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue(
                  'lastCommercialAccountingDate',
                  date.toISOString(true)
                );
              }}
              value={moment(values.lastCommercialAccountingDate)}
            />
            <StyledHint>Только для приборов коммерческого учета</StyledHint>
          </Form.Item>
          <Form.Item
            label="Дата окончания Акта действия допуска"
            style={styles.w49}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue(
                  'futureCommercialAccountingDate',
                  date.toISOString(true)
                );
              }}
              value={moment(values.futureCommercialAccountingDate)}
            />
            <StyledHint>Только для приборов коммерческого учета</StyledHint>
          </Form.Item>
        </StyledFormPage>

        {/* Second Tabs */}
        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <Form.Item label="Подключение к вычислителю" style={styles.w100}>
            <SelectTT
              name="isConnected"
              onChange={(item) => {
                item === false ? setDisable(true) : setDisable(false);
                setFieldValue('isConnected', item);
              }}
              placeholder="Подключение к вычислителю"
              options={isConnected}
              value={values.isConnected}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
            style={styles.w100}
          >
            <SelectTT
              name="calculatorId"
              type="text"
              onBlur={handleBlur}
              placeholder="Начните вводить серийный номер или IP адрес прибора"
              onChange={(value) => {
                setFieldValue('calculatorId', value);
                getCalculator(value).then((result) => setCalculator(result));
              }}
              options={calculators}
              value={values.calculatorId}
              disabled={disable}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода" style={styles.w49}>
            <InputTT
              name="entryNumber"
              type="number"
              onBlur={handleBlur}
              placeholder="Номер ввода"
              value={values.entryNumber}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <Form.Item label="Номер трубы" style={styles.w49}>
            <InputTT
              name="pipeNumber"
              type="number"
              min="0"
              step="1"
              placeholder="Номер трубы"
              value={values.pipeNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="pipeNumber" />
          </Form.Item>

          <Form.Item name="text" label="Магистраль" style={styles.w49}>
            <SelectTT
              placeholder="Выберите направление магистрали"
              name="magistral"
              options={magistrals}
              onChange={(value) => {
                setFieldValue('magistral', value);
              }}
              value={values.magistral}
            />
            <Alert name="magistral" />
          </Form.Item>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 3}>
          <Title color="black">Компонент в разработке</Title>
        </StyledFormPage>
      </StyledModalBody>
      <StyledFooter>
        <ButtonTT
          color="blue"
          onClick={handleNext}
          big
          hidden={currentTabKey === '3'}
          disabled={coldandthermo}
          style={{ marginLeft: '16px' }}
          type="button"
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          form="formikFormAddOdpu"
          hidden={currentTabKey !== '3'}
          style={{ marginLeft: '16px' }}
          big
          disabled={coldandthermo}
          onClick={handleSubmitForm}
        >
          Добавить
        </ButtonTT>
        <ButtonTT
          type="button"
          color="white"
          onClick={handleCancel}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default AddDeviceForm;
