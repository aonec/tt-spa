import { Form } from 'antd';
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import {
  InputTT, Header, ButtonTT, SelectTT, DatePickerTT,
} from '../../../../../../tt-components';
import { ChangeOdpuContext } from '../../index';
import TabsComponent from './Tabs';
import { isConnected } from '../../../../../ObjectProfile/components/AddDevice/DeviceJSON';

const ChangeOdpuAdd = () => {
  console.log('ChangeOdpuEmpty');

  const {
    handleChangeTab,
    newDevice,
    currentTabKey,
    setTab,
    showEmpty,
    showAdd,
    showEdit,
    updateSeriaNumber,
    DevicesList,
    items,
    serviceLife,
    housingMeteringDeviceTypes,
    resources,
    magistrals,
    isConnectedValue,
  } = useContext(ChangeOdpuContext);


  // {
  //   "serialNumber":"061120201635",
  //   "housingMeteringDeviceType":"FlowMeter",
  //   "resource":"ColdWaterSupply",
  //   "model":"TEST 1636",
  //   "futureCommercialAccountingDate":"2020-11-06T13:32:48.666Z"
  // }

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue, setValues,
  } = useFormik({
    initialValues: {
      isConnected: isConnected[0].value,
      serialNumber: '',
      checkingDate: moment().toISOString(),
      futureCheckingDate: moment().toISOString(),
      lastCommercialAccountingDate: moment().toISOString(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      futureCommercialAccountingDate: moment().toISOString(),
      housingMeteringDeviceType: housingMeteringDeviceTypes[0].value,
      resource: resources[0].value,
      model: '',
      calculatorId: null,
      entryNumber: null,
      hubNumber: null,
      pipeNumber: null,
      magistral: magistrals[0].value,

    },
    validationSchema: Yup.object({
      // resource: Yup.string().required('Введите данные'),
      // pipeNumber: Yup.number().required('Введите данные'),
      // hubNumber: Yup.number().required('Введите данные'),
      // entryNumber: Yup.number().required('Введите данные'),
      // model: Yup.string().min(3, 'Модель должна быть длиннее трех символов').required('Введите данные'),
      // serialNumber: Yup.string().min(3, 'Серийный номер должен быть длиннее трех символов').required('Введите данные'),
      // calculatorId: Yup.string().required('Выберите вычислитель'),
    }),

    onSubmit: async () => {
      const form = {
        serialNumber: values.serialNumber,
        checkingDate: values.checkingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
        documentsIds: [],
        futureCommercialAccountingDate: values.futureCommercialAccountingDate,
        housingMeteringDeviceType: values.housingMeteringDeviceType,
        resource: values.resource,
        model: values.model,
        pipe: {
          calculatorId: values.calculatorId,
          entryNumber: values.entryNumber,
          hubNumber: values.hubNumber,
          pipeNumber: values.pipeNumber,
          magistral: values.magistral,
        },
      };
      console.log(JSON.stringify(form));
      // addOdpu(form);
    },
  });

  const Buttons = () => {
    console.log('Buttons');
    const handleNext = () => {
      setTab(String(Number(currentTabKey) + 1));
    };

    if (currentTabKey == 3) {
      return (
        <ButtonTT form="formikFormAddOdpu" color="blue" onClick={handleSubmit}>
          Завершить
        </ButtonTT>
      );
    }

    return (
      <ButtonTT color="blue" onClick={handleNext}>Далее</ButtonTT>
    );
  };

  return (
    <Form style={{
      display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
    }}
    >
      <Header style={{ width: '100%' }}>
        ChangeOdpuAdd
      </Header>
      <TabsComponent />

      <div
        hidden={!(Number(currentTabKey) === 1)}
        style={{
          display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
        }}
      >

        <Form.Item label="Серийный номер" style={{ width: '49%' }}>
          <InputTT
            value={values.serialNumber}

          />
        </Form.Item>

        <Form.Item label="Тип прибора" style={{ width: '49%' }}>
          <SelectTT
            options={housingMeteringDeviceTypes}
            value={values.housingMeteringDeviceType}

          />
        </Form.Item>

        <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
          <SelectTT
            options={resources}
            value={values.resource}

          />
        </Form.Item>

        <Form.Item label="Модель прибора" style={{ width: '49%' }}>
          <InputTT
            value={values.model}

          />
        </Form.Item>

        <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            value={moment(values.lastCommercialAccountingDate)}
            format="DD.MM.YYYY"

          />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            value={moment(values.futureCommercialAccountingDate)}
            format="DD.MM.YYYY"
          />
        </Form.Item>
      </div>


      <div
        hidden={!(Number(currentTabKey) === 2)}
        style={{
          display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
        }}
      >
        <Header>Настройки соединения будут взяты с предыдущего устройства</Header>

      </div>
      <div
        hidden={!(Number(currentTabKey) === null)}
        style={{
          display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
        }}
      >

        <Form.Item label="Подключение к вычислителю" style={{ width: '49%' }}>
          <SelectTT
            disabled
            options={isConnectedValue}
            value
          />
        </Form.Item>
        <Form.Item label="Выберите вычислитель, к которому подключен прибор" style={{ width: '49%' }}>
          <InputTT
            disabled
            // value={`${values.calculatorModel} (${values.calculatorSerialNumber})`}
          />
        </Form.Item>
        <Form.Item label="Номер ввода" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={values.entryNumber}
          />
        </Form.Item>
        <Form.Item label="Номер узла" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={values.hubNumber}
          />
        </Form.Item>
        <Form.Item label="Номер трубы" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={values.pipeNumber}
          />
        </Form.Item>

      </div>

      <div
        hidden={!(Number(currentTabKey) === 3)}
        style={{
          display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
        }}
      >
        <Header>Компонент в разработке</Header>

      </div>

      <Buttons />

    </Form>

  );
};

export default ChangeOdpuAdd;
