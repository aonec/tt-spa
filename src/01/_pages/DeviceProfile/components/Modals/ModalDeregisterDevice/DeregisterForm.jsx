import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { DatePicker, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deregisterDevice, getDevice } from '../../../../../_api/device_page';
import { updateModalDeregisterForm } from '../../../../../Redux/actions/actions';
import { Title } from '../../../../../tt-components/Title';

const DeregisterForm = () => {
  const { 1: deviceId } = useParams();
  const dispatch = useDispatch();
  const deregisterFormState = useSelector((state) => state.deviceDeregisterReducer.deregisterFormState);
  const { closingDateTime } = deregisterFormState;

  useEffect(() => {
    const setForm = {
      deviceId: Number(deviceId),
      documentsIds: [],
      closingDateTime: moment().toISOString(),
    };
    getDevice(deviceId);
    dispatch(
      updateModalDeregisterForm('deregisterFormState', setForm),
    );
  }, []);

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur,
  } = useFormik({
    initialValues: {
      deviceId: Number(deviceId),
      documentsIds: [],
      closingDateTime: moment().toISOString(),
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Введите данные'),
      closingDateTime: Yup.string().required('Введите дату')
    }),
    onSubmit: ({ test, closingDateTime }) => {
      deregisterDevice(deregisterFormState).then(() => {
        dispatch(updateModalDeregisterForm('visible', false));
      });
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
          Вы действительно хотите снять () с учета?
        </Title>

        <Form.Item label="Дата снятия прибора с учета">
          <DatePicker
            name="closingDateTime"

            allowClear={false}
            onChange={(date) => {
              handleChange(date.toISOString());
              const path = ['deregisterFormState', 'closingDateTime'];
              const value = date.toISOString();
              dispatch(updateModalDeregisterForm(path, value));
            }}
            value={moment(values.closingDateTime)}
            // value={moment(closingDateTime)}
          />
          <Alert name="closingDateTime"/>
        </Form.Item>

        <Form.Item label="Дополнительное поле">
          <Input
            value={values.test}
            onChange={handleChange}
            onBlur={handleBlur}
            name="test"
            type="text"
          />
          <Alert name="test"/>
        </Form.Item>
      </form>
    </>
  )
    ;
};

export default DeregisterForm;
