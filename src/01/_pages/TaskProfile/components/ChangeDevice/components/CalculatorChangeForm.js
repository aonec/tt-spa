import React, { useContext, useEffect, useState } from 'react';
import { Form, Tabs } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  SelectTT, InputTT, DatePickerTT, ButtonTT, Header,
} from '../../../../../tt-components';
import { ChangeDeviceContext } from '../index';
import {
  housingMeteringDeviceTypes,
  isConnectedValue,
  magistrals,
  resources,
  items,
} from '../../../../../tt-components/localBases';
import { putOdpu, postOdpu, pushStage, putCalculator } from '../apiChangeDevice';

const { TabPane } = Tabs;

const CalculatorChangeForm = (props) => {
  const { disabled, taskId } = props;
  const [currentTabKey, setCurrentTabKey] = useState('1');
  // const { device, state, selected } = useContext(ChangeDeviceContext);
  const { state, selected } = useContext(ChangeDeviceContext);

  const device = {
    connection: {
      isConnected: true,
      ipV4: '192.168.1.10',
      port: 6547,
      deviceAddress: 9,
    },
    address: {
      id: 383,
      city: 'Нижнекамск',
      street: 'Чишмале',
      housingStockNumber: '10',
      corpus: null,
    },
    id: 1437,
    transactionType: null,
    model: 'ТВ-7',
    serialNumber: '13011204',
    lastCommercialAccountingDate: '2017-12-09T23:00:00',
    futureCommercialAccountingDate: '2017-12-09T23:00:00',
    lastCheckingDate: '2018-06-13T23:00:00',
    futureCheckingDate: '2019-06-02T23:00:00',
    closingDate: null,
  };

  const {
    connection, address, id,
    transactionType,
    closingDate,
  } = device;

  const {
    isConnected,
    ipV4,
    port,
    deviceAddress,
  } = connection;

  const getCurrentInfoId = _.find(items, { label: selected.model });
  const currentInfoId = getCurrentInfoId !== undefined ? getCurrentInfoId.value : null;

  function isDisabled(value) {
    return disabled.includes(value);
  }

  const {
    serialNumber,
    model,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
  } = selected;

  useEffect(() => {
    setFieldValue('infoId', currentInfoId);
    setFieldValue('serialNumber', serialNumber);
    setFieldValue('ipV4', ipV4);
    setFieldValue('port', port);
    setFieldValue('deviceAddress', deviceAddress);
    setFieldValue('lastCommercialAccountingDate', lastCommercialAccountingDate === null ? null : moment(lastCommercialAccountingDate));
    setFieldValue('futureCommercialAccountingDate', futureCommercialAccountingDate === null ? null : moment(futureCommercialAccountingDate));
    setFieldValue('lastCheckingDate', lastCheckingDate === null ? null : moment(lastCheckingDate));
    setFieldValue('futureCheckingDate', futureCheckingDate === null ? null : moment(futureCheckingDate));
  }, [selected]);

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
      infoId: currentInfoId,
      model,
      serialNumber,
      lastCheckingDate: lastCheckingDate === null ? null : moment(lastCheckingDate),
      futureCheckingDate: futureCheckingDate === null ? null : moment(futureCheckingDate),
      lastCommercialAccountingDate: lastCommercialAccountingDate === null ? null : moment(lastCommercialAccountingDate),
      futureCommercialAccountingDate: futureCommercialAccountingDate === null ? null : moment(futureCommercialAccountingDate),
      isConnected: isConnectedValue[0].value,
    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
      pipeNumber: Yup.number().required('Введите число от 0'),
      entryNumber: Yup.number().min(0, 'от 0').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
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
      };
      // putOdpu(id, PUT_EDIT_FORM);
      console.log('PUT_EDIT_FORM', PUT_EDIT_FORM);
      console.log('PUT_EDIT_FORM', JSON.stringify(PUT_EDIT_FORM));
      // console.log(values)
    },
  });

  const actionsList = [
    { value: 1, label: 'Замена прибора' },
  ];

  const executorsList = [
    { value: 1, label: 'Константинопольский К.К.' },
  ];

  const tabs = [
    {
      title: 'Шаг 1. Общие данные',
      key: '1',
    },
    {
      title: 'Шаг 2. Настройки соединения',
      key: '2',
    },
    {
      title: 'Шаг 3. Документы',
      key: '3',
    },
  ];

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

  const TabsComponent = (props) =>
    // const { currentTabKey, handleChangeTab } = props;
    (
      <Tabs activeKey={currentTabKey} onChange={handleChangeTab}>
        {tabs.map((currentTab) => {
          const { title, key } = currentTab;
          return (
            <TabPane tab={title} key={key} />
          );
        })}
      </Tabs>
    );
  function handleChangeTab(value) {
    console.log(currentTabKey);
    setCurrentTabKey(value);
  }

  function handleNextChangeTab() {
    console.log('handleNextChangeTab');
    setCurrentTabKey(String(Number(currentTabKey) + 1));
  }

  function handleEdit() {
    console.log('handleEdit');

    const PUT_EDIT_FORM = {
      serialNumber: values.serialNumber,
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      lastCommercialAccountingDate: values.lastCommercialAccountingDate,
      futureCommercialAccountingDate: values.futureCommercialAccountingDate,
      connection: {
        ipV4: values.ipV4,
        port: values.port,
        deviceAddress: values.deviceAddress,
      }
    };
    const form = {
      housingMeteringDeviceSwitch: {
        deviceId: device.id,
        newDeviceId: selected.id,
      },
      documentsIds: [123456],
    };
    console.log(PUT_EDIT_FORM);
    putCalculator(selected.id, PUT_EDIT_FORM).then((res) => {
      console.log('res', res);

      pushStage(taskId, form);
    });

    // postTask(form)
  }

  function handleAdd() {
    console.log('handleAdd');

    const POST_ODPU_FORM = {
      serialNumber: values.serialNumber,
      model: values.model,
      resource: values.resource,
      housingMeteringDeviceType: values.housingMeteringDeviceType,
      lastCheckingDate: values.lastCheckingDate.toISOString(),
      futureCheckingDate: values.futureCheckingDate.toISOString(),
      lastCommercialAccountingDate: values.lastCommercialAccountingDate.toISOString(),
      futureCommercialAccountingDate: values.futureCommercialAccountingDate.toISOString(),
      closingDate: moment().toISOString(),
    };

    postOdpu(POST_ODPU_FORM).then((res) => {
      console.log('res', res);
      const { id } = res;
      const form = {
        housingMeteringDeviceSwitch: {
          deviceId: device.id,
          newDeviceId: id,
        },
        documentsIds: [123456],
      };
      pushStage(taskId, form);
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
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignContent: 'baseline',
          maxWidth: '960px',
        }}
        >
          <Form.Item
            label="Выберите дальнейшее действие"
            style={{ width: 460 }}
          >
            <SelectTT
              options={actionsList}
              defaultValue={1}
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Исполнитель"
            style={{ width: 460 }}
          >
            <SelectTT
              options={executorsList}
              defaultValue={1}
              disabled
            />
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
            maxWidth: '960px',
            minHeight: '420px',
          }}
        >

          <Form.Item label="Серийный номер" style={{ width: 460 }}>
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

          <Form.Item label="Модель вычислителя" style={{ width: 460 }}>
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

          <Form.Item label="Дата Поверки" style={{ width: 460 }}>
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

          <Form.Item label="Дата Следующей поверки" style={{ width: 460 }}>
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

          <Form.Item label="Дата начала действия акта-допуска" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date);
              }}
              disabled={isDisabled('lastCommercialAccountingDate')}
              value={values.lastCommercialAccountingDate}
            />
          </Form.Item>

          <Form.Item label="Дата окончания действия акта-допуска" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date);
              }}
              disabled={isDisabled('futureCommercialAccountingDate')}
              value={values.futureCommercialAccountingDate}
              name="futureCommercialAccountingDate"
            />
          </Form.Item>

        </div>

        <div
          hidden={Number(currentTabKey) !== 2}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'baseline',
            maxWidth: '960px',
            // minHeight: '420px'
          }}

        >

          <Form.Item label="IP адрес вычислителя" style={{ width: 460 }}>
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

          <Form.Item label="Порт" style={{ width: 460 }}>
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

          <Form.Item label="Сетевой адрес устройства" style={{ width: 460 }}>
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
            maxWidth: '960px',
            // minHeight: '420px',
            alignContent: 'baseline',
          }}

        >
          <Header>Компонент в разработке</Header>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          maxWidth: '960px',
        }}
        >
          <Buttons />

        </div>
      </form>
    </div>
  );
};

export default CalculatorChangeForm;
