import React, { useState } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import moment from 'moment';
import {
  housingMeteringDeviceTypes, resources, isConnectedValue, magistrals,
} from '../../../../tt-components/localBases';
import {
  Header, SelectTT, InputTT, ButtonTT, DatePickerTT,
} from '../../../../tt-components';

const EmptyForm = () => {
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
      housingMeteringDeviceType: 'Тип прибора не указан',
      resource: 'Тип ресурса не указан',
      model: 'Модель не указана',
      serialNumber: 'Серийный номер не указан',
      lastCommercialAccountingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      calculatorId: 'Вычислитель не выбран',
      entryNumber: null,
      hubNumber: null,
      diameter: null,
      pipeNumber: null,
      port: null,
      checkingDate: moment().toISOString(),
      city: 'Город не указан',
      street: 'Улица не указана',
      housingStockNumber: 'Номер дома не указан',
      corpus: '',
      magistral: 'Не выбрано',
      ipV4: '',
      isConnected: isConnectedValue[0].value,
    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
      pipeNumber: Yup.number().required('Введите число от 0'),
      entryNumber: Yup.number().min(0, 'от 0').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
      diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение')
        .required('Введите число от 1'),
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
        diameter: values.diameter,
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: values.entryNumber,
          hubNumber: values.hubNumber || null,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral || 'Направление не выбрано',
        },
      };
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
  const [disable, setDisable] = useState(false);

  return (
    <div style={{ width: '968px'}}>
      <form id="editOdpuForm" onSubmit={handleSubmit} style={{ paddingBottom: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>

        <Form.Item label="Серийный номер" style={{width:480}}>
          <InputTT
            name="serialNumber"
            placeholder="Укажите серийный номер..."
            type="text"
            onChange={handleChange}
            value={values.serialNumber}
            onBlur={handleBlur}
            disabled
          />
          <Alert name="serialNumber" />
        </Form.Item>

        <Form.Item label="Выберите тип прибора" style={{width:480}}>
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

        <Form.Item label="Выберите тип ресурса" style={{width:480}}>
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

        <Form.Item label="Выберите модель прибора" style={{width:480}}>
          <InputTT
            name="model"
            placeholder="Укажите модель..."
            type="text"
            onChange={handleChange}
            value={values.model}
            onBlur={handleBlur}
            disabled
          />
          <Alert name="model" />
        </Form.Item>

        <Form.Item label="Дата поверки" style={{width:480}}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date.toISOString());
            }}
            value={moment(values.lastCheckingDate)}
            disabled
          />
        </Form.Item>

        <Form.Item label="Дата следующей поверки" style={{width:480}}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="futureCheckingDate"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date.toISOString());
            }}
            value={moment(values.futureCheckingDate)}
            disabled
          />
        </Form.Item>

        <div style={{ padding: '32px 0' }}>
          <ButtonTT
            form="editOdpuForm"
            color="blue"
            style={{ marginRight: '16px' }}
            onClick={handleSubmit}
            type="submit"
            disabled
          >
            Далее
          </ButtonTT>
        </div>

      </form>
    </div>
  );
};

export default EmptyForm;
