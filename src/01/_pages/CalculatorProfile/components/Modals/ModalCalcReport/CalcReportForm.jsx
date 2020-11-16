import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { DatePicker, Form, Modal, Radio } from 'antd';
import TabsComponent from './components/Tabs';
import {
  SelectTT, InputTT, ButtonTT, Header,
} from '../../../../../tt-components';
import { convertDateOnly } from "../../../../../_api/utils/convertDate";
import { DeviceContext } from "../../../CalculatorProfile";



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
const { RangePicker } = DatePicker;
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
  const { report, setReport} = useContext(DeviceContext);
  const Buttons = () => {
    console.log("Buttons");
    return (
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <ButtonTT
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>

        <ButtonTT
          style={{ marginLeft: '16px' }}
          type="submit"
          color="blue"
          form="reportForm"
        >
          Выгрузить
        </ButtonTT></div>
      )

  }
  const { serialNumber, model, address } = device;
  const { street, housingStockNumber, corpus } = address;
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      details: 'daily',
      period: 'year',
      begin: moment(),
      end: moment()

    },
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      downloadReport();

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


  const downloadReport = () => {
    console.log("downloadReport");
    // console.log("entryNumberRes.current = ", entryNumberRes.current)
    // if (entryNumberRes.current) {
    //   console.log('entryNumberRes', entryNumberRes.current);
    //   const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
    //     detail.current
    //   }&resourcetype=${type}&entrynumber=${
    //     entryNumberRes.current
    //   }&from=${convertDateOnly(begin)}T00:00:00Z&to=${convertDateOnly(
    //     end,
    //   )}T00:00:00Z`;
    //
    //   const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
    //   const template2 = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1510&reporttype=daily&resourcetype=Heat&entrynumber=1&from=2020-09-01T00:00:00Z&to=2020-09-15T00:00:00Z';
    //   // window.location.assign(link);
    //   console.log(link)
    //   // window.open(link);
    // } else {
    //   alert('Выберите узел!');
    // }
  };

  const handleButton = () => {
    console.log('handleButton');
    console.log('device', device);
  };

  const handleCancel = () => {
   setReport(false)
  };

  if (device) {
    return (
      <>
        <Form id="reportForm" onSubmit={handleSubmit}>
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
                name="period"
                value={values.period}
                buttonStyle="solid"
                onChange={handleChange}
              >
                <Radio.Button value="year">Год</Radio.Button>
                <Radio.Button value="month">Месяц</Radio.Button>
                <Radio.Button value="day">День</Radio.Button>
                <Radio.Button value="custom">Свой период</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Детализация отчета" style={{ width: '48%' }}>
              <Radio.Group
                name="details"
                onChange={handleChange}
                value={values.details}
                buttonStyle="solid"
              >
                <Radio.Button value="daily">Суточная</Radio.Button>
                <Radio.Button value="hourly">Часовая</Radio.Button>
              </Radio.Group>
            </Form.Item>

          </div>

          <Form.Item label="Период" >
          <RangePicker
            format={'DD.MM.YYYY'}
            allowClear={false}
            placeholder={['Дата Начала', 'Дата окончания']}
            onChange={(value)=>{
              console.log(value[0]);
              console.log(value[1]);
            setFieldValue('begin', value[0]);
            setFieldValue('end', value[1]);
            }}
            value={[values.begin, values.end]}
            style={{width: '100%', height: '50px'}}
          />
          </Form.Item>


          <ButtonTT
            style={{ marginLeft: '16px' }}
            color="red"
            onClick={handleButton}
          >
            TEST
          </ButtonTT>

          <Buttons />
        </Form>
      </>
    );
  }
  return (
    <div>Загрузка данных</div>
  );
};

export default CalcReportForm;
