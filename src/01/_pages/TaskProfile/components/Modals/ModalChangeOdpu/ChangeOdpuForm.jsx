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
  ButtonTT,
  Header, SelectTT, InputTT, DatePickerTT,
} from '../../../../../tt-components';
import TabsComponent from '../../../../EditODPU/components/Main';

const ChangeOdpuForm = () => {
  const { 1: deviceId } = useParams();
  const [device, setDevice] = useState({});
  const dispatch = useDispatch();
  const form = useSelector(
    (state) => _.get(state, ['deviceDeregisterReducer', 'deregisterFormState'], {}),
  );
  const { closingDateTime = moment() } = form;
  useEffect(() => {
    getDevice(deviceId).then((res) => setDevice(res));
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

  function handleChangeTab(value) {
    setTab(value);
  }
  const handleFormButton = () => {
    console.log('handleFormButton');
    console.log(currentTabKey);

    setTab(String(Number(currentTabKey) + 1));
  };
  const Header = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Form.Item label="Выберите дальнейшее действие" style={{ width: '49%' }}>
        <SelectTT
          disabled
          placeholder="Замена прибора"
        />
        <Alert name="Выберите дальнейшее действие" />
      </Form.Item>

      <Form.Item label="Исполнитель" style={{ width: '49%' }}>
        <SelectTT
          placeholder="Константинопольский К.К."
          disabled
        />
        <Alert name="Исполнитель" />
      </Form.Item>
    </div>
  );

  const ButtonNext = () => {
    console.log('ButtonNext');
    return (
      <ButtonTT color="blue" disabled onClick={handleFormButton}>Далее</ButtonTT>
    );
  };

  return (
    <>
      <Header />
      <TabsComponent
        currentTabKey={currentTabKey}
        handleChangeTab={handleChangeTab}
      />
      <form
        id="formikForm"
        onSubmit={handleSubmit}
        style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
      >
        <Form.Item label="Серийный номер" style={{ width: '49%' }}>
          <InputTT
            placeholder="1234567890"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Тип прибора" style={{ width: '49%' }}>
          <InputTT
            disabled
            placeholder="Тип прибора"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
          <SelectTT
            disabled
            placeholder="Холодная вода"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Модель прибора" style={{ width: '49%' }}>
          <InputTT
            disabled
            placeholder="Модель прибора"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            disabled
            value={moment()}
            format="DD.MM.YYYY"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            disabled
            value={moment()}
            format="DD.MM.YYYY"
          />
          <Alert name="Alert" />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу" style={{ width: '100%' }}>
          <SelectTT
            disabled
            placeholder="Срок эксплуатации по нормативу"
          />
          <Alert name="Alert" />
        </Form.Item>
        <ButtonNext />

        {/* <Form.Item label="Дополнительное поле"> */}
        {/*  <InputTT */}
        {/*    value={values.test} */}
        {/*    onChange={handleChange} */}
        {/*    onBlur={handleBlur} */}
        {/*    name="test" */}
        {/*    type="text" */}
        {/*  /> */}
        {/*  <Alert name="test" /> */}
        {/* </Form.Item> */}
      </form>
    </>
  );
};

export default ChangeOdpuForm;
