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
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT, Title,
} from '../../../../../tt-components';
import TabsComponent from "../../../../EditODPU/components/Main";

const ChangeOdpuForm = () => {
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
      deviceId: Number(deviceId),
      documentsIds: [],
      closingDateTime,
    };
    getDevice(deviceId).then((res) => setDevice(res));
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
      closingDateTime: '',
      test: '',
    },
    validationSchema: Yup.object({
      test: Yup.string().required('Введите данные'),
      closingDateTime: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
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

  const [currentTabKey, setTab] = useState('1');
  function handleChangeTab(value){
    setTab(value);
  }


  const Header = () => {
    console.log("Header")
    return (
      <div style={{display: 'flex', justifyContent:'space-between'}}>
        <Form.Item label="Выберите дальнейшее действие" style={{width: '49%'}}>
          <SelectTT
            disable
            placeholder={'Замена прибора'}
          />
          <Alert name="Выберите дальнейшее действие"/>
        </Form.Item>

        <Form.Item label="Исполнитель" style={{width: '49%'}}>
          <SelectTT
            placeholder={'Константинопольский К.К.'}
            disable
          />
          <Alert name="Исполнитель"/>
        </Form.Item>
      </div>
    )
  }

  return (
    <>
      <Header />
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      <form id="formikForm" onSubmit={handleSubmit}>
        <Form.Item label="Серийный номер">
          <InputTT
            placeholder={'1234567890'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        <Form.Item label="Тип прибора">
          <InputTT
            disabled
            placeholder={'Тип прибора'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        <Form.Item label="Тип ресурса">
          <SelectTT
            disabled
            placeholder={'Холодная вода'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        <Form.Item label="Модель прибора">
          <InputTT
            disabled
            placeholder={'Модель прибора'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        <Form.Item label="Дата поверки пробора">
          <DatePickerTT
            disabled
            value={moment()}
            format={'DD.MM.YYYY'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        <Form.Item label="Модель прибора">
          <DatePickerTT
            disabled
            value={moment()}
            format={'DD.MM.YYYY'}
          />
          <Alert name="Alert"/>
        </Form.Item>

        ++++++++++++++++++++++++
        <Form.Item label="Дата снятия прибора с учета">
          <DatePickerTT
            name="closingDateTime"
            allowClear={false}
            onBlur={handleBlur}
            onChange={(date) => {
              values.closingDateTime = date.toISOString();
              const path = ['deregisterFormState', 'closingDateTime'];
              const value = date.toISOString();
              dispatch(updateModalDeregisterForm(path, value));
            }}
            values={values.closingDateTime}
          />
          <Alert name="closingDateTime"/>
        </Form.Item>

        <Form.Item label="Дополнительное поле">
          <InputTT
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
  );
};

export default ChangeOdpuForm;
