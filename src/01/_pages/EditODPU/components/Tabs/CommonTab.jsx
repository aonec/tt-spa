import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Form, Input, Select,
} from 'antd';
import { onChangeDeviceFormValueByPath, updateModalDeregisterForm } from '../../../../Redux/actions/actions';
import { types, resources } from '../CalculatorJSON';
import { ButtonTT } from '../../../../tt-components/ButtonTT';
import deviceReducer from '../../../../Redux/reducers/reducerDev';
import axios from '../../../../axios';

const CommonTab = () => {
  const { 1: deviceId } = useParams();
  const dispatch = useDispatch();

  const form = useSelector((state) => state.deviceReducer) || {};

  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    infoId,
    futureCheckingDate,
    closingDateTime,
    model,
  } = form;

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: types[0].value,
      resource: resources[0].value,
      model: '',
      serialNumber: '',
      test: '',
    },
    validationSchema: Yup.object({
      // test: Yup.string().required('Введите данные'),
      // closingDateTime: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
      // deregisterDevice(form);
      console.log('Submit');
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

  const buttonHandler = () => {
    console.log('buttonHandler');
  };
  const saveButtonHandler = async () => {
    console.log(form)
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.put(`HousingMeteringDevices/${deviceId}`, form);
      console.log('saveButtonHandler', res);
      alert('ОДПУ успешно изменен !');
      return res;
    } catch (error) {
      console.log(error);
      alert(
        'Что-то пошло не так: попробуйте исправить CЕРИЙНЫЙ НОМЕР И АДРЕС УСТРОЙСТВА',
      );
      throw new Error(error);
    }
  };

  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Form.Item label="Выберите тип прибора">
          <Select
            id="housingMeteringDeviceType"
            name="housingMeteringDeviceType"
            onChange={(event) => {
              values.housingMeteringDeviceType = event;
              const value = event;
              const path = ['housingMeteringDeviceType'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={types}
            value={values.housingMeteringDeviceType}
          />
          <Alert name="closingDateTime"/>
        </Form.Item>

        <Form.Item label="Выберите тип ресурса">
          <Select
            id="resource"
            name="resource"
            onChange={(event) => {
              values.resource = event;
              const value = event;
              const path = ['resource'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={resources}
            value={values.resource}

          />
        </Form.Item>

        <Form.Item label="Выберите модель прибора">
          <Input
            // id="model"
            // name="model"
            type="text"
            onChange={(event) => {
              handleChange(event);
              const { value } = event.target;
              const path = ['model'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.model || model}
          />
        </Form.Item>

        <Form.Item label="Серийный номер">
          <Input
            id="serialNumber"
            name="serialNumber"
            type="text"
            onChange={(event) => {
              const { value } = event.target;
              const path = ['serialNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.serialNumber || serialNumber}
          />
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

        <div>
          <ButtonTT
            color="red"
            onClick={buttonHandler}
          >
            TEST
          </ButtonTT>
          <ButtonTT
            type="submit"
            color="blue"
            form="formikForm"
            onClick={saveButtonHandler}
          >
            Сохранить
          </ButtonTT>
          <ButtonTT
            style={{ marginLeft: '16px' }}
            type="submit"
            color="white"
          >
            Отмена
          </ButtonTT>
        </div>

      </form>
    </>
  );
};

export default CommonTab;
