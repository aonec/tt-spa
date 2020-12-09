import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Modal, Switch } from 'antd';
import {
  Title,
  ButtonTT,
  DatePickerTT, Header, InputTT, SelectTT, Wrap,
} from '../../../../tt-components';
import { items } from '../../../../tt-components/localBases';
import TabsComponent from "./addCalculatorTabs";


const AddCalculatorForm = (props) => {
  const { objid, handleCancel } = props;

  const [checked, setChecked] = useState(false)

  const [currentTabKey, setTab] = useState('1');

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      housingStockId: Number(objid),
      infoId: 1,
      checked: false
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      ipV4: checked === false ? Yup.string().typeError('false').required('Введите IP-адрес устройства') : null,
      deviceAddress: checked === false ? Yup.number().nullable().required('Введите сетевой адрес устройства'): null,
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
        connection: {
          ipV4: values.ipV4,
          deviceAddress: values.deviceAddress,
          port: values.port,
        },
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };
      console.log('form', form);
      // addCalculator(form);
      // setTimeout(()=>{setAddCalculator(false)}, 1000);
    },
  });

  function onChange(checked) {
    console.log(`switch to ${checked}`);
    if (checked === true) {
      console.log('tree')
      setChecked(true)
      setFieldValue('ipV4', '')
      setFieldValue('port', null)
      setFieldValue('deviceAddress', null)
    }
    if (checked === false) {
      console.log('false')
      setChecked(false)
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



  return (
      <form id="formikForm" onSubmit={handleSubmit}>

        <Title size="middle" color="black">
          Добавление нового вычислителя
        </Title>

        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />

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

          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Switch style={{width: '48px'}} onChange={onChange} />
            <span style={{
              fontSize: '16px',
              lineHeight: '32px',
              marginLeft: '16px',
              color: 'rgba(39, 47, 90, 0.9)',
            }}
            >
        Вычислитель без оборудования связи
      </span>
          </div>

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
              disabled={checked}
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
                setFieldValue('port', Number(event.target.value) || null);
              }}
              disabled={checked}
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
              disabled={checked}
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

        <div hidden={Number(currentTabKey) !== 3} style={{ display: 'flex', flexDirection: 'column' }}>
          <Title color="black">Компонент Документы в разработке</Title>
        </div>

        <div style={{ margin: '32px 0' }}>
              <ButtonTT
                color="blue"
                style={{ marginLeft: '16px' }}
                onClick={handleNext}
                type="button"
                hidden={currentTabKey === '3'}
              >
                Далее
              </ButtonTT>

              <ButtonTT
                color="blue"
                style={{ marginLeft: '16px' }}
                type="submit"
                onClick={handleSubmit}
                hidden={currentTabKey !== '3'}
              >
                Сохранить
              </ButtonTT>
          <ButtonTT
            color="white" type="button" onClick={handleCancel} style={{ marginLeft: '16px' }}>
            Отмена
          </ButtonTT>
        </div>
      </form>
  );
};

export default AddCalculatorForm;
