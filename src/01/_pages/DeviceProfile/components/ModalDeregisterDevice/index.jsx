import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import _ from 'lodash';
import {
  Modal, DatePicker, Button, Form, Input,
} from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { deregisterDevice, getDevice } from '01/_api/device_page';
import { useParams } from 'react-router-dom';
import {
  setModalDeregisterVisible,
  updateModalDeregisterForm,
} from '../../../../Redux/actions/actions';
import { Title, ButtonTT } from '../../../../tt-components';

const ModalDeregisterDevice = () => {
  const { 1: deviceId } = useParams();
  const [device, setDevice] = useState({});

  const dispatch = useDispatch();
  const visible = useSelector((state) => state.deviceDeregisterReducer.visible);
  const deregisterFormState = useSelector((state) => state.deviceDeregisterReducer.deregisterFormState);
  const { closingDateTime, documentsIds } = deregisterFormState;

  const DeregisterForm = () => {
    const {
      handleSubmit, handleChange, values, touched, errors, handleBlur,
    } = useFormik({
      initialValues: {
        test: 'test',
      },
      validationSchema: Yup.object({
        test: Yup.string().required('Введите данные'),
      }),
      onSubmit: ({ test }) => {
        alert('Done!');
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
        <Form id="formikForm" onSubmit={handleSubmit}>
          <Title size="middle" color="black">
            Вы действительно хотите снять () с учета?
          </Title>

          <Form.Item label="Дата снятия прибора с учета">
            <DatePicker
              name="datepicker"
              allowClear={false}
              onChange={(date) => {
                const path = ['deregisterFormState', 'closingDateTime'];
                const value = date.toISOString();
                dispatch(updateModalDeregisterForm(path, value));
              }}
              value={moment(closingDateTime)}
            />
          </Form.Item>

          <Form.Item label="Введите Да для подтверждения изменений">
            <Input
              value={values.test}
              onChange={handleChange}
              onBlur={handleBlur}
              name="test"
              type="text"
            />
            <Alert name="test" />
          </Form.Item>
        </Form>
      </>
    );
  };

  useEffect(() => {
    getDevice(deviceId).then((res) => {
      setDevice(res);
    });

    const setForm = {
      deviceId: Number(deviceId),
      documentsIds: [],
      closingDateTime: moment().toISOString(),
    };

    dispatch(
      updateModalDeregisterForm('deregisterFormState', setForm),
    );
  }, []);

  const handleOk = (e) => {
    dispatch(setModalDeregisterVisible(['visible'], false));
  };

  const buttonHandler = () => {
    console.log(device);
  };

  const handleCancel = (e) => {
    dispatch(setModalDeregisterVisible(['visible'], false));
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <DeregisterForm />
      <ButtonTT type="submit" color="blue" form="formikForm">ОК</ButtonTT>
    </Modal>
  );
};
export default connect()(ModalDeregisterDevice);
