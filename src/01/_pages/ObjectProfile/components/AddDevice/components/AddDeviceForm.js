import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import styled from 'styled-components';
import {
  resources, magistrals, housingMeteringDeviceTypes, isConnected,
} from '../../../../../tt-components/localBases';
import {
  Title, SelectTT, InputTT, DatePickerTT, StyledModalBody, ButtonTT, StyledFooter,
} from '../../../../../tt-components';
import { addOdpu } from '../apiAddOdpu';
import TabsComponent from './Main';
import {getCalculator} from '../apiAddOdpu'

import {styles, StyledFormPage} from './styledComponents'



const AddDeviceForm = (props) => {
  const { calculators, setAddOdpu } = props;
  const [currentTabKey, setTab] = useState('1');
  const [calculator, setCalculator] = useState({});

  function handleCancel() {
    setAddOdpu(false);
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  useEffect(() => {
    console.log('calculator', calculator)
  },[calculator])

  const handleNext = () => {
    setTab(String(Number(currentTabKey) + 1));
  };

  const [disable, setDisable] = useState(false);
  const [state, setState] = useState('FlowMeter');
  const [coldandthermo, setColdandthermo] = useState(false);

  const validationSchemaFlowMeter = Yup.object({
    model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
    serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
    calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
    entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение')
      .required('Введите число от 1'),
  });

  const validationSchemaTemperatureSensor = Yup.object({
    model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите модель'),
    serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите серийный номер'),
    calculatorId: Yup.number().typeError('Вы не выбрали вычислитель').required('Выберите вычислитель'),
    entryNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
    pipeNumber: Yup.number().min(0).max(10, 'Укажите число до 10').typeError('Введите число, значение не может быть пустым')
      .required('Введите номер'),
  });

  const [validationSchema, setValidationSchema] = useState(validationSchemaFlowMeter);

  useEffect(() => {
    console.log('state', state);
    if (state === 'FlowMeter') {
      setValidationSchema(validationSchemaFlowMeter);
    }
    if (state === 'TemperatureSensor') {
      setValidationSchema(validationSchemaTemperatureSensor);
      setFieldValue('diameter', null);
    }
  }, [state]);

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

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      isConnected: isConnected[0].value,
      serialNumber: '',
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
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
      hubNumber: null,
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
          hubNumber: values.hubNumber || null,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral,
        },
      };
      console.log(form);
      console.log(JSON.stringify(form));
      addOdpu(form).then(() => {
        setTimeout(() => { setAddOdpu(false); }, 1000);
      });
    },
  });

  useEffect(() => {
    console.log(values);
    if (values.resource === 'ColdWaterSupply' && values.housingMeteringDeviceType === 'TemperatureSensor') {
      // alert('Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс');
      setColdandthermo(true);
    } else setColdandthermo(false);
  }, [values.resource, values.housingMeteringDeviceType]);

  const Buttons = () => {
    const OkButton = ({handleNext, currentTabKey, handleCancel}) => {
      if (currentTabKey !== '3') {
        return (
          <ButtonTT
            color="blue"
            onClick={handleNext}
            big
            // disabled={coldandthermo}
          >
            Далее
          </ButtonTT>
        );
      }
      else {return null}
    }
    const NextOkButton = () => {
      if (currentTabKey === '3') {
        return (
          <ButtonTT
            color="blue"
            type="submit"
            form="formikFormAddOdpu"
            big
            // disabled={coldandthermo}
          >
            Добавить
          </ButtonTT>
        );
      }
      else {return null}


    };

    const CancelButton = () => (
      <ButtonTT type="button" color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );

    return (
      <StyledFooter>
        <NextOkButton style={{ marginLeft: '16px' }} />
        <OkButton style={{ marginLeft: '16px' }} />
        <CancelButton />
      </StyledFooter>
    );
  };
  


  return (

    <form
      id="formikFormAddOdpu"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового ОДПУ
        </Title>
        <div hidden={!coldandthermo}>Для данного узла не предусмотрено наличие термодатчика. Проверьте выбранный ресурс</div>
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
                setState(value);
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

          {(state === 'FlowMeter') ? (
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
                setFieldValue('lastCheckingDate', date.toISOString());
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
                setFieldValue('futureCheckingDate', date.toISOString());
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата начала Акта действия допуска" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.lastCommercialAccountingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата окончания Акта действия допуска" style={styles.w49}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.futureCommercialAccountingDate)}
            />
          </Form.Item>
        </StyledFormPage>

        {/* Second Tabs */}
        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <Form.Item label="Подключение к вычислителю" style={styles.w100}>
            <SelectTT
              name="isConnected"
              onChange={(item) => {
                (item === false) ? setDisable(true) : setDisable(false);
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
                console.log(value)
                setFieldValue('calculatorId', value);
                getCalculator(value).then(result => setCalculator(result));
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

          <Form.Item label="Номер узла" style={styles.w49}>
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onBlur={handleBlur}
              value={values.hubNumber}
              onChange={handleChange}
              disabled={disable}
            />
            <Alert name="hubNumber" />
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

          <Form.Item name="text" label="Выберите направление магистрали" style={styles.w49}>
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
      {Buttons}
    </form>
  );
};

export default AddDeviceForm;

{ /* "lastCommercialAccountingDate": "2020-11-09T13:07:26.129", */ }
{ /* "futureCommercialAccountingDate": "2020-11-09T13:07:26.13", */ }
{ /* "lastCheckingDate": "2020-11-13T13:28:13.355", */ }
{ /* "futureCheckingDate": "2020-11-13T13:28:13.355", */ }
