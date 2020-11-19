import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {Title,
  ButtonTT,
  DatePickerTT, Header, InputTT, SelectTT, Wrap,
} from '../../../../tt-components';
import { items } from '../../../../tt-components/localBases';
import {addCalculator} from './apiAddCalculator'

const AddCalculatorForm = (props) => {
  const {
    currentTabKey, objid, setTab, setAddCalculator, handleCancel, handleNext,
  } = props;

  const Buttons = () => {
    const RenderNextButton = () => {
      if (currentTabKey === '3') {
        return null;
      }
      return (
        <ButtonTT
          color="blue"
          style={{ marginLeft: '16px' }}
          onClick={handleNext}
        >
          Далее
        </ButtonTT>
      );
    };

    const RenderSubmitButton = () => {
      if (currentTabKey !== '3') {
        return null;
      }
      return (
        <ButtonTT
          color="blue"
          style={{ marginLeft: '16px' }}
          type="submit"
          onClick={handleSubmit}
        >
          Выгрузить
        </ButtonTT>
      );
    };

    const CancelButton = () => (
      <ButtonTT color="white" onClick={handleCancel} style={{ marginLeft: '16px' }}>
        Отмена
      </ButtonTT>
    );

    return (
      <div style={{margin:'32px 0'}}>
        <RenderNextButton />
        <RenderSubmitButton />
        <CancelButton />
      </div>
    );
  };

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      checkingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: '',
      port: '',
      housingStockId: Number(objid),
      infoId: 1,
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
        checkingDate: values.checkingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        documentsIds: values.documentsIds,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: values.deviceAddress,
          port: values.port,
        },
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };
      addCalculator(form);
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

  const buttonHandler = () => {
    console.log('buttonHandler');
  };

  return (
    <>
      {/*<button onClick={buttonHandler}>test</button>*/}
      <form id="formikForm" onSubmit={handleSubmit}>

        <div hidden>
          <Form.Item label="Дата снятия прибора с учета">
            <DatePickerTT
              name="closingDateTime"
              format="DD.MM.YYYY"
              allowClear={false}
              onBlur={handleBlur}
              onChange={(date) => {
                setFieldValue('closingDateTime', date.toISOString());
              }}
              value={moment(values.closingDateTime)}
            />
            <Alert name="closingDateTime" />
          </Form.Item>
        </div>

        <div hidden={Number(currentTabKey) !== 1} style={{ display: 'flex', flexDirection: 'column' }}>

          <Form.Item label="Серийный номер устройства">
            <InputTT
              name="serialNumber"
              value={values.serialNumber}
              placeholder="Серийный номер..."
              onChange={handleChange}
              onBlue={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Тип вычислителя">
            <SelectTT
              name="infoId"
              placeholder="Выберите тип устройства"
              options={items}
              value={values.infoId}
              onChange={(event) => {
                setFieldValue('infoId', Number(event));
              }}
            />
          </Form.Item>

          <Form.Item label="Дата поверки">
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

          <Form.Item label="Дата следующей поверки">
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

          <Form.Item label="Дата начала Акта действия допуска">
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

          <Form.Item label="Дата окончания Акта действия допуска">
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
        </div>

        <div hidden={Number(currentTabKey) !== 2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item label="IP адрес вычислителя">
            <InputTT
              name="ipV4"
              type="text"
              value={values.ipV4}
              onBlur={handleBlur}
              placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
              onChange={(event) => {
                setFieldValue('ipV4', event.target.value);
              }}
            />
            <Alert name="ipV4" />
          </Form.Item>

          <Form.Item label="Порт вычислителя">
            <InputTT
              name="port"
              type="number"
              placeholder="Укажите порт устройства (например, 1234)"
              value={values.port}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue('port', Number(event.target.value));
              }}
            />
            <Alert name="port" />
          </Form.Item>

          <Form.Item label="Адрес вычислителя">
            <InputTT
              name="deviceAddress"
              type="number"
              placeholder="Укажите адрес устройства (от 0 до 255)"
              value={values.deviceAddress}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue('deviceAddress', Number(event.target.value));
              }}
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
          <Title color={'black'}>Компонент Документы в разработке</Title>
        </div>

        <Buttons />
      </form>
    </>
  );
};

export default AddCalculatorForm;
