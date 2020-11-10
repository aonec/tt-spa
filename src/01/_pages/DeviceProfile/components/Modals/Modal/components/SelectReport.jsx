import React from 'react';
import {SelectTT} from '../../../../../../tt-components';
import _ from 'lodash';

export const SelectReport = ({
  type,
  selectOptions,
  defaultValue,
  handleSomeChange,
}) => {
  const b = _.filter(selectOptions, { value: `${type}` });

  return (
    <SelectTT
      defaultValue={defaultValue}
      onChange={handleSomeChange}
      options={b}
    />
  );
};

export default SelectReport;
