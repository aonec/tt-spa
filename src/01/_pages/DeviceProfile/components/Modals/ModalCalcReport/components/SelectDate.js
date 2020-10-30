import React from 'react';
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

const SelectDate = () => {
  console.log('SelectDate');
  return (
      <RangePicker
        format="DD.MM.YYYY"
        onChange={onChange}
        onOk={onOk}
        style={{width: '100%', height: '50px'}}
      />
  );
};

export default SelectDate;