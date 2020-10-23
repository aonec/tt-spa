import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deregisterDevice, getDevice } from '../../../../../_api/device_page';
import { updateModalDeregisterForm } from '../../../../../Redux/actions/actions';
import { DatePickerTT, Title } from '../../../../../tt-components';

const DeregisterForm = (props) => {
  const { deviceOdpu } = props;
  const { 1: deviceId } = useParams();
  const [device, setDevice] = useState({});
  const { serialNumber, model } = device;
  const dispatch = useDispatch();
  const form = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'deregisterFormState'], {}),
  );
  const { closingDateTime = moment() } = form;
  useEffect(() => {
    const setForm = {
      // deviceId: Number(deviceId),
      deviceId: Number(deviceOdpu.id),
      documentsIds: [],
      closingDateTime: moment().toISOString(),
    };
    // getDevice(deviceId).then((res) => setDevice(res));
    getDevice(deviceOdpu.id).then((res) => setDevice(res));
    dispatch(
      updateModalDeregisterForm('deregisterFormState', setForm),
    );
  }, []);

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      deviceId: Number(deviceId) || deviceOdpu.id,
      documentsIds: [],
      closingDateTime: moment().toISOString(),
      // test: '',
    },
    validationSchema: Yup.object({
      // test: Yup.string().required('Введите данные'),
      closingDateTime: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
      console.log(form)
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

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Title size="middle" color="black">
          {`Вы действительно хотите снять ${model || deviceOdpu.model || 'Вычислитель'} (${serialNumber || deviceOdpu.serialNumber}) с учета?`}
        </Title>

        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT
            name="closingDateTime"
            allowClear={false}
            format="DD.MM.YYYY"
            onBlur={handleBlur}
            onChange={(date) => {
              const path = ['deregisterFormState', 'closingDateTime'];
              const value = date.toISOString();
              dispatch(updateModalDeregisterForm(path, value));
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

{ /* <Form.Item label="Дополнительное поле"> */ }
{ /*  <InputTT */ }
{ /*    value={values.test} */ }
{ /*    onChange={handleChange} */ }
{ /*    onBlur={handleBlur} */ }
{ /*    name="test" */ }
{ /*    type="text" */ }
{ /*  /> */ }
{ /*  <Alert name="test" /> */ }
{ /* </Form.Item> */ }
