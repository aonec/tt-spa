import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export const SelectReport = ({
  type, selectOptions, defaultValue, handleChange,
}) => {
//   const handleChange = (value) => {
//    const b = _.filter(selectOptions, { value: `${value}` });
//     const { number } = { ...b[0] };
//     console.log('number', number);
//     entryNumberRes.current = number;
//   };
  const b = _.filter(selectOptions, { value: `${type}` });

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: '100%' }}
      onChange={handleChange}
      className="inner"
      options={b}
    />
  );
};

export default SelectReport;
