import React, { useContext, useEffect, useState } from 'react';
import { Form, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import {
  InputTT, SelectTT, DatePickerTT, Wrap, ButtonTT, Title,
} from '../../../tt-components';
import { ipv4RegExp, items } from '../../../tt-components/localBases';
import { EditCalculatorContext } from '../index';
import { putCalculator } from './apiEditCalculator';
import isDateNull from '../../../utils/isDateNull';
import { returnNullIfEmptyString } from '../../../utils/returnNullIfEmptyString';

const EditCalculatorForm = () => {
  const { currentCalc, currentTabKey } = useContext(EditCalculatorContext);
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));
  const [empty, setEmpty] = useState();

  // console.log(currentCalc);

  const {
    calculator,
    canBeEdited,
    closingDate,
    diameter,
    lastCheckingDate,
    futureCheckingDate,
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    housingStockId,
    id,
    model,
    resource,
    serialNumber,
    type,
    connection,
    address,
    isConnected,
  } = currentCalc;

  const getCurrentInfoId = _.find(items, { label: model });
  const currentInfoId = getCurrentInfoId !== undefined ? getCurrentInfoId.value : null;

  // const { ipV4, port, deviceAddress } = connection;
  const { id: houseId } = address;

  const { ipV4, port, deviceAddress } = connection || {
    ipV4: '',
    port: null,
    deviceAddress: null,
  };
  // console.log(connection)

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setErrors,
  } = useFormik({
    initialValues: {
      serialNumber,
      lastCheckingDate: isDateNull(lastCheckingDate),
      futureCheckingDate: isDateNull(futureCheckingDate),
      lastCommercialAccountingDate: isDateNull(lastCommercialAccountingDate),
      futureCommercialAccountingDate: isDateNull(futureCommercialAccountingDate),
      ipV4,
      port: port === null ? null : port,
      deviceAddress: deviceAddress === null ? null : deviceAddress,
      housingStockId: houseId,
      infoId: currentInfoId === null ? null : Number(currentInfoId),
      isConnected,
      checked: isConnected,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate.toISOString(),
        futureCheckingDate: values.futureCheckingDate.toISOString(),
        lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
        futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(),
        isConnected: values.isConnected,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: returnNullIfEmptyString(values.deviceAddress),
          port: returnNullIfEmptyString(values.port),
        },
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };
      console.log('FORM', form);
      console.log(JSON.stringify(form));
      putCalculator(id, form);
    },
  });

  useEffect(() => {
    setValidationSchema(defaultValidationSchema);
  }, []);

  const defaultValidationSchema = Yup.object({
    lastCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
    futureCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
    lastCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
    futureCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
    serialNumber: Yup.string().required('Введите серийный номер'),
    ipV4: Yup.string().matches(ipv4RegExp, 'Укажите в формате X.X.X.X').required('Введите IP-адрес устройства'),
    deviceAddress: Yup.number().nullable().required('Введите сетевой адрес устройства'),
    port: Yup.number().nullable().required('Введите порт устройства'),
    infoId: Yup.number().typeError('Выберите модель').required('Выберите модель'),
  });

  const emptyValidationSchema = Yup.object({
    lastCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
    futureCheckingDate: Yup.date().typeError('Поле обязательное').required('Поле обязательное'),
    lastCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
    futureCommercialAccountingDate: Yup.date().typeError('Поле обязательное').required('Введите серийный номер'),
    serialNumber: Yup.string().required('Введите серийный номер'),
    infoId: Yup.number().typeError('Выберите модель').required('Выберите модель'),
  });

  function isEmptyValue(item) {
    return item === null || item === '';
  }

  function isEmpty() {
    return isEmptyValue(values.deviceAddress)
      && isEmptyValue(values.port)
      && isEmptyValue(values.ipV4);
  }

  function onSwitchChange(checked) {
    setFieldValue('checked', checked);
  }

  useEffect(() => {
    setEmpty(isEmpty())

    console.log('Правда, что все строки пустые:?', empty);
    if (values.checked === false && isEmpty()) {
      setValidationSchema(emptyValidationSchema);
    }
    if (values.checked === false && !isEmpty()) {
      setValidationSchema(defaultValidationSchema);
    }
  }, [values.deviceAddress, values.ipV4, values.port]);

  useEffect(() => {
    setFieldValue('isConnected', values.checked);
    if (values.checked === true) {
      setValidationSchema(defaultValidationSchema);
    }
    if (values.checked === false) {
      if (isEmpty()) {
        setValidationSchema(emptyValidationSchema);
      } else {
        setValidationSchema(defaultValidationSchema);
      }
    }
  },
  [values.checked]);

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
    <form id="editCalculatorForm" style={{ maxWidth: 800 }}>
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
          <Alert name="infoId" />
        </Form.Item>

        <Form.Item label="Дата Поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
            }}
            value={values.lastCheckingDate}
          />
          <Alert name="lastCheckingDate" />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки">
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date);
            }}
            value={values.futureCheckingDate}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate" />
        </Form.Item>

        <Form.Item label="Дата начала действия акта-допуска">
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date);
            }}
            value={values.lastCommercialAccountingDate}
          />
        </Form.Item>

        <Form.Item label="Дата окончания действия акта-допуска">
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCommercialAccountingDate', date);
            }}
            value={values.futureCommercialAccountingDate}
            name="futureCommercialAccountingDate"
          />
        </Form.Item>
      </div>

      <div hidden={Number(currentTabKey) !== 2}>

        <Form.Item style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        >
          <Switch style={{ width: '48px' }} defaultChecked={isConnected} onChange={onSwitchChange} checked={values.checked} />
          <span style={{
            fontSize: '16px',
            lineHeight: '32px',
            marginLeft: '16px',
            color: 'rgba(39, 47, 90, 0.9)',
          }}
          >
            Опрашивать вычислитель
          </span>
        </Form.Item>

        <Form.Item label="IP адрес вычислителя">
          <InputTT
            type="text"
            value={values.ipV4}
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            onChange={handleChange}
            name="ipV4"
            onBlur={handleBlur}
            // disabled={!checked}
          />
          {/* <Alert name="ipV4" /> */}
          {(isEmpty() && !values.checked) ? null : <Alert name="ipV4" />}
        </Form.Item>

        <Form.Item label="Порт">
          <InputTT
            type="number"
            placeholder="Укажите порт устройства (например, 1234)"
            value={values.port}
            onChange={handleChange}
            onBlur={handleBlur}
            name="port"
            // disabled={!checked}

          />
          {/* <Alert name="port" /> */}
          {(isEmpty() && !values.checked) ? null : <Alert name="port" /> }

        </Form.Item>

        <Form.Item label="Адрес устройства">
          <InputTT
            type="number"
            placeholder="Укажите адреса устройства"
            value={values.deviceAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            name="deviceAddress"
            // disabled={!checked}
          />
          {/* <Alert name="deviceAddress" /> */}
          {(isEmpty() && !values.checked) ? null : <Alert name="deviceAddress" />}
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
        <Title color="black">Компонент в разработке </Title>
      </div>
      <div hidden={Number(currentTabKey) !== 4}>
        <Title color="black">Компонент в разработке </Title>
      </div>
      <div style={{ padding: '32px 0' }}>
        <ButtonTT
          form="editCalculatorForm"
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
    </form>
  );
};

export default EditCalculatorForm;
