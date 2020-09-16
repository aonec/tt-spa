import React, { useContext } from 'react';
import {
  Radio, ConfigProvider, DatePicker, Tabs, Select,
} from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { ReportContext } from '..';

const { RangePicker } = DatePicker;

export const PeriodType = () => {
  console.log('PeriodType');

  const { onPeriodChange, onDetailChange } = useContext(ReportContext);

  return (
    <div className="period_and_type ">
      <div className="type">
        <label className="modal__label" htmlFor="#type">
          Тип архива
        </label>

        <Radio.Group
          defaultValue="month"
          size="large"
          onChange={(event) => onPeriodChange(event)}
        >
          <Radio.Button value="month" checked>
            Месячный
          </Radio.Button>
          <Radio.Button value="day">Суточный</Radio.Button>
          <Radio.Button value="year">Годовой</Radio.Button>
        </Radio.Group>
      </div>

      <div className="detail">
        <label className="modal__label" htmlFor="#type">
          Детализация отчета
        </label>

        <Radio.Group
          defaultValue="daily"
          size="large"
          onChange={(event) => onDetailChange(event)}
        >
          <Radio.Button value="daily" checked>
            Суточная
          </Radio.Button>
          <Radio.Button value="hourly">Часовая</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export const Bottom = () => {
  const {
    begin,
    end,
    datePickerHandler,
    selectOptions,
    onPeriodChange,
    onDetailChange,
  } = useContext(ReportContext);
  const getContext = () => {
    console.log('selectOptions', selectOptions);
  };

  return (
    <>
      <PeriodType />
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
    </>
  );
};

export default Bottom;
