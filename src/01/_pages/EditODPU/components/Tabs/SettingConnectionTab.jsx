import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Form, Select } from 'antd';

import { onChangeDeviceFormValueByPath, onChangeFormValueByPath } from '../../../../Redux/actions/actions';
import { magistrals, connection } from "../CalculatorJSON";
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
      connection: connection[0].value,
      model: '',
      serialNumber: '',
      test: '',
      calculatorId: ''
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form id="formikForm" onSubmit={handleSubmit}>

        <Form.Item label="Подключение к вычислителю">
          <Select
            id="connection"
            name="connection"
            onChange={(event) => {
              values.connection = event;
              const value = event;
              const path = ['resource'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={connection}
            value={values.connection}

          />
        </Form.Item>

        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <Input
            id="calculatorId"
            name='calculatorId'
            type="number"
            placeholder="Начните вводить ID прибора"
            value={calculatorId}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['calculatorId'];
              dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
          <Alert name="calculatorId"/>
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

      </form>
    </div>
  );
};

export default SettingConnectionTab;
