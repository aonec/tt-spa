import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  serviceLife, resources, magistrals, housingMeteringDeviceTypes,
} from '../DeviceJSON';
import {
  ButtonTT, Header, SelectTT, InputTT, DatePickerTT,
} from '../../../../../tt-components';

const AddDeviceForm = ({ currentTabKey }) => {
  const arr = [
    ['housingMeteringDeviceType', 'resource', 'model',
      'serialNumber',
      'lastCommercialAccountingDate',
      'futureCheckingDate',
      'futureCommercialAccountingDate'],
    ['calculatorId',
      'entryNumber',
      'hubNumber',
      'pipeNumber',
      'magistral'],
    ['documents'],
  ];

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

  const isVisible = (name) => arr[Number(currentTabKey) - 1].includes(name);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      checkingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      futureCommercialAccountingDate: moment().toISOString(),
      housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
      resource: resources[0].value,
      model: '',
      calculatorId: null,
      entryNumber: null,
      hubNumber: null,
      pipeNumber: null,
      magistral: '',

    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
    }),

    onSubmit: async () => {
      const form = {
        deviceId: values.deviceId,
        documentsIds: values.documentsIds,
        closingDateTime: values.closingDateTime,
      };
      console.log(form);
    },
  });

  const TEMPLATE = {
    serialNumber: values.serialNumber,
    checkingDate: values.checkingDate,
    futureCheckingDate: values.futureCheckingDate,
    lastCommercialAccountingDate: values.lastCommercialAccountingDate,
    documentsIds: [
      0,
    ],
    connection: {
      ipV4: values.ipV4,
      deviceAddress: values.deviceAddress,
      port: values.port,
    },
    futureCommercialAccountingDate: values.futureCommercialAccountingDate,
    housingMeteringDeviceType: values.housingMeteringDeviceType,
    resource: values.resource,
    model: values.model,
    pipe: {
      calculatorId: values.calculatorId,
      entryNumber: values.entryNumber,
      hubNumber: values.hubNumber,
      pipeNumber: values.pipeNumber,
      magistral: values.magistral,
    },
  };
  const buttonHandler = () => {
    console.log('buttonHandler');
    console.log(TEMPLATE);
  };
  return (

    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ButtonTT onClick={buttonHandler}>ButtonTT</ButtonTT>

      {isVisible('housingMeteringDeviceType')
      && (
        <Form.Item label="Выберите тип прибора">
          <SelectTT
            id="housingMeteringDeviceType"
            onChange={(value) => {
              setFieldValue('housingMeteringDeviceType', value);
            }}
            options={housingMeteringDeviceTypes}
            value={values.housingMeteringDeviceType}
          />
        </Form.Item>
      )}

      {isVisible('resource')
      && (
        <Form.Item label="Выберите тип ресурса">
          <SelectTT
            id="resource"
            onChange={(value) => {
              setFieldValue('resource', value);
            }}
            options={resources}
            defaultValue={resources[0].value}
          />
        </Form.Item>
      )}

      {isVisible('model')
      && (
        <Form.Item label="Выберите модель прибора">
          <InputTT
            id="model"
            type="text"
            onChange={handleChange}
            value={values.model}
          />
        </Form.Item>
      )}

      {isVisible('serialNumber')
      && (
        <Form.Item label="Серийный номер">
          <InputTT
            id="serialNumber"
            type="text"
            onChange={handleChange}
            value={values.serialNumber}
          />
        </Form.Item>
      )}

      {isVisible('lastCommercialAccountingDate')
      && (
        <Form.Item label="Дата выпуска прибора">
          <DatePickerTT
            format={'DD.MM.YYYY'}
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date.toISOString());
            }}
            value={moment(values.lastCommercialAccountingDate)}
          />
        </Form.Item>
      )}

      {isVisible('futureCheckingDate')
      && (
        <Form.Item label="Дата ввода в эксплуатацию">
          <DatePickerTT
            format={'DD.MM.YYYY'}
            name="futureCheckingDate"
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date.toISOString());
            }}
            value={moment(values.futureCheckingDate)}
          />
        </Form.Item>
      )}

      {isVisible('futureCommercialAccountingDate')
      && (
        <Form.Item label="Срок эксплуатации по нормативу">
          <SelectTT
            id="futureCommercialAccountingDate"
            onChange={(item) => {
              const value = moment( values.lastCommercialAccountingDate)
                .add(item, 'year')
                .toISOString();
              setFieldValue('futureCommercialAccountingDate',value )

            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
        </Form.Item>
      )}

      {isVisible('calculatorId')
      && (
        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <InputTT
            name="calculatorId"
            type="number"
            placeholder="Начните вводить ID прибора"
            onChange={handleChange}
            value={values.calculatorId}
          />
        </Form.Item>
      )}

      {isVisible('entryNumber') && (
        <Form.Item label="Номер ввода">
          <InputTT
            name="entryNumber"
            type="number"
            placeholder="Номер ввода"
            value={values.entryNumber}
            onChange={handleChange}
          />
        </Form.Item>
      )}

      {isVisible('hubNumber') && (
        <Form.Item label="Номер узла">
          <InputTT
            name="hubNumber"
            type="number"
            placeholder="Номер узла"
            value={values.hubNumber}
            onChange={handleChange}
          />
        </Form.Item>
      )}

      {isVisible('pipeNumber') && (
        <Form.Item label="Номер трубы">
          <InputTT
            name="pipeNumber"
            type="number"
            placeholder="Номер трубы"
            value={values.pipeNumber}
            onChange={handleChange}
          />
        </Form.Item>
      )}

      {isVisible('magistral') && (
        <Form.Item name="text" label="Выберите тип устройства">

          <SelectTT
            placeholder="Выберите тип устройства"
            name="magistral"
            options={magistrals}
            defaultValue={magistrals[0].value}
            onChange={(value) => {
              setFieldValue('magistral', value);
            }}
          />
        </Form.Item>
      )}

      {isVisible('documents') && (
      <Header>Компонент в разработке</Header>
      )}

    </div>
  );
};

export default AddDeviceForm;
