import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, DatePicker, Button } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import moment from 'moment';
import { deregisterDevice } from '01/_api/device_page';
import { useParams } from 'react-router-dom';
import { setModalDeregisterVisible, updateModalDeregisterForm } from '../../../../Redux/actions/actions';
import { Title } from '../../../../tt-components';
import axios from '../../../../axios';

const ModalDeregisterDevice = () => {
  const { 0: objid, 1: deviceId } = useParams();
  const [device, setDevice] = useState({});

  async function getInfo(url = '') {
    try {
      const res = await axios.get(`MeteringDevices/${url}`);
      console.log('res', res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  const dispatch = useDispatch();
  const visible = useSelector((state) => state.deviceDeregisterReducer.visible);
  const deregisterFormState = useSelector((state) => state.deviceDeregisterReducer.deregisterFormState);

  const DeregisterForm = () => {
    const onSubmit = (values, { setSubmitting }, errors) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    };

    const emptyValidate = (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      }
      if (!values.text) {
        errors.text = 'Required Text';
      }
      if (!values.datepicker) {
        errors.datepicker = 'Required Date';
      }

      return errors;
    };

    return (
      <>
        <Title size="middle" color="black">
          Вы действительно хотите снять () с учета?
        </Title>
        <Formik
          initialValues={{ email: '', text: '', datepicker: moment() }}
          validate={emptyValidate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, errors }) => (
            <Form id="formikForm">

              <div style={{ padding: '10px' }}>
                <DatePicker
                  name="datepicker"
                  allowClear={false}
                />
                <ErrorMessage name="datepicker" component="div" />
              </div>

              <div style={{ padding: '10px' }}>
                <p>Text</p>
                <Field type="text" name="text" />
                <ErrorMessage name="text" component="div" />
              </div>

            </Form>
          )}
        </Formik>
      </>
    );
  };

  useEffect(() => {
    getInfo(deviceId).then((res) => {
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
      <DeregisterForm />
    </Modal>
  );
};
export default connect()(ModalDeregisterDevice);
