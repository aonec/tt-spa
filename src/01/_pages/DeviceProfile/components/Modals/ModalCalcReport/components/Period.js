import React from 'react';
import { Radio } from 'antd';

const Period = () => {
  console.log("Period");
  return (
      <Radio.Group
        defaultValue="year" buttonStyle="solid">
        <Radio.Button value="year">Год</Radio.Button>
        <Radio.Button value="month">Месяц</Radio.Button>
        <Radio.Button value="day">День</Radio.Button>
        <Radio.Button value="custom">Свой период</Radio.Button>
      </Radio.Group>
  );
};
export default Period;
