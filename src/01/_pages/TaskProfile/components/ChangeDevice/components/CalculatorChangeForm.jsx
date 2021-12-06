import React, { useContext, useEffect, useState } from 'react';
import { Form, Tabs } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  SelectTT,
  InputTT,
  DatePickerTT,
  ButtonTT,
  Header,
} from '../../../../../tt-components';
import { ChangeDeviceContext } from '../index';
import {
  isConnectedValue,
  items,
} from '../../../../../tt-components/localBases';
import {
  putOdpu,
  pushStage,
  putCalculator,
  createCalculator,
  deregisterDevice,
} from '../apiChangeDevice';
import {
  tabs,
  actionsList,
  executorsList,
  calculatorChangeValidationSchema,
} from './localBase';
import { isDateEmpty } from './utils';

const { TabPane } = Tabs;

const CalculatorChangeForm = () => {
  const [currentTabKey, setCurrentTabKey] = useState('1');
  const {
    state,
    device,
    selected,
    disabled,
    taskId,
    perpetratorName,
  } = useContext(ChangeDeviceContext);
  const {
    isConnected,
    connection: { ipV4, port, deviceAddress },
  } = device;

  const getCurrentInfoId = _.find(items, { label: selected.model });
  const currentInfoId =
    getCurrentInfoId !== undefined ? getCurrentInfoId.value : null;

  const {
    serialNumber,
    model,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
  } = selected;

  function isDisabled(value) {
    return disabled.includes(value);
  }

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      infoId: currentInfoId,
      model,
      serialNumber,
      lastCheckingDate: isDateEmpty(lastCheckingDate),
      futureCheckingDate: isDateEmpty(futureCheckingDate),
      isConnected,
      deviceAddress,
    },
    validationSchema: Yup.object(calculatorChangeValidationSchema),
    onSubmit: () => {},
  });

  useEffect(() => {
    setValues({
      ...values,
      infoId: currentInfoId,
      serialNumber,
      ipV4,
      port,
      deviceAddress,
      lastCheckingDate: isDateEmpty(lastCheckingDate),
      futureCheckingDate: isDateEmpty(futureCheckingDate),
    });
  }, [selected]);

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  const TabsComponent = (props) => (
    // const { currentTabKey, handleChangeTab } = props;
    <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
      {tabs.map((currentTab) => {
        const { title, key } = currentTab;
        return <TabPane tab={title} key={key} />;
      })}
    </Tabs>
  );

  function handleChangeTab(value) {
    setCurrentTabKey(value);
  }

  function handleNextChangeTab() {
    setCurrentTabKey(String(Number(currentTabKey) + 1));
  }

  function handleEdit() {
    const PUT_EDIT_FORM = {
      serialNumber: values.serialNumber,
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      connection: {
        ipV4: values.ipV4,
        port: values.port,
        deviceAddress: values.deviceAddress,
      },
    };

    const form = {
      calculatorSwitch: {
        deviceId: device.id,
        newDeviceId: selected.id,
      },
      documentsIds: [123456],
    };

    putCalculator(selected.id, PUT_EDIT_FORM).then((res) => {});
  }
  function randomInteger(min, max) {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function handleAdd() {
    const POST_CALCULATOR_FORM = {
      serialNumber: values.serialNumber,
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      infoId: values.infoId,
      housingStockId: device.address.id,
      connection: {
        ipV4: '0.0.0.0',
        port: randomInteger(256, 999),
        deviceAddress: randomInteger(256, 999),
      },
    };

    createCalculator(POST_CALCULATOR_FORM).then((res) => {
      const deregisterForm = {
        deviceId: res.id,
        documentsIds: [123456],
        closingDateTime: moment().toISOString(true),
      };
      deregisterDevice(deregisterForm).then((result) => {
        const form = {
          calculatorSwitch: {
            deviceId: device.id,
            newDeviceId: result.id,
          },
          documentsIds: [123456],
        };
        pushStage(taskId, form);
      });
    });
  }

  function Buttons() {
    if (state === 'empty') {
      return (
        <ButtonTT color="blue" disabled>
          Далее
        </ButtonTT>
      );
    }

    if (state === 'edit') {
      return (
        <>
          {currentTabKey !== '3' ? (
            <ButtonTT color="blue" type="button" onClick={handleNextChangeTab}>
              Далее
            </ButtonTT>
          ) : (
            <ButtonTT color="blue" type="button" onClick={handleEdit}>
              Завершить этап
            </ButtonTT>
          )}
        </>
      );
    }

    if (state === 'add') {
      return (
        <>
          {currentTabKey !== '3' ? (
            <ButtonTT color="blue" type="button" onClick={handleNextChangeTab}>
              Далее
            </ButtonTT>
          ) : (
            <ButtonTT color="blue" type="button" onClick={handleAdd}>
              Завершить этап
            </ButtonTT>
          )}
        </>
      );
    }
  }

  return (
    <div>
      <form>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'baseline',
          }}
        >
          <Form.Item
            label="Выберите дальнейшее действие"
            style={{ width: '49%' }}
          >
            <SelectTT options={actionsList} defaultValue={1} disabled />
          </Form.Item>

          <Form.Item label="Исполнитель" style={{ width: '49%' }}>
            <InputTT value={perpetratorName || 'Исполнитель'} disabled />
          </Form.Item>
        </div>

        <TabsComponent />

        <div
          hidden={Number(currentTabKey) !== 1}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'baseline',
            minHeight: '220px',
          }}
        >
          <Form.Item label="Серийный номер" style={{ width: '49%' }}>
            <InputTT
              name="serialNumber"
              placeholder="Укажите серийный номер..."
              type="text"
              onChange={handleChange}
              value={values.serialNumber}
              onBlur={handleBlur}
              disabled={isDisabled('serialNumber')}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Модель вычислителя" style={{ width: '49%' }}>
            <SelectTT
              name="infoId"
              onChange={(event) => {
                setFieldValue('infoId', event);
              }}
              options={items}
              value={values.infoId}
              disabled={isDisabled('infoId')}
            />
            <Alert name="infoId" />
          </Form.Item>

          <Form.Item label="Дата Поверки" style={{ width: '49%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date);
              }}
              value={values.lastCheckingDate}
              disabled={isDisabled('lastCheckingDate')}
            />
            <Alert name="lastCheckingDate" />
          </Form.Item>

          <Form.Item label="Дата Следующей поверки" style={{ width: '49%' }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date);
              }}
              value={values.futureCheckingDate}
              name="futureCheckingDate"
              disabled={isDisabled('futureCheckingDate')}
            />
            <Alert name="futureCheckingDate" />
          </Form.Item>

          {/* <Form.Item label="Дата начала действия акта-допуска" style={{ width: '49%' }}> */}
          {/*  <DatePickerTT */}
          {/*    format="DD.MM.YYYY" */}
          {/*    name="lastCommercialAccountingDate" */}
          {/*    placeholder="Укажите дату..." */}
          {/*    onChange={(date) => { */}
          {/*      setFieldValue('lastCommercialAccountingDate', date); */}
          {/*    }} */}
          {/*    disabled={isDisabled('lastCommercialAccountingDate')} */}
          {/*    value={values.lastCommercialAccountingDate} */}
          {/*  /> */}
          {/* </Form.Item> */}

          {/* <Form.Item label="Дата окончания действия акта-допуска" style={{ width: '49%' }}> */}
          {/*  <DatePickerTT */}
          {/*    format="DD.MM.YYYY" */}
          {/*    placeholder="Укажите дату..." */}
          {/*    onChange={(date) => { */}
          {/*      setFieldValue('futureCommercialAccountingDate', date); */}
          {/*    }} */}
          {/*    disabled={isDisabled('futureCommercialAccountingDate')} */}
          {/*    value={values.futureCommercialAccountingDate} */}
          {/*    name="futureCommercialAccountingDate" */}
          {/*  /> */}
          {/* </Form.Item> */}
        </div>

        <div
          hidden={Number(currentTabKey) !== 2}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'baseline',
            // minHeight: '420px'
          }}
        >
          <Form.Item label="IP адрес вычислителя" style={{ width: '49%' }}>
            <InputTT
              name="ipV4"
              placeholder="Номер ввода"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ipV4}
              disabled={isDisabled('ipV4')}
            />
            <Alert name="ipV4" />
          </Form.Item>

          <Form.Item label="Порт" style={{ width: '49%' }}>
            <InputTT
              name="port"
              type="number"
              placeholder="Порт"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.port}
              disabled={isDisabled('port')}
            />
            <Alert name="port" />
          </Form.Item>

          <Form.Item label="Сетевой адрес устройства" style={{ width: '49%' }}>
            <InputTT
              name="deviceAddress"
              type="number"
              placeholder="Сетевой адрес устройства"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.deviceAddress}
              disabled={isDisabled('deviceAddress')}
            />
            <Alert name="deviceAddress" />
          </Form.Item>
        </div>

        <div
          hidden={Number(currentTabKey) !== 3}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // minHeight: '220px'
            alignContent: 'baseline',
          }}
        >
          <Header>Компонент в разработке</Header>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          <Buttons />
        </div>
      </form>
    </div>
  );
};

export default CalculatorChangeForm;
