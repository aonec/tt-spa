import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import moment from 'moment';

import {
  types, resources, serviceLife, connection,
} from './JSON';
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT,
} from '../../../tt-components';
import axios from '../../../axios';

const FormEditODPU = (props) => {
  const [forceRender, setForceRender] = useState();
  const {
    currentTabKey, device, calculatorId, object,
  } = props;
  const { 0: objid, 1: deviceId } = useParams();
  const {
    calculator,
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    infoId,
    futureCheckingDate,
    closingDateTime,
    model,
    type,
    resource,
    port,
    magistral,
    // calculatorId,
  } = device;

  const {
    areaOfNonResidential,
    city,
    constructionDate,
    corpus,
    district,
    houseArea,
    houseCategory,
    id,
    index,
    isThereElevator,
    number,
    numberOfApartments,
    numberOfEntrances,
    numberOfFloors,
    region,
    street,
    totalArea,
    totalLivingArea,
  } = object;

  //Параметры потом будут приходить в device
  const entryNumber = 1;
  const hubNumber = 1;
  const pipeNumber = 1;

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
        Снять прибор с учета
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
    handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: _.filter(types, { value: type })[0].value,
      resource: _.filter(resources, { value: resource })[0].value,
      model: model || 'Модель не указана',
      serialNumber: serialNumber || 'Серийный номер не указан',
      lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      futureCommercialAccountingDate,
      calculatorId: calculatorId || 'Вычислитель не выбран',
      entryNumber,
      hubNumber,
      pipeNumber,
      connection: connection[0].value,
      port: port || 0,
      checkingDate: moment().toISOString(),
      city,
      street,
      number,
      calculator,

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
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log('PUT_TEMPLATE', PUT_EDIT_FORM);
  };

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit} style={{ paddingBottom: '40px' }}>
        <div hidden={!(Number(currentTabKey) === 1)}>
          <Form.Item label="Выберите тип прибора">
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(event) => {
                values.housingMeteringDeviceType = event;
                // setForceRender(randomInteger(1, 255));
              }}
              options={types}
              value={values.housingMeteringDeviceType}
            />
            <Alert name="closingDateTime" />
          </Form.Item>

          <Form.Item label="Выберите тип ресурса">
            <SelectTT
              name="resource"
              onChange={(event) => {
                values.resource = event;
                setForceRender(randomInteger(1, 255));
              }}
              options={resources}
              value={values.resource}

            />
            <Alert name="resource" />
          </Form.Item>

          <Form.Item label="Выберите модель прибора">
            <InputTT
              name="model"
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
              onChange={(date)=> {
                setFieldValue('lastCommercialAccountingDate', date)
                console.log(values)
              }}
              // onChange={(date) => {
              //   handleChange(event.target.value)
              //   values.lastCommercialAccountingDate = date;
              //   setForceRender(randomInteger(1, 255));
              // }}
            />
            <Alert name="lastCommercialAccountingDate" />
          </Form.Item>

          <Form.Item label="Дата ввода в эксплуатацию">
            <DatePickerTT
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              format="DD.MM.YYYY"
              value={moment(values.futureCheckingDate)}
              onChange={(date, dateString)=> {
                setFieldValue('futureCheckingDate', dateString)
              }}
              // onChange={(date) => {
              //   values.futureCheckingDate = date;
              //   setForceRender(randomInteger(1, 255));
              // }}

            />
            <Alert name="futureCheckingDate" />
          </Form.Item>

          <Form.Item label="Срок эксплуатации по нормативу">
            <SelectTT
              name="futureCommercialAccountingDate"
              placeholder="Укажите оперид эксплуатации"
              onChange={(event) => {
                const value = moment()
                  .add(event, 'year')
                  .toISOString();
                values.futureCommercialAccountingDate = value;
                setForceRender(randomInteger(1, 255));
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
              onChange={(event) => {
                values.connection = event;
                setForceRender(randomInteger(1, 255));
              }}
              options={connection}
              value={values.connection}

            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
          >
            <InputTT
              id="calculatorId"
              name="calculatorId"
              type="number"
              placeholder="Начните вводить ID прибора"
              onChange={handleChange}
              value={values.calculatorId}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода">
            <InputTT
              id="entryNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.entryNumber}
            />
          </Form.Item>

          <Form.Item label="Номер узла" className="hubNumber">
            <InputTT
              id="hubNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.hubNumber}
            />
          </Form.Item>

          <Form.Item label="Номер трубы">
            <InputTT
              id="pipeNumber"
              type="number"
              placeholder="1"
              onChange={handleChange}
              value={values.pipeNumber}
            />
          </Form.Item>
        </div>

        <div hidden={!(Number(currentTabKey) === 3)}>
          <Header>Компонент в разработке</Header>
        </div>

        <EditODPUButtons />
      </form>
    </>
  );
};

export default FormEditODPU;

const GET_ODPU_TEMPLATE = {
  calculator: null,
  closingDate: null,
  deviceAddress: null,
  diameter: null,
  futureCheckingDate: '2022-05-14T03:00:00',
  futureCommercialAccountingDate: '0001-01-01T03:00:00',
  housingStockId: 338,
  id: 1394,
  ipV4: null,
  lastCheckingDate: '2018-06-18T03:00:00',
  lastCommercialAccountingDate: '0001-01-01T03:00:00',
  model: 'ВКТ-7',
  port: null,
  resource: null,
  serialNumber: '72453',
  transactionType: '',
  type: 'Calculator',
};

const GET_CALC_TEMPLATE = {
  calculator: {
    calculator: null,
    closingDate: null,
    deviceAddress: null,
    diameter: null,
    futureCheckingDate: '2019-07-06T03:00:00',
    futureCommercialAccountingDate: '0001-01-01T03:00:00',
    housingStockId: 304,
    id: 1518,
    ipV4: null,
    lastCheckingDate: '2015-07-06T03:00:00',
    lastCommercialAccountingDate: '0001-01-01T03:00:00',
    model: 'ТВ-7.03.1',
    port: null,
    resource: null,
    serialNumber: '15017696',
    transactionType: '',
    type: 'Calculator',
  },
  closingDate: null,
  deviceAddress: null,
  diameter: '32 мм',
  futureCheckingDate: '2019-06-04T03:00:00',
  futureCommercialAccountingDate: '0001-01-01T03:00:00',
  housingStockId: 304,
  id: 8230,
  ipV4: null,
  lastCheckingDate: '2015-06-04T03:00:00',
  lastCommercialAccountingDate: '0001-01-01T03:00:00',
  model: 'РС',
  port: null,
  resource: 'ColdWaterSupply',
  serialNumber: '018315',
  transactionType: '',
  type: 'FlowMeter',
};
