import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import moment from 'moment';
import {
  housingMeteringDeviceTypes, resources,  isConnectedValue,magistrals
} from '../../../tt-components/localBases';
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT, InputNunmberTT} from '../../../tt-components';
import { putOdpu } from './apiEditOdpu';

const FormEditODPU = (props) => {
  const {
    currentTabKey, device, calculators,
  } = props;

  const { deviceId } = useParams();

  const {
    address,
    hubConnection,
    id,
    model,
    serialNumber,
    connection,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    diameter,
    resource,
    housingMeteringDeviceType,
  } = device;

  const {
    hub, calculatorId, calculatorSerialNumber, calculatorModel, calculatorConnection,
  } = hubConnection;

  const {
    isConnected, ipV4, port, deviceAddress,
  } = calculatorConnection || {
    isConnected: false,
    ipV4: '',
    port: null,
    deviceAddress: null,
  };

  const {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = hub;

  const {
    city, street, housingStockNumber, corpus,
  } = address;

  const {
    handleSubmit,
    handleChange, values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: housingMeteringDeviceType || 'Тип прибора не указан',
      resource: resource || 'Тип ресурса не указан',
      model: model || 'Модель не указана',
      serialNumber: serialNumber || 'Серийный номер не указан',
      lastCheckingDate: lastCheckingDate || moment().toISOString(),
      futureCheckingDate: futureCheckingDate || moment().toISOString(),
      lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      futureCommercialAccountingDate: futureCommercialAccountingDate || moment().toISOString(),
      calculatorId: calculatorId || 'Вычислитель не выбран',
      entryNumber: entryNumber,
      hubNumber: hubNumber,
      diameter: diameter,
      pipeNumber: pipeNumber == null ? 0 : pipeNumber,
      port: port || 0,
      checkingDate: moment().toISOString(),
      city: city || 'Город не указан',
      street: street || 'Улица не указана',
      housingStockNumber: housingStockNumber || 'Номер дома не указан',
      corpus: corpus,
      magistral: magistral || 'Не выбрано',
      ipV4,
      isConnected: isConnectedValue[0].value,
    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
      pipeNumber: Yup.number().required('Введите число от 0'),
      entryNumber: Yup.number().min(0, 'от 0').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
      // diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
      model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите данные'),
      serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите данные'),
      calculatorId: Yup.string().required('Выберите вычислитель'),
    }),
    onSubmit: () => {
      const PUT_EDIT_FORM = {
        serialNumber: values.serialNumber,
        checkingDate: values.checkingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource: values.resource,
        model: values.model,
        // diameter: values.diameter,
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: values.entryNumber,
          hubNumber: values.hubNumber || null,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral || 'Направление не выбрано',
        },
      };
      putOdpu(id, PUT_EDIT_FORM);
      console.log('PUT_EDIT_FORM', PUT_EDIT_FORM);
      console.log('PUT_EDIT_FORM', JSON.stringify(PUT_EDIT_FORM));
      // console.log(values)
    },
  });

  const EditODPUButtons = () => (
    <div style={{ padding: '32px 0' }}>
      <ButtonTT
        form="editOdpuForm"
        color="blue"
        style={{ marginRight: '16px' }}
        onClick={handleSubmit}
        type="submit"
      >
        Сохранить
      </ButtonTT>

      <NavLink to={`/housingMeteringDevices/${deviceId}/`}>
        <ButtonTT
          style={{ marginLeft: '16px' }}
          color="white"
        >
          Отмена
        </ButtonTT>
      </NavLink>
    </div>
  );

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
  const [disable, setDisable] = useState(false);

  return (
    <div style={{ maxWidth: '480px' }}>
      <form id="editOdpuForm" onSubmit={handleSubmit} style={{ paddingBottom: '40px' }}>

        <div hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Выберите тип прибора">
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(event) => {
                setFieldValue('housingMeteringDeviceType', event);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Form.Item label="Выберите тип ресурса">
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              value={values.resource}
              disabled
            />
          </Form.Item>

          <Form.Item label="Выберите модель прибора">
            <InputTT
              name="model"
              placeholder="Укажите модель..."
              type="text"
              onChange={handleChange}
              value={values.model}
              onBlur={handleBlur}
            />
            <Alert name="model" />
          </Form.Item>

          <Form.Item label="Серийный номер">
            <InputTT
              name="serialNumber"
              placeholder="Укажите серийный номер..."
              type="text"
              onChange={handleChange}
              value={values.serialNumber}
              onBlur={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Диаметр трубы (мм)">
            <InputTT
              name="diameter"
              placeholder="Укажите диаметр трубы в мм"
              type={'number'}
              onChange={handleChange}
              value={values.diameter}
              onBlur={handleBlur}
            />
            <Alert name="diameter" />
          </Form.Item>

          <Form.Item label="Дата поверки">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date.toISOString());
              }}
              value={moment(values.lastCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата следующей поверки">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString());
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата начала Акта действия допуска">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.lastCommercialAccountingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата окончания Акта действия допуска">
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.futureCommercialAccountingDate)}
            />
          </Form.Item>

          <Form.Item label="Город">
            <InputTT
              name="city"
              type="text"
              placeholder="Укажите город"
              onChange={handleChange}
              value={values.city}
              disabled
            />
            <Alert name="city" />
          </Form.Item>

          <Form.Item label="Улица">
            <InputTT
              name="street"
              type="text"
              placeholder="Укажите улицу"
              onChange={handleChange}
              value={values.street}
              disabled
            />
            <Alert name="street" />
          </Form.Item>

          <Form.Item label="Номер дома">
            <InputTT
              name="housingStockNumber"
              type="text"
              placeholder="Укажите дом"
              onChange={handleChange}
              value={values.housingStockNumber}
              disabled
            />
            <Alert name="number" />
          </Form.Item>

          {corpus ? (
            <Form.Item label="Номер корпуса">
              <InputTT
                name="corpus"
                type="text"
                placeholder="Номер корпуса"
                onChange={handleChange}
                value={values.corpus}
                disabled
              />
              <Alert name="corpus" />
            </Form.Item>
          ) : null}

        </div>

        <div hidden={Number(currentTabKey) !== 2}>
          <Form.Item label="Подключение к вычислителю">
            <SelectTT
              name="isConnected"
              onChange={(item) => {
                // (item === false) ? setDisable(true) : setDisable(false);
                setFieldValue('isConnected', item);
              }}
              placeholder="Подключение к вычислителю"
              options={isConnectedValue}
              value={values.isConnected}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
          >
            <SelectTT
              name="calculatorId"
              placeholder="Начните вводить серийный номер или IP адрес прибора"
              onChange={(value) => { setFieldValue('calculatorId', value); }}
              options={calculators}
              value={values.calculatorId}
              disabled={disable}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода">
            <InputTT
              name="entryNumber"
              type="number"
              placeholder="Номер ввода"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.entryNumber}
              disabled={disable}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <Form.Item label="Номер узла">
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hubNumber}
              disabled={disable}
            />
            <Alert name="hubNumber" />
          </Form.Item>

          <Form.Item label="Номер трубы">
            <InputTT
              name="pipeNumber"
              type="number"
              placeholder="Номер трубы"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pipeNumber}
              disabled={disable}
            />
            <Alert name="pipeNumber" />
          </Form.Item>


          <Form.Item label="Направление магистрали">
            <SelectTT
              name="magistral"
              options={magistrals}
              placeholder="Направление магистрали"
              onChange={(value) => { setFieldValue('magistral', value); }}
              onBlur={handleBlur}
              value={values.magistral}
            />
            <Alert name="magistral" />
          </Form.Item>

        </div>

        <div hidden={Number(currentTabKey) !== 3}>
          <Header>Компонент в разработке</Header>
        </div>

        {/* <EditODPUButtons /> */}

        <div style={{ padding: '32px 0' }}>
          <ButtonTT
            form="editOdpuForm"
            color="blue"
            style={{ marginRight: '16px' }}
            onClick={handleSubmit}
            type="submit"
          >
            Сохранить
          </ButtonTT>

          <NavLink to={`/housingMeteringDevices/${deviceId}/`}>
            <ButtonTT
              style={{ marginLeft: '16px' }}
              color="white"
            >
              Отмена
            </ButtonTT>
          </NavLink>
        </div>

      </form>
    </div>
  );
};

export default FormEditODPU;
