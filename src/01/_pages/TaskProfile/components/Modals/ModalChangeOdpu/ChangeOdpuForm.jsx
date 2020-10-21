import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  ButtonTT,
  SelectTT, InputTT, DatePickerTT,
} from '../../../../../tt-components';
import TabsComponent from './components/Tabs';
import axios from '../../../../../axios';

import { housingMeteringDeviceTypes, resources } from './constants';
import { connections } from '../../../../EditODPU/constants';

const ChangeOdpuForm = () => {
  const { 1: deviceId } = useParams();

  const [calcId, setCalcId] = useState();
  const [calculator, setCalculator] = useState({});
  const {
    housingMeteringDeviceType, resource, model, lastCheckingDate, futureCheckingDate,
  } = calculator;

  const [disable, setDisable] = useState(true);

  const searchCalculator = () => {
    console.log('searchCalculator');
    getCalculator(calcId).then((res) => {
      setCalculator(res);
      setDisable(false);
      console.log(calculator);
    });
  };
  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      resource,
      housingMeteringDeviceType,
      entryNumber: '1',
      test: '',
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
      console.log('Submit');
    },
  });
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

  const [currentTabKey, setTab] = useState('1');

  function handleChangeTab(value) {
    if (disable) {
    } else {
      setTab(value);
    }
  }

  async function getCalculators(objid = '') {
    try {
      const res = await axios.get(`HousingStocks/${objid}/Devices`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса Вычислителей в этом доме',
      };
    }
  }

  const handleFormButton = () => {
    console.log('handleFormButton');
    console.log(currentTabKey);
    setTab(String(Number(currentTabKey) + 1));
  };

  async function getCalculator(id = '') {
    try {
      const res = await axios.get(`HousingMeteringDevices/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса ОДПУ',
      };
    }
  }

  const Header = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Form.Item label="Выберите дальнейшее действие" style={{ width: '49%' }}>
        <SelectTT
          disabled
          placeholder="Замена прибора"
        />
        <Alert name="Выберите дальнейшее действие" />
      </Form.Item>

      <Form.Item label="Исполнитель" style={{ width: '49%' }}>
        <SelectTT
          placeholder="Константинопольский К.К."
          disabled
        />
        <Alert name="Исполнитель" />
      </Form.Item>
    </div>
  );

  const handleFinishForm = () => {
    console.log('handleFinishForm');
    alert('Сохраняем данные об замененном ОДПУ');
  };

  const ResButton = () => {
    if (Number(currentTabKey) === 3) {
      return (<ButtonTT color="blue" disabled={disable} onClick={handleFinishForm}>Завершить</ButtonTT>);
    }

    return (<ButtonTT color="blue" disabled={disable} onClick={handleFormButton}>Далее</ButtonTT>);
  };

  // address: {city: "Нижнекамск", street: "Тихая Аллея", housingStockNumber: "4", corpus: null}
  // closingDate: null
  // diameter: null
  // futureCheckingDate: "2020-10-21T18:48:06.063"
  // futureCommercialAccountingDate: "2026-10-20T14:19:51.346"
  // housingMeteringDeviceType: "FlowMeter"
  // hubConnection: {hub: {…}, calculatorId: 1212, calculatorSerialNumber: "142834", calculatorModel: "ВКТ-7"}
  // id: 1559216
  // lastCheckingDate: "2020-10-21T18:48:06.063"
  // lastCommercialAccountingDate: "2020-10-20T14:19:28.556"
  // model: "ПРЭМ 2110"
  // resource: "ColdWaterSupply"
  // serialNumber: "211020202141"
  // transactionType: null

  return (
    <>
      <Header />
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
        disabled
      />
      <form
        id="formikForm"
        onSubmit={handleSubmit}
      >
        <div
          hidden={!(Number(currentTabKey) === 1)}
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Form.Item label="Серийный номер" style={{ display: 'flex', width: '49%' }}>
            <InputTT
              style={{ width: '75%' }}
              placeholder="1234567890"
              onChange={(event) => {
                setCalcId(event.target.value);
              }}
            />
            <ButtonTT color="blue" onClick={searchCalculator}>Поиск</ButtonTT>
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Тип прибора" style={{ width: '49%' }}>
            <SelectTT
              placeholder="Тип прибора"
              options={housingMeteringDeviceTypes}
              value={housingMeteringDeviceType}
              disabled
            />
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
            <SelectTT
              placeholder="Холодная вода"
              options={resources}
              value={resource}
              disabled
            />
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Модель прибора" style={{ width: '49%' }}>
            <InputTT
              disabled
              placeholder={model || 'Модель прибора'}
            />
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
            <DatePickerTT
              disabled
              value={moment(lastCheckingDate)}
              format="DD.MM.YYYY"
            />
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
            <DatePickerTT
              disabled
              value={moment(futureCheckingDate)}
              format="DD.MM.YYYY"
            />
            <Alert name="Alert" />
          </Form.Item>

          <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
            <SelectTT
              disabled
              placeholder="Срок эксплуатации по нормативу"
            />
            <Alert name="Alert" />
          </Form.Item>
        </div>

        <div hidden={!(Number(currentTabKey) === 2)}>
          <Form.Item label="Подключение к вычислителю">
            <SelectTT
              name="connection"
              onChange={(value) => {
                console.log(value);
                if (!value) {
                  values.calculatorId = null;
                  values.entryNumber = null;
                  values.pipeNumber = null;
                  values.hubNumber = null;
                }
                setFieldValue('connection', value);
              }}
              options={connections}
              value={values.connection}
            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
          >
            {/* <SelectTT */}
            {/*  name="calculatorId" */}
            {/*  onChange={(value) => { */}
            {/*    // values.entryNumber = entryNumber; */}
            {/*    // values.pipeNumber = pipeNumber; */}
            {/*    // values.hubNumber = hubNumber; */}
            {/*    setFieldValue('calculatorId', value); */}
            {/*    console.log(value); */}
            {/*  }} */}
            {/*  options={calculators} */}
            {/*  value={values.calculatorId} */}
            {/*  disabled={disable} */}
            {/* /> */}
            <Alert name="calculatorId" />
          </Form.Item>

          {/* <Form.Item */}
          {/*  label="Выберите вычислитель, к которому подключен прибор" */}
          {/* > */}
          {/*  <InputTT */}
          {/*    name="calculatorId" */}
          {/*    type="number" */}
          {/*    placeholder="Начните вводить ID прибора" */}
          {/*    onChange={handleChange} */}
          {/*    value={values.calculatorId} */}
          {/*    disabled={disable} */}
          {/*  /> */}
          {/*  <Alert name="calculatorId" /> */}
          {/* </Form.Item> */}

          <Form.Item label="Номер ввода">
            <InputTT
              name="entryNumber"
              type="number"
              placeholder="Номер ввода"
              onChange={handleChange}
              value={values.entryNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер узла" className="hubNumber">
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onChange={handleChange}
              value={values.hubNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер трубы">
            <InputTT
              name="pipeNumber"
              type="number"
              placeholder="Номер трубы"
              onChange={handleChange}
              value={values.pipeNumber}
              disabled={disable}
            />
          </Form.Item>
        </div>

        <ResButton />

        {/* <Form.Item label="Дополнительное поле"> */}
        {/*  <InputTT */}
        {/*    value={values.test} */}
        {/*    onChange={handleChange} */}
        {/*    onBlur={handleBlur} */}
        {/*    name="test" */}
        {/*    type="text" */}
        {/*  /> */}
        {/*  <Alert name="test" /> */}
        {/* </Form.Item> */}
      </form>
    </>
  );
};

export default ChangeOdpuForm;
