import React, { useContext } from 'react';
import { Form } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { InputTT } from '../../tt-components/InputTT';
import { onChangeFormValueByPath } from '../../Redux/actions/actions';
import { SelectTT } from '../../tt-components/Select';
import { items, serviceLife } from './components/CalculatorJSON';
import { DatePickerTT } from '../../tt-components/DatePicker';
import { EditCalculatorContext } from './index';
import { Wrap } from "../../tt-components/Wrap";

const EditCalculatorForm = () => {
  console.log('EditCalculatorForm');
  const { currentCalc, currentTabKey} = useContext(EditCalculatorContext);
  console.log('currentCalc', currentCalc);
  const {
    calculator,
    canBeEdited,
    closingDate,
    diameter,
    futureCheckingDate,
    futureCommercialAccountingDate,
    housingStockId,
    id,
    lastCheckingDate,
    checkingDate,
    lastCommercialAccountingDate,
    model,
    resource,
    serialNumber,
    type,
    connection,
    address
  } = currentCalc;

  const {isConnected, ipV4, port,deviceAddress} = connection;
  const {id: houseId} = address;

  // "connection": {
  //   "isConnected": true,
  //     "ipV4": "string",
  //     "port": 0,
  //     "deviceAddress": 0
  // },
  // "address": {
  //   "id": 0,
  //     "city": "string",
  //     "street": "string",
  //     "housingStockNumber": "string",
  //     "corpus": "string"
  // },


  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      serialNumber: serialNumber,
      checkingDate: checkingDate,
      futureCheckingDate: futureCheckingDate,
      lastCommercialAccountingDate: lastCommercialAccountingDate,
      ipV4: ipV4,
      deviceAddress: deviceAddress,
      port: port,
      futureCommercialAccountingDate: futureCommercialAccountingDate,
      housingStockId: houseId,
      infoId: 1,
    },
    validationSchema: Yup.object({
      serialNumber: Yup.string().required('Введите серийный номер'),
      ipV4: Yup.string().required('Введите IP-адрес устройства'),
      deviceAddress: Yup.string().required('Введите сетевой адрес устройства'),
      port: Yup.string().required('Введите порт устройства'),

    }),
    onSubmit: async () => {
      const form = {
        serialNumber,
        checkingDate: lastCommercialAccountingDate,
        futureCheckingDate,
        lastCommercialAccountingDate,
        connection: {
          ipV4,
          deviceAddress,
          port,
        },
        futureCommercialAccountingDate,
        housingStockId,
        infoId: Number(55),
      };
      // addCalculator(form);
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
    <Form>
    <div hidden={Number(currentTabKey) !== 1}>
      <Form.Item label="Серийный номер устройства">
        <InputTT
          name="serialNumber"
          value={values.serialNumber}
          placeholder="Серийный номер..."
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label="Тип вычислителя">
        <SelectTT
          placeholder="Выберите тип устройства"
          options={items}
          value={values.infoId.toString()}
          onChange={(event, target) => {
            setFieldValue('infoId', Number(target.value));
          }}
        />
      </Form.Item>

      <Form.Item label="Дата ввода в эксплуатацию">
        <DatePickerTT
          format="DD.MM.YYYY"
          name="lastCommercialAccountingDate"
          value={moment(values.lastCommercialAccountingDate)}
          placeholder="Укажите дату..."
          onChange={(date) => {
            setFieldValue('lastCommercialAccountingDate', date.toISOString());
          }}
        />
      </Form.Item>

      <Form.Item label="Дата Поверки">
        <DatePickerTT
          format="DD.MM.YYYY"
          name="checkingDate"
          placeholder="Укажите дату..."
          onChange={(date) => {
            setFieldValue('checkingDate', date.toISOString());
          }}
          value={moment(values.checkingDate)}
        />
      </Form.Item>

      <Form.Item label="Дата Следующей поверки">
        <DatePickerTT
          format="DD.MM.YYYY"
          placeholder="Укажите дату..."
          onChange={(date) => {
            setFieldValue('futureCheckingDate', date.toISOString());
          }}
          value={moment(values.futureCheckingDate)}
          name="futureCheckingDate"
        />
      </Form.Item>

      <Form.Item label="Дата Следующей поверки">
        <DatePickerTT
          format="DD.MM.YYYY"
          placeholder="Укажите дату..."
          onChange={(date) => {
            setFieldValue('futureCommercialAccountingDate', date.toISOString());
          }}
          value={moment(values.futureCommercialAccountingDate)}
          name="futureCommercialAccountingDate"
        />
      </Form.Item>
    </div>

  <div hidden={Number(currentTabKey) !== 2}>
    <Form.Item label="IP адрес вычислителя">
      <InputTT
        type="text"
        value={values.ipV4}
        placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
        onChange={(event) => {
          const path = ['connection', 'ipV4'];
          // dispatch(onChangeFormValueByPath(path, event.target.value));
        }}
      />
    </Form.Item>

    <Form.Item label="Порт">
      <InputTT
        type="number"
        required
        placeholder="Укажите порт устройства (например, 1234)"
        value={values.port}
        onChange={(event) => {
          const path = ['connection', 'port'];
          // dispatch(onChangeFormValueByPath(path, Number(event.target.value)));
        }}
      />
    </Form.Item>

    <Form.Item label="Адрес устройства">
      <InputTT
        type="number"
        required
        placeholder="Укажите адреса устройства"
        value={values.deviceAddress}
        onChange={(event) => {
          const path = ['connection', 'deviceAddress'];
          // dispatch(onChangeFormValueByPath(path, Number(event.target.value)));
        }}
      />
    </Form.Item>

    <Wrap
      style={{
        background: ' rgba(255, 140, 104, 0.16)',
        marginTop: '24px',
        padding: '24px',
      }}
    >
      Подключение к новому прибору может занять до 30 минут.
    </Wrap>
  </div>
  <div hidden={Number(currentTabKey) !== 3}>
  </div>
  <div hidden={Number(currentTabKey) !== 4}>
  </div>
    </Form>
  );
};

export default EditCalculatorForm;
