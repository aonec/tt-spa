import React from 'react';
import { Select } from 'antd';
import _ from 'lodash';

export const SelectReport = ({
  type,
  selectOptions,
  defaultValue,
  handleSomeChange,
}) => {
  const b = _.filter(selectOptions, { value: `${type}` });

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: '100%' }}
      onChange={handleSomeChange}
      className="inner"
      options={b}
    />
  );
};

export default SelectReport;
