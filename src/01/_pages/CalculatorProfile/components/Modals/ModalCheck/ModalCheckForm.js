import React, { useContext } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ButtonTT, DatePickerTT, InputTT, Header,
} from '../../../../../tt-components';
import { DeviceContext } from '../../../CalculatorProfile';
import { checkDevice } from './apiCheckDevice';
const ModalCheckForm = (props) => {
  const { handleCancel } = props;
  const { deregister, setDeregister, device } = useContext(DeviceContext);
  const { model, serialNumber, address: { id: houseId }, futureCheckingDate, lastCheckingDate } = device;

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

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      lastCheckingDate: lastCheckingDate,
      futureCheckingDate: futureCheckingDate,
      deviceId: device.id,
      housingStock: houseId,

    },
    validationSchema: Yup.object({
      deviceId: Yup.number().required('Не передан ИД устройства'),
    }),
    onSubmit: async () => {
      const form = {
        deviceId: values.deviceId,
        currentCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
      };

      console.log(form);
      console.log(JSON.stringify(form));
      checkDevice(form);
      setTimeout(handleCancel, 1000);
    },
  });

  return (
    <form id="checkDevice" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      
      <Header>{`Поверка вычислителя ${model} (${serialNumber})`}</Header>
      <Form.Item label="Дата последней поверки прибора" style={{ width: '49%' }}>
        <DatePickerTT
          placeholder="Укажите дату"
          format="DD.MM.YYYY"
          allowClear={false}
          onChange={(date) => {
            setFieldValue('lastCheckingDate', date.toISOString());
            setFieldValue('futureCheckingDate', moment(date).add(3, 'years'))
          }}
          value={moment(values.lastCheckingDate)}
          name="lastCheckingDate"
        />
        <Alert name={'lastCheckingDate'} />
      </Form.Item>
      <Form.Item label="Дата следующей поверки прибора" style={{ width: '49%' }}>
        <DatePickerTT
          placeholder="Укажите дату"
          format="DD.MM.YYYY"
          allowClear={false}
          onChange={(date) => {
            setFieldValue('futureCheckingDate', date.toISOString());
          }}
          value={moment(values.futureCheckingDate)}
          name="futureCheckingDate"
        />
        <Alert name={'futureCheckingDate'} />
      </Form.Item>
      <div style={{ paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonTT
          color="white"
          onClick={handleCancel}
        >
          Отмена
        </ButtonTT>
        <ButtonTT
          color="blue"
          style={{ marginLeft: '32px' }}
          type="submit"
          onClick={handleSubmit}
          form="deregisterDevice"
        >
          Сохранить изменения
        </ButtonTT>
      </div>
    </form>
  );
};

export default ModalCheckForm;
