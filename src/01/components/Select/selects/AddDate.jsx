import React from 'react';

import { ConfigProvider, DatePicker, Space } from 'antd';

import '../../../tt-components/antd.scss';
import { NavLink } from 'react-router-dom';
import { addDate, dataReducer } from '../../../_pages/TaskProfile/hooks/usePanel';
import 'moment/locale/ru';

const AddDate = ({
  getData = () => {
  },
}) => {
  function onChange(date, dateString) {
    getData({ nextStageDeadline: date.toISOString() ?? null });
  }

  return (
    <Space direction="vertical">
      <DatePicker format="DD.MM.YYYY" onChange={onChange} />
    </Space>
  );
};

export default AddDate;
