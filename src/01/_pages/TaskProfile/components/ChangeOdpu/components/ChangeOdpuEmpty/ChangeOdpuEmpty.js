import { Form } from 'antd';
import React, { useContext } from 'react';
import { ChangeOdpuContext } from '../../index';
import {
  DatePickerTT, SelectTT, Header, InputTT,
} from '../../../../../../tt-components';
import TabsComponent from './Tabs'

const ChangeOdpuEmpty = () => {
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

  return (
    <Form style={{
      display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
    }}
    >
      <Header style={{ width: '100%' }}>
        ChangeOdpuEmpty
      </Header>
      <TabsComponent />
      <Form.Item label="Серийный номер" style={{ width: '49%' }}>
        <InputTT disabled />
      </Form.Item>

      <Form.Item label="Тип прибора" style={{ width: '49%' }}>
        <SelectTT
          options={housingMeteringDeviceTypes}
          disabled
        />
      </Form.Item>
      <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
        <SelectTT
          options={resources}
          disabled
        />
      </Form.Item>
      <Form.Item label="Модель прибора" style={{ width: '49%' }}>
        <InputTT disabled />
      </Form.Item>
      <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
        <DatePickerTT disabled />
      </Form.Item>
      <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
        <DatePickerTT disabled />
      </Form.Item>
    </Form>
  );
};

export default ChangeOdpuEmpty;
