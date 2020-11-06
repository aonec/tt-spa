import { Form } from 'antd';
import React from 'react';
import InputTT from '../../../../../tt-components/InputTT';
import Header from '../../../../../tt-components/Header';

const ChangeOdpuEdit = (props) => {
  const { serialNumber } = props;
  console.log('ChangeOdpuEdit');
  return (
    <Form style={{
      display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between',
    }}
    >
      <Header style={{ width: '100%' }}>
        ChangeOdpuEdit
      </Header>
      <Form.Item label="Серийный номер" style={{ width: '49%' }}>
        <InputTT
          disabled
          value={serialNumber}
        />
      </Form.Item>
      <Form.Item label="Тип прибора" style={{ width: '49%' }}>
        <InputTT disabled />
      </Form.Item>
      <Form.Item label="Тип ресурса" style={{ width: '49%' }}>
        <InputTT disabled />
      </Form.Item>
      <Form.Item label="Модель прибора" style={{ width: '49%' }}>
        <InputTT disabled />
      </Form.Item>
      <Form.Item label="Дата поверки пробора" style={{ width: '49%' }}>
        <InputTT />
      </Form.Item>
      <Form.Item label="Дата следующей поверки пробора" style={{ width: '49%' }}>
        <InputTT />
      </Form.Item>
    </Form>
  );
};

export default ChangeOdpuEdit;
