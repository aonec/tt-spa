import React, { useContext } from 'react';
import moment from 'moment';
import {Form} from "antd";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { InputTT,SelectTT, DatePickerTT, Wrap , ButtonTT, Title} from '../../../tt-components';
import { items } from '../../../tt-components/localBases';
import { EditCalculatorContext } from '../index';

import { putCalculator } from './apiEditCalculator';

const EditCalculatorForm = () => {
  const { currentCalc, currentTabKey } = useContext(EditCalculatorContext);

  const {
    calculator,
    canBeEdited,
    closingDate,
    diameter,
    futureCheckingDate,
    futureCommercialAccountingDate,
    housingStockId,
    id,
    lastCheckingDate,
    checkingDate,
    lastCommercialAccountingDate,
    model,
    resource,
    serialNumber,
    type,
    connection,
    address,
  } = currentCalc;
    // console.log("model", model)


  const currentInfoId = items.find(o => o.model === model)

  // console.log("ee", ee)
  const {
    isConnected, ipV4, port, deviceAddress,
  } = connection || {
    isConnected: false,
    ipV4: '',
    port: null,
    deviceAddress: null,
  };
  const { id: houseId } = address;

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber,
      checkingDate,
      futureCheckingDate,
      lastCommercialAccountingDate,
      ipV4,
      deviceAddress,
      port,
      futureCommercialAccountingDate,
      housingStockId: houseId,
      infoId: currentInfoId.value,
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      ipV4: Yup.string().required('Введите IP-адрес устройства'),
      deviceAddress: Yup.string().required('Введите сетевой адрес устройства'),
      port: Yup.string().required('Введите порт устройства'),

    }),
    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        checkingDate: values.lastCommercialAccountingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        isConnected: true,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: values.deviceAddress,
          port: values.port,
        },
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };

      console.log('FORM', form);
      putCalculator(id, form);

    },
  });

  const Buttons = () => {
    console.log('Buttons');
    return (
      <div style={{padding:'32px 0'}}>
        <ButtonTT
          form='editCalculatorForm'
          color="blue"
          style={{ marginRight: '16px' }}
          type="submit"
          onClick={handleSubmit}
        >
          Сохранить
        </ButtonTT>

        <NavLink to={`/calculators/${id}`}>
          <ButtonTT color="white">
            Отмена
          </ButtonTT>
        </NavLink>
      </div>
    );
  };

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

  return (
    <form id='editCalculatorForm'>
      <div hidden={Number(currentTabKey) !== 1}>
        <Form.Item label="Серийный номер устройства">
          <InputTT
            name="serialNumber"
            value={values.serialNumber}
            placeholder="Серийный номер..."
            onChange={handleChange}
          />
          <Alert name="serialNumber" />
        </Form.Item>

        <Form.Item label="Тип вычислителя">
          <SelectTT
            placeholder="Выберите тип устройства"
            options={items}
            value={values.infoId}
            onChange={(event, target) => {
              setFieldValue('infoId', Number(target.value));
            }}
          />
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            value={moment(values.lastCommercialAccountingDate)}
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date.toISOString());
            }}
          />
        </Form.Item>

        <Form.Item label="Дата Поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="checkingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('checkingDate', date.toISOString());
            }}
            value={moment(values.checkingDate)}
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date.toISOString());
            }}
            value={moment(values.futureCheckingDate)}
            name="futureCheckingDate"
          />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCommercialAccountingDate', date.toISOString());
            }}
            value={moment(values.futureCommercialAccountingDate)}
            name="futureCommercialAccountingDate"
          />
        </Form.Item>
      </div>

      <div hidden={Number(currentTabKey) !== 2}>
        <Form.Item label="IP адрес вычислителя">
          <InputTT
            type="text"
            value={values.ipV4}
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            onChange={handleChange}
            name="ipV4"
          />
          <Alert name="ipV4" />
        </Form.Item>

        <Form.Item label="Порт">
          <InputTT
            type="number"
            placeholder="Укажите порт устройства (например, 1234)"
            value={values.port}
            onChange={handleChange}
            name="port"
          />
          <Alert name="port" />
        </Form.Item>

        <Form.Item label="Адрес устройства">
          <InputTT
            type="number"
            placeholder="Укажите адреса устройства"
            value={values.deviceAddress}
            onChange={handleChange}
            name="deviceAddress"
          />
          <Alert name="deviceAddress" />
        </Form.Item>

        <Wrap
          style={{
            background: ' rgba(255, 140, 104, 0.16)',
            marginTop: '24px',
            padding: '24px',
          }}
        >
          Подключение к новому прибору может занять до 30 минут.
        </Wrap>
      </div>
      <div hidden={Number(currentTabKey) !== 3}>
        <Title color={'black'}>Компонент в разработке </Title>
      </div>
      <div hidden={Number(currentTabKey) !== 4}>
        <Title color={'black'}>Компонент в разработке </Title>
      </div>
      <Buttons />
    </form>
  );
};

export default EditCalculatorForm;
