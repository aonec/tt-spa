import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import { DatePickerTT, Title } from '../../tt-components';
import axios from '../../axios';

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

const DeregisterForm = ({ device }) => {
  const { serialNumber, model, id } = device;

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      deviceId: Number(id),
      documentsIds: [],
      closingDateTime: moment().toISOString(),
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
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          {`Вы действительно хотите снять ${
            model || 'Вычислитель'
          } (${serialNumber}) с учета?`}
        </Title>
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
      </form>
    </>
  );
};

export default DeregisterForm;
