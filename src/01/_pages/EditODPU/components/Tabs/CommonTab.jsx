import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  DatePicker,
  Form, Input, Select,
} from 'antd';
import { onChangeDeviceFormValueByPath } from '../../../../Redux/actions/actions';
import { types, resources } from '../CalculatorJSON';
import moment from "moment";
import { serviceLife } from "../../../ObjectProfile/components/AddDevice/components/DeviceJSON";

const CommonTab = () => {
  const { 1: deviceId } = useParams();
  const dispatch = useDispatch();

  const form = useSelector((state) => state.deviceReducer) || {};
  const object = useSelector((state) => state.objectReducer) || {};

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
      serialNumber: Yup.string().required('Введите серийный номер'),
      model: Yup.string().required('Введите модель прибора'),
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
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <Form.Item label="Выберите тип прибора">
          <Select
            height={'60px'}
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
            id="model"
            name="model"
            type="text"
            onChange={(event) => {
              handleChange(event);
              const { value } = event.target;
              const path = ['model'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.model || model}
            onBlur={handleBlur}
          />
          <Alert name="model"/>
        </Form.Item>

        <Form.Item label="Серийный номер">
          <Input
            id="serialNumber"
            name="serialNumber"
            type="text"
            format={'DD.MM.YYYY'}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['serialNumber'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={values.serialNumber || serialNumber}
            onBlur={handleBlur}
          />
          <Alert name="serialNumber"/>
        </Form.Item>

        <Form.Item label="Дата выпуска прибора">
          <DatePicker
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            format={'DD.MM.YYYY'}
            onChange={(date) => {
              const path = ['checkingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            value={moment(checkingDate)}
          />
          <Alert name="lastCommercialAccountingDate"/>
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePicker
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            format={'DD.MM.YYYY'}
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate"/>
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу">
          <Select
            id="futureCommercialAccountingDate"
            name={'futureCommercialAccountingDate'}
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              const path = ['futureCommercialAccountingDate'];
              dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
          <Alert name="futureCommercialAccountingDate"/>
        </Form.Item>

      </form>
    </>
  );
};

export default CommonTab;
