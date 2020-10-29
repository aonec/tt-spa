import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import moment from 'moment';
import {
  housingMeteringDeviceTypes, resources, serviceLife, connections, isConnected,
} from '../constants';
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT,
} from '../../../tt-components';
import axios from '../../../axios';

const FormEditODPU = (props) => {
  const {
    currentTabKey, device, calculators,
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
    diameter,
    resource,
    housingMeteringDeviceType,
  } = device;

  const {
    hub, calculatorId, calculatorSerialNumber, calculatorModel, calculatorConnection,
  } = hubConnection;

  const {
    isConnected, ipV4, port, deviceAddress,
  } = calculatorConnection;

  const {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = hub;

  const {
    city, street, housingStockNumber, corpus,
  } = address;

  console.log('housingStockNumber', housingStockNumber);
  function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  const visibleValuesByTab1 = ['housingMeteringDeviceType', 'resource', 'model',
    'serialNumber',
    'lastCommercialAccountingDate',
    'futureCheckingDate',
    'futureCommercialAccountingDate',
    'city',
    'street',
    'housingStockNumber',
    'corpus'];
  const visibleValuesByTab2 = ['isConnected',
    'calculatorId',
    'entryNumber',
    'hubNumber',
    'pipeNumber',
    'magistral'];
  const visibleValuesByTab3 = ['documents'];

  const visibleValuesByTab = [
    {
      key: 1,
      value: visibleValuesByTab1,
    },
    {
      key: 2,
      value: visibleValuesByTab2,
    },
    { key: 3, value: visibleValuesByTab3 },
  ];

  const isVisible = (name) => _.find(visibleValuesByTab, { key: Number(currentTabKey) }).value.includes(name);

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

  const {
    handleSubmit,
    handleChange, values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: housingMeteringDeviceType || 'Тип прибора не указан',
      resource: resource || 'Тип ресурса не указан',
      model: model || 'Модель не указана',
      serialNumber: serialNumber || 'Серийный номер не указан',
      lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      futureCommercialAccountingDate: futureCommercialAccountingDate || moment().toISOString(),
      calculatorId: calculatorId || 'Вычислитель не выбран',
      entryNumber,
      hubNumber,
      deviceAddress,
      pipeNumber,
      port: port || 0,
      connection: !!hub,
      // connection: hub ? true : false,
      checkingDate: moment().toISOString(),
      city: city || 'Город не указан',
      street: street || 'Улица не указана',
      housingStockNumber: housingStockNumber || 'Номер дома не указан',
      corpus,
      magistral: magistral || 'Не выбрано',
      ipV4,
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
    }),
    onSubmit: async () => {
      console.log(PUT_EDIT_FORM);
      console.log(deviceId);
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
      ipV4: values.ipV4,
      deviceAddress: values.deviceAddress,
      port: values.port || 0,
    },
    calculatorId: values.calculatorId,
    housingMeteringDeviceType: values.housingMeteringDeviceType,
    resource: values.resource,
    model: values.model,
    pipe: {
      entryNumber: values.entryNumber || null,
      hubNumber: values.hubNumber || null,
      pipeNumber: values.pipeNumber || null,
      magistral: values.magistral || 'Направление не выбрано',
    },
    isConnected: isConnected
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(device);
  };

  const [disable, setDisable] = useState(false);

  return (
    <div style={{ maxWidth: '480px' }}>
      <form id="formikForm" onSubmit={handleSubmit} style={{ paddingBottom: '40px' }}>

        {isVisible('housingMeteringDeviceType')
        && (
          <Form.Item label="Выберите тип прибора">
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(event) => {
                setFieldValue('housingMeteringDeviceType', event);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>
        )}

        {isVisible('resource')
        && (
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
        )}

        {isVisible('model')
        && (
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
        )}

        {isVisible('serialNumber')
        && (
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
        )}

        {isVisible('lastCommercialAccountingDate')
        && (
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
        )}

        {isVisible('futureCheckingDate')
        && (
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
        )}

        {isVisible('futureCommercialAccountingDate')
        && (
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
        )}

        {isVisible('city')
        && (
        <Form.Item label="Город">
          <InputTT
            name="city"
            type="text"
            placeholder="Укажите город"
            onChange={handleChange}
            value={values.city}
            disabled
          />
          <Alert name="city" />
        </Form.Item>
        )}

        {isVisible('street')
        && (
        <Form.Item label="Улица">
          <InputTT
            name="street"
            type="text"
            placeholder="Укажите улицу"
            onChange={handleChange}
            value={values.street}
            disabled
          />
          <Alert name="street" />
        </Form.Item>
        )}

        {isVisible('housingStockNumber')
        && (
        <Form.Item label="Номер дома">
          <InputTT
            name="housingStockNumber"
            type="text"
            placeholder="Укажите дом"
            onChange={handleChange}
            value={values.housingStockNumber}
            disabled
          />
          <Alert name="number" />
        </Form.Item>
        )}

        {isVisible('corpus')
        && (
        <Form.Item label="Номер корпуса">
          <InputTT
            name="corpus"
            type="text"
            placeholder=""
            onChange={handleChange}
            value={values.corpus}
            disabled
          />
          <Alert name="corpus" />
        </Form.Item>
        )}


        {isVisible('isConnected')
        && (
          <Form.Item label="Подключение к вычислителю">
            <SelectTT
              name="isConnected"
              onChange={(item) => {
                // (item === false) ? setDisable(true) : setDisable(false);
                setFieldValue('isConnected', item);
              }}
              placeholder="Подключение к вычислителю"
              options={isConnected}
              value={values.isConnected}
              disabled
            />
          </Form.Item>
        )}

        {isVisible('calculatorId')
        && (
        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <SelectTT
            name="calculatorId"
            placeholder="Начните вводить серийный номер или IP адрес прибора"
            onChange={(value) => {
              if (value !== values.calculatorId) {
                const selected = _.find(calculators, { value });
                const { connection: { ipV4, deviceAddress, port } } = selected;
                console.log('ipV4, deviceAddress, port',
                  ipV4, deviceAddress, port);
                setValues((prevValues) => ({
                  ...prevValues,
                  ipV4,
                  deviceAddress,
                  port,
                  calculatorId: value,
                }));
              }
            }}
            options={calculators}
            value={values.calculatorId}
            disabled={disable}
          />
          <Alert name="calculatorId" />
        </Form.Item>
        )}

        {isVisible('entryNumber') && (
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
        )}

        {isVisible('hubNumber') && (
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
        )}

        {isVisible('pipeNumber') && (
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
        )}

        {isVisible('documents') && (
        <Header>Компонент в разработке</Header>
        )}

        <EditODPUButtons />
      </form>
    </div>
  );
};

export default FormEditODPU;
