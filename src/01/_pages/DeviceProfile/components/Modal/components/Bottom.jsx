import React, { useContext } from 'react';
import {
  Radio, ConfigProvider, DatePicker, Tabs, Select,
} from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { ReportContext } from '..';

const { RangePicker } = DatePicker;

export const Bottom = () => {
  const {
    begin, end, datePickerHandler, selectOptions,
  } = useContext(ReportContext);

  const getContext = () => {
    console.log('selectOptions', selectOptions);
  };

  return (
    <div className="period">
      <button onClick={getContext}>getContext</button>
      <label className="modal__label" htmlFor="#period">
        Период выгрузки
      </label>
      <ConfigProvider locale={ruRu}>
        <RangePicker
          allowClear={false}
          size="48px"
          value={[begin, end]}
          placeholder={['Дата Начала', 'Дата окончания']}
          onChange={(event) => {
            datePickerHandler(event);
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Bottom;
