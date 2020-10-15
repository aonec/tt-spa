import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form, Select } from 'antd';

import { onChangeDeviceFormValueByPath, onChangeFormValueByPath } from '../../../../Redux/actions/actions';
import { magistrals } from "../../../ObjectProfile/components/AddDevice/components/DeviceJSON";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { resources, types } from "../CalculatorJSON";
import * as Yup from "yup";
import _ from "lodash";
import axios from "../../../../axios";
import { ButtonTT } from "../../../../tt-components/ButtonTT";

const SettingConnectionTab = () => {
  const { 1: deviceId } = useParams();
  const {
    pipe: { entryNumber, hubNumber, pipeNumber, magistral },
    calculatorId
  } = useSelector((state) => state.deviceReducer);

  const form = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  console.log("calculatorId", calculatorId)

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <Input
            id="calculatorId"
            type="number"
            placeholder="Начните вводить ID прибора"
            value={calculatorId}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['calculatorId'];
              dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}

          />
        </Form.Item>

        <Form.Item label="Номер ввода">
          <Input
            id="entryNumber"
            type="number"
            placeholder="1"
            value={entryNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'entryNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item label="Номер узла">
          <Input
            id="hubNumber"
            type="number"
            placeholder="1"
            value={hubNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'hubNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item label="Номер трубы">
          <Input
            id="pipeNumber"
            type="number"
            placeholder="1"
            value={pipeNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'pipeNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item name="text" label="Номер трубы">

          <Select
            placeholder="Выберите тип устройства"
            id="magistral"
            options={magistrals}
            defaultValue={magistrals[0].value}
            onChange={(event) => {
              const value = event;
              const path = ['pipe', 'magistral'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
          />

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
    </div>
  );
};

export default SettingConnectionTab;
