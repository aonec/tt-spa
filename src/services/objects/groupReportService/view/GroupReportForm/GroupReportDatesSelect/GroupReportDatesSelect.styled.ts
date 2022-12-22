import { Radio } from 'antd';
import styled from 'styled-components';

const { Group } = Radio;

export const RadioGroupSC = styled(Group)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: #272f5ae5;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: #272f5ab2;
  }

  margin-top: 8px;
  margin-left: 24px;
`;
