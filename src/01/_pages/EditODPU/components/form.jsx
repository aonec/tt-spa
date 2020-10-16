import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import $ from 'jquery';
import {
  DatePicker,
  Form, Input, Select,
} from 'antd';
import moment from 'moment';
import { onChangeDeviceFormValueByPath } from '../../../Redux/actions/actions';
import {
  types, resources, serviceLife, connection,
} from './CalculatorJSON';
import '../editodpu.scss';
import { ButtonTT } from '../../../tt-components/ButtonTT';
import axios from '../../../axios';

const FormEditODPU = (props) => {
  const { currentTabKey, device } = props;
  const { 1: deviceId } = useParams();

  const {
    serialNumber,
    checkingDate,
    lastCommercialAccountingDate,
    infoId,
    futureCheckingDate,
    closingDateTime,
    model,
    entryNumber,
    hubNumber,
    pipeNumber,
    magistral,
    // calculatorId,
  } = device;

  const saveButtonHandler = async () => {
    alert('Cейчас будем отправлять данные!');
    try {
      const res = await axios.put(`HousingMeteringDevices/${deviceId}`);
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

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur,
  } = useFormik({
    initialValues: {
      housingMeteringDeviceType: types[0].value,
      resource: resources[0].value,
      model: model || '',
      serialNumber: '',
      test: '',
      lastCommercialAccountingDate: moment().toISOString(),
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      // model: Yup.string().required('Введите модель прибора'),
      // test: Yup.string().required('Введите данные'),
      // closingDateTime: Yup.string().required('Введите данные'),
    }),
    onSubmit: async () => {
      // deregisterDevice(form);
      console.log('Submit');
    },
  });

  useEffect(() => {

  }, [props]);

  const visibleInputs = [
    ['housingMeteringDeviceType', 'resource', 'lastCommercialAccountingDate', 'futureCommercialAccountingDate', 'model', 'serialNumber'], ['connection', 'entryNumber', 'hubNumber', 'pipeNumber', 'magistral', 'calculatorId'], [],
  ];

  useEffect(() => {
    visibleInputs.map((item) => {
      console.log(item);
      item.map((someItem) => {
        console.log(someItem);
        $(`.${someItem}`).addClass('hide');
      });
    });

    visibleInputs[currentTabKey - 1].map((item) => {
      $(`.${item}`).removeClass('hide');
    });
  }, [props]);

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

        <Form.Item label="Выберите тип прибора" className="housingMeteringDeviceType">
          <Select
            height="60px"
            name="housingMeteringDeviceType"
            onChange={(event) => {
              values.housingMeteringDeviceType = event;
              // const value = event;
              // const path = ['housingMeteringDeviceType'];
              // dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={types}
            value={values.housingMeteringDeviceType}
          />
          <Alert name="closingDateTime" />
        </Form.Item>

        <Form.Item label="Выберите тип ресурса" className="resource">
          <Select
            name="resource"
            onChange={(event) => {
              values.resource = event;
              const value = event;
              const path = ['resource'];
              // dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={resources}
            value={values.resource}

          />
        </Form.Item>

        <Form.Item label="Выберите модель прибора" className="model">
          <Input
            name="model"
            type="text"
            onChange={handleChange}
            value={values.model || model}
            onBlur={handleBlur}
          />
          <Alert name="model" />
        </Form.Item>

        <Form.Item label="Серийный номер" className="serialNumber">
          <Input
            name="serialNumber"
            type="text"
            onChange={handleChange}
            value={values.serialNumber || serialNumber}
            onBlur={handleBlur}
          />
          <Alert name="serialNumber" />
        </Form.Item>



        <Form.Item label="Дата выпуска прибора" className="lastCommercialAccountingDate">
          <DatePicker
            name="lastCommercialAccountingDate"
            placeholder="Укажите дату..."
            format="DD.MM.YYYY"
            value = {moment(values.lastCommercialAccountingDate)}
            onChange = {(date, dateString) => {values.lastCommercialAccountingDate = dateString}}

            // onChange={(date) => { values.lastCommercialAccountingDate = 55 }}
            // value={moment(values.lastCommercialAccountingDate)}
            // value={moment(values.lastCommercialAccountingDate)}
          />
          <Alert name="lastCommercialAccountingDate" />
        </Form.Item>



        <Form.Item label="Дата ввода в эксплуатацию" className="lastCommercialAccountingDate">
          <DatePicker
            value={moment(futureCheckingDate)}
            placeholder="Укажите дату..."
            format="DD.MM.YYYY"
            onChange={(date) => {
              const path = ['lastCommercialAccountingDate'];
              const value = date.toISOString();

              // dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate" />
        </Form.Item>

        <Form.Item label="Срок эксплуатации по нормативу" className="futureCommercialAccountingDate">
          <Select

            name="futureCommercialAccountingDate"
            onChange={(event) => {
              const value = moment()
                .add(event, 'year')
                .toISOString();
              const path = ['futureCommercialAccountingDate'];
              // dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            name="futureCommercialAccountingDate"
            placeholder="Укажите оперид эксплуатации"
            options={serviceLife}
            defaultValue={serviceLife[0].value}
          />
          <Alert name="futureCommercialAccountingDate" />
        </Form.Item>

        <Form.Item label="Подключение к вычислителю" className="connection">
          <Select
            id="connection"
            name="connection"
            onChange={(event) => {
              values.connection = event;
              const value = event;
              const path = ['resource'];
              // dispatch(onChangeDeviceFormValueByPath(path, value));
            }}
            options={connection}
            value={values.connection}

          />
        </Form.Item>

        <Form.Item
          label="Выберите вычислитель, к которому подключен прибор"
          className="calculatorId"
        >
          <Input
            id="calculatorId"
            name="calculatorId"
            type="number"
            placeholder="Начните вводить ID прибора"
            // value={calculatorId}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['calculatorId'];
              // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
          <Alert name="calculatorId" />
        </Form.Item>

        <Form.Item label="Номер ввода" className="entryNumber">
          <Input
            id="entryNumber"
            type="number"
            placeholder="1"
            value={entryNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'entryNumber'];
              // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item label="Номер узла" className="hubNumber">
          <Input
            id="hubNumber"
            type="number"
            placeholder="1"
            value={hubNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'hubNumber'];
              // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        <Form.Item label="Номер трубы" className="pipeNumber">
          <Input
            id="pipeNumber"
            type="number"
            placeholder="1"
            value={pipeNumber}
            onChange={(event) => {
              const { value } = event.target;
              const path = ['pipe', 'pipeNumber'];
              // dispatch(onChangeDeviceFormValueByPath(path, Number(value)));
            }}
          />
        </Form.Item>

        {/* <Tab1 /> */}
        {/* <Tab2 /> */}

        <div>
          <ButtonTT
            color="red"
          >
            TEST
          </ButtonTT>
          <ButtonTT
            type="submit"
            color="blue"
            form="formikForm"
          >
            Снять прибор с учета
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
    </>
  );
};

export default FormEditODPU;
