import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, DatePicker, Button } from 'antd';
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
import { Title } from '../../../../tt-components';

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
        datepicker: '',
        login: '',
      },
      validationSchema: Yup.object({
        login: Yup.string().max(10, 'Login must be shorter than 10 characters').required('Required'),

      }),
      onSubmit: ({ login, datepicker }) => {
        alert(`Login: ${login}; DatePicker: ${datepicker}`);
      },
    });

    return (
      <>
        <form id="formikForm" onSubmit={handleSubmit}>
          <Title size="middle" color="black">
            Вы действительно хотите снять () с учета?
          </Title>
          <div style={{ padding: '10px' }}>
            <DatePicker
              name="datepicker"
              // allowClear={false}
              onChange={(date) => {
                const path = ['deregisterFormState', 'closingDateTime'];
                // const value = date.toISOString();
                // dispatch(updateModalDeregisterForm(path, value));
              }}
              // value={moment(closingDateTime)}
            />
            {touched.datepicker && errors.datepicker ? (
              <div>{errors.datepicker}</div>
            ) : null}
          </div>
          <input
            value={values.login}
            onChange={handleChange}
            onBlur={handleBlur}
            id="login"
            name="login"
            type="text"
          />
          {touched.login && errors.login ? (
            <div>{errors.login}</div>
          ) : null}

          <button type="submit">Log in</button>
        </form>
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
      // title="DeregisterForm Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      // cancelText="Отмена"
      // okText="Сохранить"
      footer={null}
    >
      <Button onClick={buttonHandler}>Button</Button>
      <Button type="submit" form="formikForm">Button</Button>
      <DeregisterForm />
    </Modal>
  );
};
export default connect()(ModalDeregisterDevice);
