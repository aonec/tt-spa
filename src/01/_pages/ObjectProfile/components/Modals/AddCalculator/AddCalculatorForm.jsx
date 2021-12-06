import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Form, Switch } from 'antd';
import {
  ConnectionTakesTime,
  Title,
  ButtonTT,
  DatePickerTT,
  InputTT,
  SelectTT,
  StyledModalBody,
  StyledFooter,
} from '../../../../../tt-components';
import { items } from '../../../../../tt-components/localBases';
import TabsComponent from './addCalculatorTabs';
import { addCalculator } from './apiAddCalculator';
import { returnNullIfEmptyString } from '../../../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from '../../../../../utils/handleTabsBeforeFormSubmit';
import {
  defaultValidationSchema,
  emptyConnectionValidationSchema,
} from './validationSchemas';
import { isEmptyString } from '../../../../../utils/isEmptyString';
import { AddCalculatorContext } from './index';

const AddCalculatorForm = (props) => {
  const { housingStockId, handleCancel, setAddCalculator } = props;
  const [currentTabKey, setTab] = useState('1');
  const [validationSchema, setValidationSchema] = useState(Yup.object({}));
  const { setAlertVisible, setExistCalculator } = useContext(
    AddCalculatorContext
  );
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      serialNumber: '',
      lastCheckingDate: moment().toISOString(true),
      futureCheckingDate: moment().add(4, 'years').toISOString(true),
      lastCommercialAccountingDate: moment().toISOString(true),
      futureCommercialAccountingDate: moment().toISOString(true),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      housingStockId: Number(housingStockId),
      infoId: 1,
      isConnected: true,
    },
    validationSchema,
    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        lastCheckingDate: moment(values.lastCheckingDate).toISOString(true),
        futureCheckingDate: moment(values.futureCheckingDate).toISOString(true),
        lastCommercialAccountingDate: moment(
          values.lastCommercialAccountingDate
        ).toISOString(true),
        futureCommercialAccountingDate: moment(
          values.futureCommercialAccountingDate
        ).toISOString(true),
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
      // addCalculator(form);
      addCalculator(form).then(({ show, id }) => {
        if (show === true) {
          setAlertVisible(true);
          setExistCalculator(id);
        } else {
          setTimeout(setAddCalculator, 2000);
        }
      });
      // setTimeout(() => { setAddCalculator(false); }, 1000);
    },
  });

  useEffect(() => {
    setValidationSchema(defaultValidationSchema);
  }, []);

  function isEmptyConnection() {
    return (
      isEmptyString(values.deviceAddress) &&
      isEmptyString(values.port) &&
      isEmptyString(values.ipV4)
    );
  }

  useEffect(() => {

    if (values.isConnected === false) {
      if (isEmptyConnection() === true) {
        setFieldError('ipV4');
        setFieldError('port');
        setFieldError('deviceAddress');
        setValidationSchema(emptyConnectionValidationSchema);
      }
      if (isEmptyConnection() === false) {
        setValidationSchema(defaultValidationSchema);
      }
    }
  }, [values.deviceAddress, values.ipV4, values.port]);

  function onSwitchChange(checked) {
    setFieldValue('isConnected', checked);
    if (checked === true) {
      setValidationSchema(defaultValidationSchema);
    }
    if (checked === false) {
      if (isEmptyConnection() === true) {
        setValidationSchema(emptyConnectionValidationSchema);
        setFieldError('ipV4');
        setFieldError('port');
        setFieldError('deviceAddress');
      }
      if (isEmptyConnection() === false) {
        setValidationSchema(defaultValidationSchema);
      }
    }
  }

  const tabErrors = [
    {
      key: '1',
      value: ['serialNumber', 'infoId'],
    },
    {
      key: '2',
      value: ['ipV4', 'port', 'deviceAddress'],
    },
  ];

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  function handleChangeTab(value) {
    setTab(value);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );

    if (hasError === true) {
      setTab(errorTab);
    } else {
      handleSubmit();
    }
  };

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmitForm}>
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
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Form.Item
            label="Серийный номер устройства"
            style={{ width: '100%' }}
          >
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
              placeholder="Укажите дату"
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date.toISOString(true));
                setFieldValue(
                  'futureCheckingDate',
                  moment(date).add(3, 'years')
                );
              }}
              value={moment(values.lastCheckingDate)}
            />
          </Form.Item>

          <Form.Item label="Дата следующей поверки" style={{ width: '49%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              placeholder="Укажите дату"
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString(true));
              }}
              value={moment(values.futureCheckingDate)}
            />
          </Form.Item>

          <Form.Item
            label="Дата начала Акта действия допуска"
            style={{ width: '49%' }}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату"
              allowClear={false}
              onChange={(date) => {
                setFieldValue(
                  'lastCommercialAccountingDate',
                  date.toISOString(true)
                );
              }}
              value={moment(values.lastCommercialAccountingDate)}
            />
          </Form.Item>

          <Form.Item
            label="Дата окончания Акта действия допуска"
            style={{ width: '49%' }}
          >
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              placeholder="Укажите дату"
              allowClear={false}
              onChange={(date) => {
                setFieldValue(
                  'futureCommercialAccountingDate',
                  date.toISOString(true)
                );
              }}
              value={moment(values.futureCommercialAccountingDate)}
            />
          </Form.Item>
        </div>

        <div
          hidden={Number(currentTabKey) !== 2}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Switch
              style={{ width: '48px' }}
              onChange={onSwitchChange}
              checked={values.isConnected}
            />
            <span
              style={{
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
            {/*{isEmptyConnection() && !checked ? null : <Alert name="ipV4" />}*/}
            <Alert name="ipV4" />
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
            {/*{isEmptyConnection() && !checked ? null : <Alert name="port" />}*/}
            <Alert name="port" />
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
            {/*{isEmptyConnection() && !checked ? null : <Alert name="deviceAddress" /> }*/}
            <Alert name="deviceAddress" />
          </Form.Item>

          <ConnectionTakesTime />
        </div>

        <div
          hidden={Number(currentTabKey) !== 3}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
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

        <ButtonTT color="blue" type="submit" hidden={currentTabKey !== '3'} big>
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
