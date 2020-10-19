import React, { useEffect, useState } from 'react';
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
import { button } from '../../../r_comp';

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
    type,
    resource,
    magistral,
    // calculatorId,
  } = device;

  const [forceRender, setForceRender] = useState();
  console.log(device);

  function randomInteger(min, max){
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

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

  console.log('checkingDate', checkingDate);

  const {
    handleSubmit, handleChange, values, touched, errors, handleBlur,
  } = useFormik({
    initialValues: {
      // _.filter(types, {value: 'TemperatureSensor'})[0]
      // housingMeteringDeviceType: types[0].value,
      housingMeteringDeviceType: _.filter(types, { value: type })[0].value,
      resource: _.filter(resources, { value: resource })[0].value,
      model: model || 'Модель не указана',
      serialNumber: serialNumber || 'Серийный номер не указан',
      lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      test: '',

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
    console.log('type', type);
  }, [props]);

  const VisibleItems = currentTabKey;

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
  const buttonHandler = () => {
    console.log('buttonHandler');
  };
  return (
    <>
      <form id="formikForm" onSubmit={handleSubmit}>
        <test onClick={buttonHandler}>GETINFO</test>
        <div hidden={!(Number(currentTabKey) === 1)}>
          <Form.Item label="Выберите тип прибора">
            <Select
              name="housingMeteringDeviceType"
              onChange={(event) => {
                values.housingMeteringDeviceType = event;
                setForceRender(randomInteger(1, 255));
              }}
              options={types}
              value={values.housingMeteringDeviceType}
            />
            <Alert name="closingDateTime"/>
          </Form.Item>

          <Form.Item label="Выберите тип ресурса">
            <Select
              name="resource"
              onChange={(event) => {
                values.resource = event;
                setForceRender(randomInteger(1, 255));
              }}
              options={resources}
              value={values.resource}

            />
          </Form.Item>

          <Form.Item label="Выберите модель прибора">
            <Input
              name="model"
              type="text"
              onChange={handleChange}
              value={values.model}
              onBlur={handleBlur}
            />
            <Alert name="model"/>
          </Form.Item>

          <Form.Item label="Серийный номер">
            <Input
              name="serialNumber"
              type="text"
              onChange={handleChange}
              value={values.serialNumber}
              onBlur={handleBlur}
            />
            <Alert name="serialNumber"/>
          </Form.Item>

          <Form.Item label="Дата выпуска прибора">
            <DatePicker
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              format="DD.MM.YYYY"
              value={moment(values.lastCommercialAccountingDate)}
              onChange={(date) => {
                values.lastCommercialAccountingDate = date;
                setForceRender(randomInteger(1, 255));
              }}
            />
            <Alert name="lastCommercialAccountingDate"/>
          </Form.Item>

          <Form.Item label="Дата ввода в эксплуатацию">
            <DatePicker
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              format="DD.MM.YYYY"
              value={moment(values.futureCheckingDate)}
              onChange={(date) => {
                values.futureCheckingDate = date;
                setForceRender(randomInteger(1, 255));
              }}

            />
            <Alert name="futureCheckingDate"/>
          </Form.Item>

          <Form.Item label="Срок эксплуатации по нормативу">
            <Select
              name="futureCommercialAccountingDate"
              placeholder="Укажите оперид эксплуатации"
              onChange={(event) => {
                const value = moment()
                  .add(event, 'year')
                  .toISOString();
                console.log(values);
              }}
              options={serviceLife}
              defaultValue={serviceLife[0].value}
            />
            <Alert name="futureCommercialAccountingDate"/>
          </Form.Item>
        </div>

        <div hidden={!(Number(currentTabKey) === 2)}>
          <Form.Item label="Подключение к вычислителю">
            <Select
              id="connection"
              name="connection"
              onChange={(event) => {
                values.connection = event;
                setForceRender(randomInteger(1, 255));
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
                setForceRender(randomInteger(1, 255));
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
                setForceRender(randomInteger(1, 255));
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
                setForceRender(randomInteger(1, 255));
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
                setForceRender(randomInteger(1, 255));
              }}
            />
          </Form.Item>
        </div>

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
