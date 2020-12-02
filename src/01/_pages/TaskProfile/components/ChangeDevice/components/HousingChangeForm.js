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
} from '../../../../../tt-components/localBases';
import { putOdpu, postOdpu, pushStage } from '../apiChangeDevice';

const { TabPane } = Tabs;

const HousingChangeForm = () => {
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

  const {
    device, state, selected, disabled, taskId,
  } = useContext(ChangeDeviceContext);
  const [currentTabKey, setCurrentTabKey] = useState('1');
  const { resource, housingMeteringDeviceType, hubConnection } = device;

  const {
    hub,
    calculatorConnection,
    calculatorId,
    calculatorModel,
    calculatorSerialNumber,
  } = hubConnection;

  const {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = hub;

  const {
    serialNumber,
    model,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
  } = selected;

  useEffect(() => {
    setFieldValue('serialNumber', serialNumber);
    setFieldValue('model', model);
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
      housingMeteringDeviceType,
      resource,
      model,
      serialNumber,
      lastCheckingDate: lastCheckingDate === null ? null : moment(lastCheckingDate),
      futureCheckingDate: futureCheckingDate === null ? null : moment(futureCheckingDate),
      lastCommercialAccountingDate: lastCommercialAccountingDate === null ? null : moment(lastCommercialAccountingDate),
      futureCommercialAccountingDate: futureCommercialAccountingDate === null ? null : moment(futureCommercialAccountingDate),
      entryNumber,
      hubNumber,
      pipeNumber: pipeNumber == null ? 0 : pipeNumber,
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
      console.log('DONE!');
    },
  });

  function isDisabled(value) {
    return disabled.includes(value);
  }

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

  const TabsComponent = () => (
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
    setCurrentTabKey(value);
  }

  function handleNextChangeTab() {
    setCurrentTabKey(String(Number(currentTabKey) + 1));
  }

  function handleEdit() {
    const putDeviceForm = {
      serialNumber: values.serialNumber,
      checkingDate: values.checkingDate,
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      lastCommercialAccountingDate: values.lastCommercialAccountingDate,
      futureCommercialAccountingDate: values.futureCommercialAccountingDate,
      housingMeteringDeviceType: values.housingMeteringDeviceType,
      resource: values.resource,
      model: values.model,
    };
    const form = {
      housingMeteringDeviceSwitch: {
        deviceId: device.id,
        newDeviceId: selected.id,
      },
      documentsIds: [123456],
    };

    putOdpu(selected.id, putDeviceForm).then((res) => {
      console.log('res', res);
      pushStage(taskId, form);
    });
  }

  function handleAdd() {
    const postOdpuForm = {
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

    postOdpu(postOdpuForm).then((res) => {
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

          <Form.Item label="Выберите тип прибора" style={{ width: 460 }}>
            <SelectTT
              name="housingMeteringDeviceType"
              onChange={(event) => {
                setFieldValue('housingMeteringDeviceType', event);
              }}
              options={housingMeteringDeviceTypes}
              value={values.housingMeteringDeviceType}
              disabled={isDisabled('housingMeteringDeviceType')}
            />
            <Alert name="housingMeteringDeviceType" />
          </Form.Item>

          <Form.Item label="Выберите тип ресурса" style={{ width: 460 }}>
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              value={values.resource}
              disabled={isDisabled('resource')}
            />
          </Form.Item>

          <Form.Item label="Выберите модель прибора" style={{ width: 460 }}>
            <InputTT
              name="model"
              placeholder="Укажите модель..."
              type="text"
              onChange={handleChange}
              value={values.model}
              onBlur={handleBlur}
              disabled={isDisabled('model')}
            />
            <Alert name="model" />
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
          <Form.Item label="Подключение к вычислителю" style={{ width: 460 }}>
            <SelectTT
              name="isConnected"
              onChange={(item) => {
                setFieldValue('isConnected', item);
              }}
              placeholder="Подключение к вычислителю"
              options={isConnectedValue}
              value={values.isConnected}
              disabled={isDisabled('isConnected')}
            />
          </Form.Item>

          <Form.Item
            label="Выберите вычислитель, к которому подключен прибор"
            style={{ width: 460 }}
          >
            <SelectTT
              name="calculatorId"
              placeholder="Начните вводить серийный номер или IP адрес прибора"
              onChange={(value) => { setFieldValue('calculatorId', value); }}
              defaultValue={`${calculatorModel} (${calculatorSerialNumber})`}
              // options={calculators}
              // value={values.calculatorId}
              disabled={isDisabled('calculatorId')}
            />
            <Alert name="calculatorId" />
          </Form.Item>

          <Form.Item label="Номер ввода" style={{ width: 460 }}>
            <InputTT
              name="entryNumber"
              type="number"
              placeholder="Номер ввода"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.entryNumber}
              disabled={isDisabled('entryNumber')}
            />
            <Alert name="entryNumber" />
          </Form.Item>

          <Form.Item label="Номер узла" style={{ width: 460 }}>
            <InputTT
              name="hubNumber"
              type="number"
              placeholder="Номер узла"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hubNumber}
              disabled={isDisabled('hubNumber')}
            />
            <Alert name="hubNumber" />
          </Form.Item>

          <Form.Item label="Номер трубы" style={{ width: 460 }}>
            <InputTT
              name="pipeNumber"
              type="number"
              placeholder="Номер трубы"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.pipeNumber}
              disabled={isDisabled('pipeNumber')}
            />
            <Alert name="pipeNumber" />
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

export default HousingChangeForm;
