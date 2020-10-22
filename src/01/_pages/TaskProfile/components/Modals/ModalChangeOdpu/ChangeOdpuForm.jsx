import React, { useState } from 'react';
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

import { housingMeteringDeviceTypes, resources, connections, serviceLife } from './constants';

const ChangeOdpuForm = () => {
  const [calcId, setCalcId] = useState('211020202141');
  const [disable, setDisable] = useState(false);
  const [odpu, setOdpu] = useState({});

  const {
    address, closingDate, diameter, housingMeteringDeviceType,
    resource, model, lastCheckingDate, futureCheckingDate,
    futureCommercialAccountingDate, hubConnection, id, lastCommercialAccountingDate, serialNumber, transactionType,
  } = odpu;
  console.log('hubConnection', hubConnection);
  const {
    calculatorConnection, calculatorId, calculatorModel, calculatorSerialNumber, hub,
  } = { ...hubConnection };
  const {
    isConnected, deviceAddress, ipV4, port,
  } = { ...calculatorConnection };
  const {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = { ...hub };
  const {
    id: houseId, city, street, housingStockNumber,
  } = { ...address };

  // Поиск устройства по серийному номеру
  async function getMeteringDevices(url = ''){
    try {
      const res = await axios.get(`MeteringDevices/search?DeviceType=Housing&Question=${url}`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  // Поиск ОДПУ по id, который можно получить из getMeteringDevices
  async function getHousingMeteringDevices(url = ''){
    try {
      const res = await axios.get(`HousingMeteringDevices/${url}`);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  const searchCalculator = () => {
    console.log(odpu);
    getMeteringDevices(calcId).then((res) => {
      setCalcId(res[0].id);
      getHousingMeteringDevices(res[0].id).then((res) => {
        setOdpu(res);
        setDisable(false);
      });
    });
  };

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      resource: '',
      housingMeteringDeviceType: '',
      model: '',
      entryNumber: '',
      pipeNumber: '',
      hubNumber: '',
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

  function handleChangeTab(value){
    if (disable) {
    } else {
      setTab(value);
    }
  }

  const handleFormButton = () => {
    console.log('handleFormButton');
    console.log(currentTabKey);
    setTab(String(Number(currentTabKey) + 1));
  };

  const Header = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Form.Item label="Выберите дальнейшее действие" style={{ width: '49%' }}>
        <SelectTT
          disabled
          placeholder="Замена прибора"
        />
        <Alert name="Выберите дальнейшее действие"/>
      </Form.Item>

      <Form.Item label="Исполнитель" style={{ width: '49%' }}>
        <SelectTT
          placeholder="Константинопольский К.К."
          disabled
        />
        <Alert name="Исполнитель"/>
      </Form.Item>
    </div>
  );

  const handleFinishForm = () => {
    console.log('handleFinishForm');
    alert('Сохраняем данные об замененном ОДПУ');
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(odpu);
  };

  const ResButton = () => {
    if (Number(currentTabKey) === 3) {
      return (<ButtonTT color="blue" disabled={disable} onClick={handleFinishForm}>Завершить</ButtonTT>);
    }

    return (<ButtonTT color="blue" disabled={disable} onClick={handleFormButton}>Далее</ButtonTT>);
  };

  return (
    <>
      <Header/>
      <ButtonTT color="blue" onClick={buttonHandler}>Button</ButtonTT>
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
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
              value="211020202141"
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
              name="housingMeteringDeviceType"
              onChange={(event) => {
                setFieldValue('housingMeteringDeviceType', event);
              }}
              value={values.housingMeteringDeviceType || housingMeteringDeviceTypes[housingMeteringDeviceType]}
              disabled={disable}
            />
            <Alert name="Alert"/>
          </Form.Item>

          <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
            <SelectTT
              placeholder="Холодная вода"
              options={resources}
              value={values.resource}
              disabled={disable}
            />
            <Alert name="Alert"/>
          </Form.Item>

          <Form.Item label="Модель прибора" style={{ width: '49%' }}>
            <InputTT
              name="model"
              // disabled={disable}
              onChange={handleChange}
              value={values.model || model || ''}
            />
            <Alert name="model"/>
          </Form.Item>

          <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
            <DatePickerTT
              disabled={disable}
              value={moment(lastCheckingDate)}
              format="DD.MM.YYYY"
            />
            <Alert name="Alert"/>
          </Form.Item>

          <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
            <DatePickerTT
              disabled={disable}
              value={moment(futureCheckingDate)}
              format="DD.MM.YYYY"
            />
            <Alert name="Alert"/>
          </Form.Item>

          <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
            <SelectTT
              disabled={disable}
              placeholder="Срок эксплуатации по нормативу"
            />
            <Alert name="Alert"/>
          </Form.Item>
        </div>

        <div
          hidden={!(Number(currentTabKey) === 2)}
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Form.Item label="Подключение к вычислителю" style={{ width: '49%' }}>
            <SelectTT
              name="connection"
              onChange={(value) => {
                console.log(value);
                setFieldValue('connection', value);
              }}
              options={connections}
              value={values.connection}
            />
          </Form.Item>

          <Form.Item label="Номер ввода" style={{ width: '49%' }}>
            <InputTT
              name="entryNumber"
              type="number"
              placeholder="Номер ввода"
              onChange={handleChange}
              value={values.entryNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер узла" className="hubNumber" style={{ width: '49%' }}>
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onChange={handleChange}
              value={values.hubNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер трубы" style={{ width: '49%' }}>
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

        <ResButton/>
      </form>
    </>
  );
};

export default ChangeOdpuForm;
