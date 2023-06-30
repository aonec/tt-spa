import { Form } from 'antd';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 16px;

  margin: 8px 0px;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  padding-bottom: 16px;
`;

export const TextWrapper = styled.label`
  color: #272f5ab2;
  font-weight: 500;
  margin-left: 16px;
  cursor: pointer;
`;

export const FormSC = styled(Form)`
  max-width: 800px;
`;
