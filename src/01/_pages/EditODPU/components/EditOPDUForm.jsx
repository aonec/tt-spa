import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import moment from 'moment';
import {
  types, resources, serviceLife, connections,
} from '../constants';
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT,
} from '../../../tt-components';
import axios from '../../../axios';

const FormEditODPU = (props) => {
  const {
    currentTabKey, device,
  } = props;

  const { 0: objid, 1: deviceId } = useParams();

  const {
    address,
    hubConnection,
    id,
    transactionType,
    model,
    serialNumber,
    connection,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    closingDate,
  } = device;

  const {
    calculatorId, entryNumber, hubNumber, pipeNumber, calculatorSerialNumber, calculatorModel,
  } = hubConnection;
  const {
    city, street, housingStockNumber, corpus,
  } = address;
  const {
    isConnected, ipV4, port, deviceAddress,
  } = connection;

  function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const EditODPUButtons = () => (
    <div>
      <ButtonTT
        type="submit"
        color="blue"
        form="formikForm"
      >
        Сохранить
      </ButtonTT>

      <NavLink to={`/objects/${objid}/devices/${deviceId}/`}>
        <ButtonTT
          style={{ marginLeft: '16px' }}
          color="white"
        >
          Отмена
        </ButtonTT>
      </NavLink>
    </div>
  );

  const {
    handleSubmit,
    handleChange, values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: types[0].value,
      resource: resources[0].value,
      model: model || 'Модель не указана',
      serialNumber: serialNumber || 'Серийный номер не указан',
      lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      futureCommercialAccountingDate,
      calculatorId: calculatorId || 'Вычислитель не выбран',
      entryNumber,
      hubNumber,
      pipeNumber,
      connection: String(isConnected),
      port: port || 0,
      checkingDate: moment().toISOString(),
      city,
      street,
      number: housingStockNumber,
      calculator: calculatorId,
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
    }),
    onSubmit: async () => {
      console.log('Submit');
      console.log(PUT_EDIT_FORM);
      editOPDU();
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

  const PUT_EDIT_FORM = {
    serialNumber: values.serialNumber,
    checkingDate: values.checkingDate,
    futureCheckingDate: values.futureCheckingDate,
    lastCommercialAccountingDate: values.lastCommercialAccountingDate,
    futureCommercialAccountingDate: values.futureCommercialAccountingDate,
    connection: {
      ipV4: 'string',
      deviceAddress: randomInteger(1, 255),
      port: values.port || 0,
    },
    calculatorId: values.calculatorId,
    housingMeteringDeviceType: values.housingMeteringDeviceType,
    resource: values.resource,
    model: values.model,
    pipe: {
      entryNumber: values.entryNumber || 0,
      hubNumber: values.hubNumber || 0,
      pipeNumber: values.pipeNumber || 0,
      magistral: 'string',
    },
  };

  const editOPDU = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.put(`HousingMeteringDevices/${deviceId}`, PUT_EDIT_FORM);
      alert('Вычислитель успешно изменен!');
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: перепроверьте введеные параметры!',
      );
      throw new Error(error);
    }
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(device);
  };
  console.log('values.connection', values.connection);
  // return (
  //   <button onClick={buttonHandler}>BUTTON</button>
  // )
  const disable = !(JSON.parse(values.connection));

  return (
    <div style={{ maxWidth: '480px' }}>
      <form id="formikForm" onSubmit={handleSubmit} style={{ paddingBottom: '40px' }}>
        <div hidden={!(Number(currentTabKey) === 1)}>
          <Form.Item label="Выберите тип прибора">
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(event) => {
                setFieldValue('housingMeteringDeviceType', event);
              }}
              options={types}
              value={values.housingMeteringDeviceType}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Form.Item label="Выберите тип ресурса">
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              value={values.resource}
            />
          </Form.Item>

          <Form.Item label="Выберите модель прибора">
            <InputTT
              name="model"
              placeholder="Укажите модель..."
              type="text"
              onChange={handleChange}
              value={values.model}
              onBlur={handleBlur}
            />
            <Alert name="model" />
          </Form.Item>

          <Form.Item label="Серийный номер">
            <InputTT
              name="serialNumber"
              placeholder="Укажите серийный номер..."
              type="text"
              onChange={handleChange}
              value={values.serialNumber}
              onBlur={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Дата выпуска прибора">
            <DatePickerTT
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              format="DD.MM.YYYY"
              value={moment(values.lastCommercialAccountingDate)}
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date.toISOString());
              }}
            />
            <Alert name="lastCommercialAccountingDate" />
          </Form.Item>

          <Form.Item label="Дата ввода в эксплуатацию">
            <DatePickerTT
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              format="DD.MM.YYYY"
              value={moment(values.futureCheckingDate)}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString());
              }}
            />
            <Alert name="futureCheckingDate" />
          </Form.Item>

          <Form.Item label="Срок эксплуатации по нормативу">
            <SelectTT
              name="futureCommercialAccountingDate"
              placeholder="Укажите оперид эксплуатации"
              onChange={(value) => {
                setFieldValue('futureCheckingDate', moment()
                  .add(value, 'year').toISOString());
              }}
              options={serviceLife}
              defaultValue={serviceLife[0].value}
            />
            <Alert name="futureCommercialAccountingDate" />
          </Form.Item>

          <Form.Item label="Город">
            <InputTT
              name="city"
              type="text"
              placeholder="Укажите город"
              onChange={handleChange}
              value={values.city}
            />
            <Alert name="city" />
          </Form.Item>

          <Form.Item label="Улица">
            <InputTT
              name="street"
              type="text"
              placeholder="Укажите город"
              onChange={handleChange}
              value={values.street}
            />
            <Alert name="street" />
          </Form.Item>

          <Form.Item label="Номер дома">
            <InputTT
              name="number"
              type="text"
              placeholder="Укажите город"
              onChange={handleChange}
              value={values.number}
            />
            <Alert name="number" />
          </Form.Item>

        </div>

        <div hidden={!(Number(currentTabKey) === 2)}>
          <Form.Item label="Подключение к вычислителю">
            <SelectTT
              name="connection"
              onChange={(value) => {
                setFieldValue('connection', value);
              }}
              options={connections}
              value={values.connection}
            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
          >
            <InputTT
              name="calculatorId"
              type="number"
              placeholder="Начните вводить ID прибора"
              onChange={handleChange}
              value={values.calculatorId}
              disabled={disable}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода">
            <InputTT
              name="entryNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.entryNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер узла" className="hubNumber">
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.hubNumber}
              disabled={disable}
            />
          </Form.Item>

          <Form.Item label="Номер трубы">
            <InputTT
              name="pipeNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.pipeNumber}
              disabled={disable}
            />
          </Form.Item>
        </div>

        <div hidden={!(Number(currentTabKey) === 3)}>
          <Header>Компонент в разработке</Header>
        </div>

        <EditODPUButtons />
      </form>
    </div>
  );
};

export default FormEditODPU;

const GET_ODPU_TEMPLATE = {
  address: {
    city: 'Нижнекамск',
    street: 'Тихая Аллея',
    housingStockNumber: '4',
    corpus: null,
  },
  hubConnection: {
    calculatorId: 1212,
    entryNumber: 1,
    hubNumber: 1,
    pipeNumber: 1,
    calculatorSerialNumber: '142834',
    calculatorModel: 'ВКТ-7',
    connection: null,
  },
  id: 1559216,
  transactionType: null,
  model: 'ПРЭМ 2010',
  serialNumber: '201020201735',
  connection: {
    isConnected: true,
    ipV4: '10.90.128.1',
    port: 0,
    deviceAddress: 119,
  },
  lastCommercialAccountingDate: '2020-10-20T14:19:28.556',
  futureCommercialAccountingDate: '2026-10-20T14:19:51.346',
  lastCheckingDate: '2020-10-21T06:15:57.349',
  futureCheckingDate: '2020-10-21T06:15:57.349',
  closingDate: null,
};
