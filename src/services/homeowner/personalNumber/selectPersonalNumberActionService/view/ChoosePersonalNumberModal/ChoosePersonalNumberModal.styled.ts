import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SelectSC = styled(Select)`
  width: 100%;
`;

export const Footer = styled.div`
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
  background-color: var(--bg);
`;
