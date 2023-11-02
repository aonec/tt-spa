import { TimePicker } from 'antd';
import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 3fr;
  grid-gap: 4px 20px;
`;

export const TimePickerSC = styled(TimePicker).attrs({
  format: 'HH:mm',
  suffixIcon: null,
  allowClear: false,
})`
  border-radius: 4px;

  padding: 8px 20px !important;

  .ant-picker-input {
    input {
      font-size: 16px;
      line-height: 32px;
      padding: 0px;
    }
  }
`;
