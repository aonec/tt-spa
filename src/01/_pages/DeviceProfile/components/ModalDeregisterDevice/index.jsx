import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, DatePicker, Button } from 'antd';
import { useDispatch, useSelector, connect } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
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
  const { closingDateTime, documentsIds } = deregisterFormState

  const DeregisterForm = () => {
    const onSubmit = (values, { setSubmitting }, errors) => {
      deregisterDevice()
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
                  onChange={(date) => {
                    const path = ['deregisterFormState', 'closingDateTime'];
                    const value = date.toISOString();
                    dispatch(updateModalDeregisterForm(path, value));
                  }}
                  value={moment(closingDateTime)}
                />
                <ErrorMessage name="datepicker" component="div"/>
              </div>

              <div style={{ padding: '10px' }}>
                <p>Text</p>
                <Field type="text" name="text"/>
                <ErrorMessage name="text" component="div"/>
              </div>

            </Form>
          )}
        </Formik>
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
      <DeregisterForm/>
    </Modal>
  );
};
export default connect()(ModalDeregisterDevice);
