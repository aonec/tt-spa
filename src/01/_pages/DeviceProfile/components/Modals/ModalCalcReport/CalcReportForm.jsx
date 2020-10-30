import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Modal, Radio } from 'antd';
import {
  SelectTT, InputTT, ButtonTT, DatePickerTT, Header, Title,
} from '../../../../../tt-components';
import axios from '../../../../../axios';
import TabsComponent from './components/Tabs';
import SelectDate from './components/SelectDate';
import Period from './components/Period';
import Details from './components/Details';

// async function deregisterDevice(device) {
//   try {
//     alert('Отправляется запрос на снятие прибора с учета !');
//     const res = await axios.post('MeteringDevices/close', device);
//     alert('Вычислитель успешно снят с учета !');
//     return res;
//   } catch (error) {
//     console.log(error);
//     alert('Что-то пошло не так: попробуйте еще раз');
//     throw new Error(error);
//   }
// }

const selectTemplate = [
  {
    value: 1,
    label: 'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
  },
  {
    value: 2,
    label: 'Узел 2: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
  },
];

const CalcReportForm = ({ device }) => {
  const { serialNumber, model, address } = device;
  const { street, housingStockNumber, corpus } = address;
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      details: 'daily',
      period: 'year',

    },
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      alert(JSON.stringify(values));
      // const form = {
      //   deviceId: values.deviceId,
      //   documentsIds: values.documentsIds,
      //   closingDateTime: values.closingDateTime,
      // };
      // console.log(form);
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

  const handleButton = () => {
    console.log('handleButton');
    console.log('device', device);
  };

  if (device) {
    return (
      <>
        <form id="formikForm" onSubmit={handleSubmit}>
          <Header>
            Выгрузка отчета о общедомовом потреблении
          </Header>

          <TabsComponent />

          <Form.Item label="Название отчета">
            <InputTT
              value={`${model}_${street}_${housingStockNumber}_${corpus}.xls`}
              readonly
            />
          </Form.Item>

          <Form.Item label="Выбор узла">
            <SelectTT
              options={selectTemplate}
            />
          </Form.Item>

          <div style={{ display: 'flex' }}>
            <Form.Item label="Период выгрузки" style={{ width: '48%' }}>
              <Radio.Group
                name={'period'}
                defaultValue="year" buttonStyle="solid"
                onChange={handleChange}
              >
                <Radio.Button value="year">Год</Radio.Button>
                <Radio.Button value="month">Месяц</Radio.Button>
                <Radio.Button value="day">День</Radio.Button>
                <Radio.Button value="custom">Свой период</Radio.Button>
              </Radio.Group>
            </Form.Item>

          </div>

          {/* <Form.Item label="Дата снятия прибора с учета"> */}
          {/*  <DatePickerTT */}
          {/*    name="closingDateTime" */}
          {/*    format="DD.MM.YYYY" */}
          {/*    allowClear={false} */}
          {/*    onBlur={handleBlur} */}
          {/*    onChange={(date) => { */}
          {/*      setFieldValue('closingDateTime', date.toISOString()); */}
          {/*    }} */}
          {/*    value={moment(values.closingDateTime)} */}
          {/*  /> */}
          {/*  <Alert name="closingDateTime" /> */}
          {/* </Form.Item> */}

          <SelectDate />
          <ButtonTT
            style={{ marginLeft: '16px' }}
            color="red"
            onClick={handleButton}
          >
            TEST
          </ButtonTT>
        </form>
      </>
    );
  }
  return (
    <div>Загрузка данных</div>
  );
};

export default CalcReportForm;
