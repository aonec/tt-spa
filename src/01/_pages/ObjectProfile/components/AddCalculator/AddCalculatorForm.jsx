import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik, Field, getIn } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Switch } from 'antd';
import {
  Title,
  ButtonTT,
  DatePickerTT, InputTT, SelectTT, Wrap, StyledModalBody, StyledFooter,
} from '../../../../tt-components';
import { ipv4RegExp, items } from '../../../../tt-components/localBases';
import TabsComponent from './addCalculatorTabs';
import { addCalculator } from './apiAddCalculator';
import { returnNullIfEmptyString } from '../../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from "../../../../utils/handleTabsBeforeFormSubmit";

const AddCalculatorForm = (props) => {
  const { objid, handleCancel, setAddCalculator } = props;
  const [currentTabKey, setTab] = useState('1');
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setErrors, setFieldError,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      lastCheckingDate: moment().toISOString(),
      futureCheckingDate: moment().add(3, 'years').toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      futureCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      housingStockId: Number(objid),
      infoId: 1,
      isConnected: true,
      checked: true,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        documentsIds: values.documentsIds,
        isConnected: values.isConnected,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: returnNullIfEmptyString(values.deviceAddress),
          port: returnNullIfEmptyString(values.port),
        },
        housingStockId: values.housingStockId,
        infoId: values.infoId,
      };
      console.log('form', form);
      console.log(JSON.stringify(form));
      addCalculator(form);
      setTimeout(() => { setAddCalculator(false); }, 1000);
    },
  });

  useEffect(() => {
    setValidationSchema(defaultValidationSchema);
  }, []);

  const defaultValidationSchema = Yup.object({
    serialNumber: Yup.string().required('Введите серийный номер'),
    ipV4: Yup.string().matches(ipv4RegExp, 'Укажите в формате X.X.X.X').required('Введите IP-адрес устройства'),
    deviceAddress: Yup.number().nullable().required('Введите сетевой адрес устройства'),
    port: Yup.number().nullable().required('Введите порт устройства'),
  });

  const emptyValidationSchema = Yup.object({
    serialNumber: Yup.string().required('Введите серийный номер'),
  });

  function isEmptyValue(item) {
    return item === null || item === '';
  }

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function isEmpty() {
    return isEmptyValue(values.deviceAddress)
      && isEmptyValue(values.port)
      && isEmptyValue(values.ipV4);
  }

  function onSwitchChange(checked) {
    setFieldValue('checked', checked);
  }

  const tabErrors = [
    {
      key: '1',
      value: ['serialNumber'],
    },
    {
      key: '2',
      value: ['ipV4', 'port', 'deviceAddress'],
    },
  ];


  function handleSubmitForm() {
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(tabErrors, errors);
    if (hasError === true) {
      setTab(errorTab);
    }
  }


  useEffect(() => {
    console.log('Правда, что все строки пустые:?', isEmpty());

    setFieldValue('isConnected', values.checked);
    if (values.checked === true) {
      setValidationSchema(defaultValidationSchema);
    }
    if (values.checked === false && isEmpty()) {
      setValidationSchema(emptyValidationSchema);
    }
    if (values.checked === false && !isEmpty()) {
      setValidationSchema(defaultValidationSchema);
    }
  }, [values]);

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

  function handleChangeTab(value) {
    setTab(value);
  }

  return (
    <form id="formikForm" onSubmit={handleSubmit}>
      <StyledModalBody>
        <Title size="middle" color="black">
          Добавление нового вычислителя
        </Title>
        {/* <div>{JSON.stringify(errors)}</div> */}
        {/* <div>{values.checked ? null : 'настройки соединения не обязатальны, однако надо ввести либо все значения, либо оставить их пустыми'}</div> */}
        <TabsComponent
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />

        <div
          hidden={Number(currentTabKey) !== 1}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >

          <Form.Item label="Серийный номер устройства" style={{ width: '100%' }}>
            <InputTT
              name="serialNumber"
              value={values.serialNumber}
              placeholder="Серийный номер..."
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Тип вычислителя" style={{ width: '100%' }}>
            <SelectTT
              name="infoId"
              placeholder="Выберите тип устройства"
              options={items}
              value={values.infoId}
              onChange={(event) => {
                setFieldValue('infoId', Number(event));
              }}
            />
          </Form.Item>

          <Form.Item label="Дата поверки" style={{ width: '49%' }}>
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

          <Form.Item label="Дата следующей поверки" style={{ width: '49%' }}>
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

          <Form.Item label="Дата начала Акта действия допуска" style={{ width: '49%' }}>
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

          <Form.Item label="Дата окончания Акта действия допуска" style={{ width: '49%' }}>
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
        </div>

        <div
          hidden={Number(currentTabKey) !== 2}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >

          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
          >
            <Switch style={{ width: '48px' }} onChange={onSwitchChange} checked={values.checked} />
            <span style={{
              fontSize: '16px',
              lineHeight: '32px',
              marginLeft: '16px',
              color: 'rgba(39, 47, 90, 0.9)',
            }}
            >
              Опрашивать вычислитель
            </span>
          </div>

          <Form.Item label="IP адрес вычислителя" style={{ width: '49%' }}>
            <InputTT
              name="ipV4"
              type="text"
              value={values.ipV4}
              onBlur={handleBlur}
              placeholder="Введите IP адрес вычислителя"
              onChange={(event) => {
                setFieldValue('ipV4', event.target.value);
              }}
            />
            {(isEmpty() && !values.checked) ? null : <Alert name="ipV4" />}

          </Form.Item>

          <Form.Item label="Порт вычислителя" style={{ width: '49%' }}>
            <InputTT
              name="port"
              type="number"
              placeholder="Введите номер порта"
              value={values.port}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {(isEmpty() && !values.checked) ? null : <Alert name="port" />}

          </Form.Item>

          <Form.Item label="Адрес вычислителя" style={{ width: '100%' }}>
            <InputTT
              name="deviceAddress"
              type="number"
              placeholder="Введите сетевой адрес вычислителя"
              value={values.deviceAddress}
              onBlur={handleBlur}
              onChange={handleChange}
              // disabled={checked}
            />

            {(isEmpty() && !values.checked) ? null : <Alert name="deviceAddress" /> }

          </Form.Item>

          <Wrap
            style={{
              background: ' rgba(255, 140, 104, 0.16)',
              marginTop: '24px',
              padding: '24px',
              width: '100%',
            }}
          >
            Подключение к новому прибору может занять до 30 минут.
          </Wrap>
        </div>

        <div
          hidden={Number(currentTabKey) !== 3}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Title color="black">Компонент Документы в разработке</Title>
        </div>

      </StyledModalBody>
      <StyledFooter>
        <ButtonTT
          color="blue"
          onClick={handleNext}
          type="button"
          hidden={currentTabKey === '3'}
          big
        >
          Далее
        </ButtonTT>

        <ButtonTT
          color="blue"
          type="submit"
          for="formikForm"
          id="submit"
          onClick={handleSubmitForm}
          hidden={currentTabKey !== '3'}
          big
        >
          Добавить
        </ButtonTT>
        <ButtonTT
          color="white"
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: '16px' }}
        >
          Отмена
        </ButtonTT>
        {/* <ButtonTT type="button" onClick={findErrors}>findErrors</ButtonTT> */}
      </StyledFooter>
    </form>
  );
};

export default AddCalculatorForm;
