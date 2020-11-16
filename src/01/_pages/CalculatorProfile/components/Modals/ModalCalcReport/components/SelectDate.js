import React from 'react';
import { DatePicker} from 'antd';
import moment from "moment";
const { RangePicker } = DatePicker;


function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

// function onOk(value) {
//   console.log('onOk: ', value);
// }

const SelectDate = () => {
  console.log('SelectDate');
  return (
      <RangePicker
        format={'DD.MM.YYYY'}
        allowClear={false}
        placeholder={['Дата Начала', 'Дата окончания']}
        // value={[moment(), moment()]}
        // onOk={onOk}
        style={{width: '100%', height: '50px'}}
      />
  );
};

export default SelectDate;