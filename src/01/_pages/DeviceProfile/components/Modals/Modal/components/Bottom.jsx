import React, { useContext } from 'react';
import { Radio, DatePicker, Form } from 'antd';
import { ReportContext } from '../index';

const { RangePicker } = DatePicker;

export const PeriodType = () => {
  console.log('PeriodType');

  const { onPeriodChange, onDetailChange } = useContext(ReportContext);

  return (
    <div className="period_and_type ">
      <div className="type">
        <Form.Item label="Тип архива">
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
        </Form.Item>

      </div>

      <div className="detail">
        <Form.Item label="Детализация отчета">

          <Radio.Group
            defaultValue="hourly"
            size="large"
            onChange={(event) => onDetailChange(event)}
          >
            <Radio.Button value="daily" checked>
              Суточная
            </Radio.Button>
            <Radio.Button value="hourly">Часовая</Radio.Button>
          </Radio.Group>
        </Form.Item>

      </div>
    </div>
  );
};

export const Bottom = () => {
  const {
    values,
    datePickerHandler,
  } = useContext(ReportContext);

  return (
    <>
      <PeriodType />
      <div className="period">
        <Form.Item label="Период выгрузки">
          <RangePicker
            format="DD.MM.YYYY"
            allowClear={false}
            size="48px"
            value={[values.begin, values.end]}
            placeholder={['Дата Начала', 'Дата окончания']}
            onChange={(event) => {
              datePickerHandler(event);
            }}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default Bottom;
