import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { Form } from 'antd';

export const PersonalNumberWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f3f3;
`;

export const InputSC = styled(Input)`
  width: 400px;
`;

export const Wrapper = styled(Form)`
  margin-bottom: 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
`;

export const GridContainerOwner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  user-select: none;
`;
