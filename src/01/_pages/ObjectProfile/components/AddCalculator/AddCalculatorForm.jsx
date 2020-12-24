import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Modal, Switch } from 'antd';
import {
  Title,
  ButtonTT,
  DatePickerTT, InputTT, SelectTT, Wrap,
} from '../../../../tt-components';
import { items } from '../../../../tt-components/localBases';
import TabsComponent from './addCalculatorTabs';
import { addCalculator } from './apiAddCalculator';
import randomInteger from '../../../../utils/randomInteger';

const AddCalculatorForm = (props) => {
  const { objid, handleCancel, setAddCalculator } = props;

  const [checked, setChecked] = useState(false);

  const [currentTabKey, setTab] = useState('1');

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setErrors,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: null,
      deviceAddress: null,
      port: null,
      housingStockId: Number(objid),
      infoId: 1,
      checked: false,
      isConnected: true,
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      ipV4: checked === false ? Yup.string().typeError('Введите IP-адрес устройства').required('Введите IP-адрес устройства') : null,
      deviceAddress: checked === false ? Yup.number().nullable().required('Введите сетевой адрес устройства') : null,
      port: checked === false ? Yup.number().nullable().required('Введите порт устройства') : null,
    }),
    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        documentsIds: values.documentsIds,
        isConnected: values.isConnected,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: values.deviceAddress,
          port: values.port,
        },
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };
      console.log('form', form);
      console.log(JSON.stringify(form));
      addCalculator(form);
      setTimeout(() => { setAddCalculator(false); }, 1000);
    },
  });

  function onSwitchChange(checked) {
    if (checked === true) {
      setChecked(true);
      setFieldValue('isConnected', false);
      setFieldValue('ipV4', null);
      setFieldValue('port', null);
      // setFieldValue('deviceAddress', randomInteger(256, 999));
      setFieldValue('deviceAddress', null);
    }
    if (checked === false) {
      setChecked(false);
      setFieldValue('isConnected', true);
    }
  }

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

  function handleChangeTab(value) {
    setTab(value);
  }

  // function handleSubmitErrors() {
    // console.log('handleSubmitErrors');
    // const keys = _.keys(errors);
    // console.log(keys);
    //
    // const errorsArr = [
    //   [
    //     'infoId',
    //     'serialNumber',
    //   ],
    //   [
    //     'ipV4',
    //     'deviceAddress',
    //     'port',
    //   ],
    // ];
    //
    // errorsArr.map((item, index) => {
    //   const newIndex = errorsArr.length - index - 1;
    //   const res = keys.filter((x) => errorsArr[newIndex].includes(x));
    //   console.log("res", res)
    //   if (res.length > 0) {
    //     setTab(String(newIndex + 1))
    //   }
    // })
  // }

  return (
    <form id="formikForm" onSubmit={handleSubmit}>
      <div>
        <Title size="middle" color="black">
          Добавление нового вычислителя
        </Title>

        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />

        <div hidden={Number(currentTabKey) !== 1} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <Form.Item label="Серийный номер устройства" style={{ width: '100%' }}>
            <InputTT
              name="serialNumber"
              value={values.serialNumber}
              placeholder="Серийный номер..."
              onChange={handleChange}
              onBlue={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Тип вычислителя" style={{ width: '100%' }}>
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

          <Form.Item label="Дата поверки" style={{ width: '49%' }}>
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

          <Form.Item label="Дата следующей поверки" style={{ width: '49%' }}>
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

          <Form.Item label="Дата начала Акта действия допуска" style={{ width: '49%' }}>
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

          <Form.Item label="Дата окончания Акта действия допуска" style={{ width: '49%' }}>
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

        <div hidden={Number(currentTabKey) !== 2} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <Form.Item style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
          >
            <Switch style={{ width: '48px' }} onChange={onSwitchChange} />
            <span style={{
              fontSize: '16px',
              lineHeight: '32px',
              marginLeft: '16px',
              color: 'rgba(39, 47, 90, 0.9)',
            }}
            >
              Вычислитель без оборудования связи
            </span>
          </Form.Item>

          <Form.Item label="IP адрес вычислителя" style={{ width: '49%' }}>
            <InputTT
              name="ipV4"
              type="text"
              value={values.ipV4}
              onBlur={handleBlur}
              placeholder="Введите IP адрес вычислителя"
              onChange={(event) => {
                setFieldValue('ipV4', event.target.value);
              }}
              disabled={checked}
            />
            {checked === false ? <Alert name="ipV4" /> : null }
          </Form.Item>

          <Form.Item label="Порт вычислителя" style={{ width: '49%' }}>
            <InputTT
              name="port"
              type="number"
              placeholder="Введите номер порта"
              value={values.port}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue('port', Number(event.target.value) || null);
              }}
              disabled={checked}
            />
            {/* <Alert name="port" /> */}
            {checked === false ? <Alert name="port" /> : null }
          </Form.Item>

          <Form.Item label="Адрес вычислителя" style={{ width: '100%' }}>
            <InputTT
              name="deviceAddress"
              type="number"
              placeholder="Введите сетевой адрес вычислителя"
              value={values.deviceAddress}
              onBlur={handleBlur}
              onChange={(event) => {
                setFieldValue('deviceAddress', Number(event.target.value));
              }}
              disabled={checked}
            />
            {/* <Alert name="deviceAddress" /> */}
            {checked === false ? <Alert name="deviceAddress" /> : null }
          </Form.Item>

          <Wrap
            style={{
              background: ' rgba(255, 140, 104, 0.16)',
              marginTop: '24px',
              padding: '24px',
              width: '100%',
            }}
          >
            Подключение к новому прибору может занять до 30 минут.
          </Wrap>
        </div>

        <div hidden={Number(currentTabKey) !== 3} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Title color="black">Компонент Документы в разработке</Title>
        </div>

      </div>
      <div style={{ margin: '32px 0' }}>
        <ButtonTT
          color="blue"
          onClick={handleNext}
          type="button"
          hidden={currentTabKey === '3'}
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          onClick={handleSubmit}
          hidden={currentTabKey !== '3'}
        >
          Сохранить
        </ButtonTT>
        <ButtonTT
          color="white"
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
      </div>
    </form>
  );
};

export default AddCalculatorForm;
