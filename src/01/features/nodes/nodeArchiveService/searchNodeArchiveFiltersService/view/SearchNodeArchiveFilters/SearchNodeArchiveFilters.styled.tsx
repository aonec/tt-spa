import styled from 'styled-components';
import { DatePicker } from 'antd';

export const RangePicker = styled(DatePicker.RangePicker)`
  width: 100%;
`;

export const Wrap = styled.div`
  width: 361px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

export const FiltersWrap = styled.div`
  padding: 15px;
`;

export const Bottom = styled.div`
  padding: 15px;
  display: flex;
  background: #f3f5f6;
`;

export const Title = styled.div`
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #272f5a;
`;
