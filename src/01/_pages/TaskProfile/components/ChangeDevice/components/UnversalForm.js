import React, { useContext, useState } from 'react';
import { Form, Tabs } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import _ from 'lodash';
import Button, {
  SelectTT, InputTT, DatePickerTT, ButtonTT, Header,
} from '../../../../../tt-components';
import { ChangeDeviceContext } from '../index';
import {
  housingMeteringDeviceTypes,
  isConnectedValue,
  magistrals,
  resources,
} from '../../../../../tt-components/localBases';
import { putOdpu } from '../../../../EditODPU/components/apiEditOdpu';

const { TabPane } = Tabs;

const UniversalForm = (props) => {
  const { disabled } = props;
  const [currentTabKey, setCurrentTabKey] = useState('1');

  const { device, selected, state } = useContext(ChangeDeviceContext);
  const { resource, housingMeteringDeviceType, hubConnection } = device;

  const {
    hub, calculatorConnection,
    calculatorId,
    calculatorModel,
    calculatorSerialNumber,
  } = hubConnection;

  const {
    entryNumber, hubNumber, pipeNumber, magistral,
  } = hub;

  function isDisabled(value) {
    const res = disabled.find((item) => item == value);
    if (res) {
      return true;
    }

    return false;
  }

  // console.log(useContext(ChangeDeviceContext))
  // const {
  //   // address,
  //   // hubConnection,
  //   id,
  //   model,
  //   serialNumber,
  //   connection,
  //   lastCommercialAccountingDate,
  //   futureCommercialAccountingDate,
  //   lastCheckingDate,
  //   futureCheckingDate,
  //   diameter,
  //   // resource,
  //   // housingMeteringDeviceType,
  // } = selected;

  // const {
  //   hubConnection,
  //   resource,
  //   housingMeteringDeviceType,
  // } = device;
  //
  // console.log(device)

  // const {
  //   hub, calculatorId, calculatorSerialNumber, calculatorModel, calculatorConnection,
  // } = hubConnection;

  // const {
  //   isConnected, ipV4, port, deviceAddress,
  // } = calculatorConnection || {
  //   isConnected: false,
  //   ipV4: '',
  //   port: null,
  //   deviceAddress: null,
  // };

  // const {
  //   entryNumber, hubNumber, pipeNumber, magistral,
  // } = hub;

  // const {
  //   city, street, housingStockNumber, corpus,
  // } = address;

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
      // model: model || 'Модель не указана',
      // serialNumber: serialNumber || 'Серийный номер не указан',
      // lastCommercialAccountingDate: lastCommercialAccountingDate || moment().toISOString(),
      // futureCheckingDate: moment().toISOString(),
      // futureCommercialAccountingDate: futureCommercialAccountingDate || moment().toISOString(),
      entryNumber,
      hubNumber,
      pipeNumber: pipeNumber == null ? 0 : pipeNumber,
      // diameter: diameter,
      // port: port || 0,
      checkingDate: moment().toISOString(),
      // city: city || 'Город не указан',
      // street: street || 'Улица не указана',
      // housingStockNumber: housingStockNumber || 'Номер дома не указан',
      // corpus: corpus,
      // magistral: magistral || 'Не выбрано',
      // ipV4,
      isConnected: isConnectedValue[0].value,
    },
    validationSchema: Yup.object({
      resource: Yup.string().required('Введите данные'),
      pipeNumber: Yup.number().required('Введите число от 0'),
      entryNumber: Yup.number().min(0, 'от 0').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
      // diameter: Yup.number().min(1, 'от 1').max(150, 'до 150').typeError('Нельзя оставлять пустое значение').required('Введите число от 1'),
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
    console.log(currentTabKey)
    setCurrentTabKey(value);
  }

  function handleNextChangeTab() {
    console.log('handleNextChangeTab');
    setCurrentTabKey(String(Number(currentTabKey) + 1));
  }

  function Buttons() {
    const EmptyButtons = () => {
      console.log('EmptyButtons');
      return (
        <ButtonTT color="blue" disabled>
          EmptyButtons
        </ButtonTT>
      );
    };

    const EditButtons = () => (
      <>
        {currentTabKey !== '3' ? (
          <ButtonTT color="blue">
            Далее
          </ButtonTT>
        ) : (
          <ButtonTT color="blue">
            Сохранить
          </ButtonTT>
        )}
      </>
    );

    const AddButtons = () => (
      <>
        {currentTabKey !== '3' ? (
          <ButtonTT color="blue">
            Далее
          </ButtonTT>
        ) : (
          <ButtonTT color="blue">
            Добавить
          </ButtonTT>
        )}
      </>
    )
    
    {
      switch (state) {
        case 'empty':
          return <EmptyButtons />;
          break;
        case 'edit':
          return <EditButtons />;
          break;
        case 'add':
          return <AddButtons />;
          break;
        default:
          return <EmptyButtons />;
      }
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

          <Form.Item label="Дата поверки" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCheckingDate', date.toISOString());
              }}
              value={moment(values.lastCheckingDate)}
              disabled={isDisabled('lastCheckingDate')}
            />
          </Form.Item>

          <Form.Item label="Дата следующей поверки" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCheckingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date.toISOString());
              }}
              value={moment(values.futureCheckingDate)}
              disabled={isDisabled('futureCheckingDate')}
            />
          </Form.Item>

          <Form.Item label="Дата начала Акта действия допуска" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.lastCommercialAccountingDate)}
              disabled={isDisabled('lastCommercialAccountingDate')}
            />
          </Form.Item>

          <Form.Item label="Дата окончания Акта действия допуска" style={{ width: 460 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="futureCommercialAccountingDate"
              placeholder="Укажите дату..."
              allowClear={false}
              onChange={(date) => {
                setFieldValue('futureCommercialAccountingDate', date.toISOString());
              }}
              value={moment(values.futureCommercialAccountingDate)}
              disabled={isDisabled('futureCommercialAccountingDate')}
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

          {/* { */}
          {/*  Number(currentTabKey) < 3 ? ( */}
          {/*    <ButtonTT */}
          {/*      color="blue" */}
          {/*      onClick={handleNextChangeTab} */}
          {/*      type="button" */}
          {/*    > */}
          {/*      Далее */}
          {/*    </ButtonTT> */}
          {/*  ) */}

          {/*    : ( */}
          {/*      <ButtonTT */}
          {/*        color="blue" */}
          {/*        onClick={handleSubmit} */}
          {/*        type="button" */}
          {/*      > */}
          {/*        Сохранить */}
          {/*      </ButtonTT> */}
          {/*    ) */}
          {/* } */}

        </div>
      </form>
    </div>
  );
};

export default UniversalForm;
