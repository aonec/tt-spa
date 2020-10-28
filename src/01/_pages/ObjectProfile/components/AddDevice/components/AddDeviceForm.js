import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  serviceLife, resources, magistrals, housingMeteringDeviceTypes, isConnected,
} from '../DeviceJSON';
import {
  Header, SelectTT, InputTT, DatePickerTT,
} from '../../../../../tt-components';
import axios from '../../../../../axios';

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const AddDeviceForm = (props) => {
  const { currentTabKey, calculators } = props;
  const [disable, setDisable] = useState(false);

  const visibleValuesByTab1 = ['housingMeteringDeviceType', 'resource', 'model',
    'serialNumber',
    'lastCommercialAccountingDate',
    'futureCheckingDate',
    'futureCommercialAccountingDate'];
  const visibleValuesByTab2 = ['isConnected',
    'calculatorId',
    'entryNumber',
    'hubNumber',
    'pipeNumber',
    'magistral'];
  const visibleValuesByTab3 = ['documents'];

  const visibleValuesByTab = [
    {
      key: 1,
      value: visibleValuesByTab1,
    },
    {
      key: 2,
      value: visibleValuesByTab2,
    },
    { key: 3, value: visibleValuesByTab3 },
  ];

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>Корректно введите значение</div>
      );
    }
    return null;
  };

  const isVisible = (name) => _.find(visibleValuesByTab, { key: Number(currentTabKey) }).value.includes(name);



  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      isConnected: isConnected[0].value,
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
      magistral: magistrals[0].value,

    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
      pipeNumber: Yup.number().required('Введите данные'),
      hubNumber: Yup.number().required('Введите данные'),
      entryNumber: Yup.number().required('Введите данные'),
      model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите данные'),
      serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите данные'),
      calculatorId: Yup.string().required('Выберите вычислитель'),
    }),

    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        checkingDate: values.checkingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        documentsIds: [],
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
      console.log(JSON.stringify(form));
      addOdpu(form);
    },
  });

  async function addOdpu(form) {
    try {
      const res = await axios.post('HousingMeteringDevices', form);
      alert('ОДПУ успешно создан !');
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка добавления ОДПУ',
      };
    }
  }


  return (

    <form
      id="formikFormAddOdpu"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* <ButtonTT onClick={buttonHandler}>ButtonTT</ButtonTT> */}

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
          <Alert name="housingMeteringDeviceType" />
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
          <Alert name="resource" />
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
          <Alert name="model" />
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
          <Alert name="serialNumber" />
        </Form.Item>
      )}

      {isVisible('lastCommercialAccountingDate')
      && (
        <Form.Item label="Дата выпуска прибора">
          <DatePickerTT
            format="DD.MM.YYYY"
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
            format="DD.MM.YYYY"
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
              const value = moment(values.lastCommercialAccountingDate)
                .add(item, 'year')
                .toISOString();
              setFieldValue('futureCommercialAccountingDate', value);
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
        </Form.Item>
      )}

      {/* Second Tabs */}
      {isVisible('isConnected')
      && (
        <Form.Item label="Подключение к вычислителю">
          <SelectTT
            name="isConnected"
            onChange={(item) => {
              (item === false) ? setDisable(true) : setDisable(false);
              setFieldValue('isConnected', item);
            }}
            placeholder="Подключение к вычислителю"
            options={isConnected}
            value={values.isConnected}
            disabled
          />
        </Form.Item>
      )}

      {isVisible('calculatorId')
      && (
        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
        >
          <SelectTT
            name="calculatorId"
            type="text"
            placeholder="Начните вводить серийный номер или IP адрес прибора"
            onChange={(value) => {
              if (value !== values.calculatorId) {
                const selected = _.find(calculators, { value });
                const { connection: { ipV4, deviceAddress, port } } = selected;
                setValues((prevValues) => ({
                  ...prevValues,
                  ipV4,
                  deviceAddress,
                  port,
                  calculatorId: value
                }));
              }
            }}
            options={calculators}
            value={values.calculatorId}
            disabled={disable}
          />
          <Alert name="calculatorId" />
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
            disabled={disable}
          />
          <Alert name="entryNumber" />
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
            disabled={disable}
          />
          <Alert name="hubNumber" />
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
            disabled={disable}
          />
          <Alert name="pipeNumber" />
        </Form.Item>
      )}

      {isVisible('magistral') && (
        <Form.Item name="text" label="Выберите тип устройства">
          <SelectTT
            placeholder="Выберите тип устройства"
            name="magistral"
            options={magistrals}
            onChange={(value) => {
              setFieldValue('magistral', value);
            }}
            value={values.magistral}
          />
          <Alert name="magistral" />
        </Form.Item>
      )}

      {isVisible('documents') && (
        <Header>Компонент в разработке</Header>
      )}

    </form>
  );
};

export default AddDeviceForm;
