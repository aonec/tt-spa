import React, { useContext } from 'react';
import { Radio, DatePicker, Form } from 'antd';
import { ReportContext } from '../index';
import { RangePickerTT } from '../../../../../../tt-components/RangePicker';

export const Bottom = () => {
  const {
    onPeriodChange,
    onDetailChange,
    values,
    datePickerHandler,
  } = useContext(ReportContext);

  return (
    <>
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

      <Form.Item label="Период выгрузки">
        <RangePickerTT
          format="DD.MM.YYYY"
          allowClear={false}
          value={[values.begin, values.end]}
          placeholder={['Дата Начала', 'Дата окончания']}
          onChange={(event) => {
            datePickerHandler(event);
          }}
        />
      </Form.Item>
    </>
  );
};

export default Bottom;
