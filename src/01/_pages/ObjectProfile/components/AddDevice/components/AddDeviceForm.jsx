import { Form } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { SelectTT } from '../../../../../tt-components/Select';
import { onChangeDeviceFormValueByPath } from '../../../../../Redux/actions/actions';
import { resources, serviceLife, types } from '../DeviceJSON';
import { InputTT } from '../../../../../tt-components/InputTT';
import { DatePickerTT } from '../../../../../tt-components/DatePicker';

const AddDeviceForm = () => {
  console.log('AddDeviceForm');

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: types[0].value,
      resource: resources[0].value,
      checkingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
    },
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      console.log('onSubmit');
      // deregisterDevice(form);
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
    <form id="formikForm" onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <Form.Item label="Выберите тип прибора">
          <SelectTT
            name="housingMeteringDeviceType"
            onChange={(value) => {
              setFieldValue('housingMeteringDeviceType', value);
            }}
            options={types}
            value={values.housingMeteringDeviceType}
          />
        </Form.Item>

        <Form.Item label="Выберите тип ресурса">
          <SelectTT
            name="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
            }}
            options={resources}
            value={values.resource}
          />
        </Form.Item>

        <Form.Item label="Выберите модель прибора">
          <InputTT
            name="model"
            type="text"
            onChange={handleChange}
            value={values.model}
          />
        </Form.Item>

        <Form.Item label="Серийный номер">
          <InputTT
            name="serialNumber"
            type="text"
            onChange={handleChange}
            value={values.serialNumber}
          />
        </Form.Item>

        <Form.Item label="Дата выпуска прибора">
          <DatePickerTT
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('checkingDate', date.toISOString());
            }}
            value={moment(values.checkingDate)}
          />
        </Form.Item>

        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePickerTT
            name="futureCheckingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date.toISOString());
            }}
            value={moment(values.futureCheckingDate)}
          />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу">
          <SelectTT
            id="futureCommercialAccountingDate"
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              setFieldValue('futureCommercialAccountingDate', value);
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
          />
        </Form.Item>
      </div>
    </form>
  );
};

export default AddDeviceForm;
