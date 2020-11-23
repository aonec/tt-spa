import React from 'react';
import { Form } from 'antd';
import InputTT from '../../../tt-components/InputTT';
import SelectTT from '../../../tt-components/Select';

const Common = () => {
  console.log('Common');
  const timezones = [
    { value: 3, label: 'UTC+3' },
  ];
  return (
    <div>
      Common
      <form style={{maxWidth: '480px'}}>
        <Form.Item label="Название компании">
          <InputTT
            placeholder="УК «Лесные озёра»"
          />
        </Form.Item>
        <Form.Item label="Телефон">
          <InputTT
            type={'number'}
            placeholder="89999999999"
          />
        </Form.Item>
        <Form.Item label="Часовой пояс">
          <SelectTT
            options={timezones}
            placeholder="Часовой пояс"
          />
        </Form.Item>
      </form>
    </div>
  );
};

export default Common;
