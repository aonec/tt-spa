import { Form } from 'antd';
import React, { useContext } from 'react';
import { InputTT, Header, ButtonTT, SelectTT, DatePickerTT } from '../../../../../../tt-components';
import TabsComponent from './Tabs';
import { ChangeOdpuContext } from '../../index';
import moment from "moment";
import { useFormik } from "formik";
import {
  housingMeteringDeviceTypes,
  isConnected, magistrals,
  resources
} from "../../../../../ObjectProfile/components/AddDevice/DeviceJSON";
import * as Yup from "yup";

const ChangeOdpuEdit = () => {
  console.log('ChangeOdpuEdit');
  const Buttons = () => {
    console.log('Buttons');
    return (
      <ButtonTT color="blue" disabled>Сохранить</ButtonTT>
    );
  };
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
    oldDevice
  } = useContext(ChangeOdpuContext);


  const {hubConnection: {
    hub: {
      entryNumber,
        hubNumber,
        pipeNumber,
      magistral
    },
    calculatorId,
      calculatorSerialNumber,
      calculatorModel,

  }} = oldDevice;




  const {
    serialNumber, diameter, resource, housingMeteringDeviceType, id, model, lastCommercialAccountingDate, futureCommercialAccountingDate,
    lastCheckingDate, futureCheckingDate, closingDate,
  } = newDevice;

  console.log("newDevice", JSON.stringify(newDevice))





  return (
    <Form style={{
      display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
    }}
    >
      <Header style={{ width: '100%' }}>
        ChangeOdpuEdit
      </Header>
      <TabsComponent />

      <div  hidden={!(Number(currentTabKey) === 1)}        style={{      display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',   }}   >

        <Form.Item label="Серийный номер" style={{ width: '49%' }}>
          <InputTT
            value={serialNumber}
            disabled />
        </Form.Item>

        <Form.Item label="Тип прибора" style={{ width: '49%' }}>
          <SelectTT
            options={housingMeteringDeviceTypes}
            value={housingMeteringDeviceType}
            disabled
          />
        </Form.Item>
        <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
          <SelectTT
            options={resources}
            value={resource}
            disabled
          />
        </Form.Item>
        <Form.Item label="Модель прибора" style={{ width: '49%' }}>
          <InputTT
            value={model}
            disabled />
        </Form.Item>
        <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            value={moment(lastCommercialAccountingDate)}
            format={'DD.MM.YYYY'}
            disabled />
        </Form.Item>
        <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
          <DatePickerTT
            value={moment(futureCommercialAccountingDate)}
            format={'DD.MM.YYYY'}
            disabled />
        </Form.Item>
      </div>

      <div
        hidden={!(Number(currentTabKey) === 2)}
        style={{
          display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
        }}
      >

        <Form.Item label="Подключение к вычислителю" style={{ width: '49%' }}>
          <SelectTT
            disabled
            options={isConnectedValue}
            value={true}
          />
        </Form.Item>
        <Form.Item label="Выберите вычислитель, к которому подключен прибор" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={`${calculatorModel} (${calculatorSerialNumber})`}
          />
        </Form.Item>
        <Form.Item label="Номер ввода" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={entryNumber}
          />
        </Form.Item>
        <Form.Item label="Номер узла" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={hubNumber}
          />
        </Form.Item>
        <Form.Item label="Номер трубы" style={{ width: '49%' }}>
          <InputTT
            disabled
            value={pipeNumber}
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

export default ChangeOdpuEdit;
