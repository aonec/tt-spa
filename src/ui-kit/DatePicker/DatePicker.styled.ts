import { DatePicker as AntDatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';

export const DatePicker = styled(AntDatePicker<Dayjs>)<{ small?: boolean }>`
  height: ${({ small }) => (small ? '32px' : '48px')};
  width: 100%;
  border-radius: 4px;

  * {
    font-size: ${({ small }) => (small ? '14px' : '16px')} !important;
    line-height: 32px;
  }

  .ant-picker-range {
    height: 100% !important;
    padding: 8px 24px !important;
  }

  .ant-picker-clear {
    height: ${({ small }) => (small ? '13px' : '15px')};
  }
`;
