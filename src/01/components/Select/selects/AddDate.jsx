import React from 'react';
import { DatePicker, Space } from 'antd';
import 'moment/locale/ru';

const AddDate = ({ getData = () => {} }) => {
  function onChange(date, dateString) {
    getData({ nextStageDeadline: date.toISOString(true) ?? null });
  }

  return (
    <Space direction="vertical">
      <DatePicker
        style={{ height: 50, width: '100%' }}
        format="DD.MM.YYYY"
        onChange={onChange}
      />
    </Space>
  );
};

export default AddDate;
