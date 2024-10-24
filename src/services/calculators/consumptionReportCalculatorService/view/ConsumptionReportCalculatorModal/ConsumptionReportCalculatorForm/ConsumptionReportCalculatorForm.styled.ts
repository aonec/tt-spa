import { Radio } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const StyledTab = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MarginTop = styled.div`
  margin-top: 8px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const UndersupplyCheckbox = styled.div`
  margin-top: 12px;
`;
