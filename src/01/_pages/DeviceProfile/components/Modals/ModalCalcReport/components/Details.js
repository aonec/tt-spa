import React from 'react';
import { Radio } from 'antd';

const Details = () => {
  console.log("Details");
  return (
    <>
      <Radio.Group defaultValue="daily" buttonStyle="solid">
        <Radio.Button value="daily">Суточная</Radio.Button>
        <Radio.Button value="hourly">Часовая</Radio.Button>
      </Radio.Group>
    </>

  );
};
export default Details;
