/* eslint-disable */

import React from 'react';
import { Switch } from 'antd';

function onChange(checked) {}

const styles = {
  width: '48px',
};

const SwitchTT = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Switch style={styles} defaultChecked onChange={onChange} />
      <span
        style={{
          fontSize: '16px',
          lineHeight: '32px',
          marginLeft: '16px',
          color: 'rgba(39, 47, 90, 0.9)',
        }}
      >
        Вычислитель без оборудования связи
      </span>
    </div>
  );
};
export default SwitchTT;
