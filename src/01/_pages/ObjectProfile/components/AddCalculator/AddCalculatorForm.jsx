import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import {
  DatePickerTT, Header, InputTT, SelectTT, Title, Wrap,
} from '../../../../tt-components';
import axios from '../../../../axios';
import { items, serviceLife } from '../../../../tt-components/localBases';
import { onChangeFormValueByPath } from "../../../../Redux/actions/actions";

async function deregisterDevice(device) {
  try {
    alert('Отправляется запрос на снятие прибора с учета !');
    const res = await axios.post('MeteringDevices/close', device);
    alert('Вычислитель успешно снят с учета !');
    return res;
  } catch (error) {
    alert('Что-то пошло не так: попробуйте еще раз');
    throw new Error(error);
  }
}

const AddCalculatorForm = (props) => {
  const {currentTabKey, objid} = props

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      checkingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      connection: {
        ipV4: '',
        deviceAddress: null,
        port: null,
      },
      futureCommercialAccountingDate: moment().add(4, 'year').toISOString(),
      housingStockId: Number(objid),
      infoId: 1,
    },
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const form = {
        deviceId: values.deviceId,
        documentsIds: values.documentsIds,
        closingDateTime: values.closingDateTime,
      };
      deregisterDevice(form);
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
    console.log("buttonHandler")
    console.log("values = ", values)
  }
  return (
    <>
      <button onClick={buttonHandler}>test</button>
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
            />
          </Form.Item>

          <Form.Item label="Тип вычислителя">
            <SelectTT
              name="infoId"
              placeholder="Выберите тип устройства"
              options={items}
              value={values.infoId.toString()}
              onChange={(event) => {
                setFieldValue('infoId', Number(event))
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
                setFieldValue('lastCommercialAccountingDate', date.toISOString())
              }}
            />
          </Form.Item>

          <Form.Item label="Дата Поверки">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="checkingDate"
              placeholder="Укажите дату..."
              value={moment(values.checkingDate)}
              onChange={(date) => {
                setFieldValue('checkingDate', date.toISOString())
              }}
            />
          </Form.Item>

          <Form.Item label="Дата Следующей поверки">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              value={moment(values.futureCheckingDate)}
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString())
              }}
            />
          </Form.Item>

          <Form.Item label="Дата Следующей поверки">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              value={moment(values.futureCommercialAccountingDate)}
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date.toISOString())
              }}
            />
          </Form.Item>
        </div>


        <div hidden={Number(currentTabKey) !== 2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item label="IP адрес вычислителя">
            <InputTT
              name="ipV4"
              type="text"
              value={values.ipV4}
              placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
              onChange={(event) => {
                setFieldValue(['connection','ipV4'], event.target.value )
              }}
            />
          </Form.Item>

          <Form.Item label="Порт вычислителя">
            <InputTT
              name="port"
              type="number"
              placeholder="Укажите порт устройства (например, 1234)"
              value={values.port}
              onChange={(event) => {
                setFieldValue(['connection','port'], Number(event.target.value))
              }}
            />
          </Form.Item>

          <Form.Item label="Адрес вычислителя">
            <InputTT
              name="deviceAddress"
              type="number"
              placeholder="Укажите адрес устройства (от 0 до 255)"
              value={values.deviceAddress}
              onChange={(event) => {
                setFieldValue(['connection','deviceAddress'], Number(event.target.value))
              }}
            />
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
          <Header>Компонент Документы в разработке</Header>
        </div>
      </form>
    </>
  );
};

export default AddCalculatorForm;
