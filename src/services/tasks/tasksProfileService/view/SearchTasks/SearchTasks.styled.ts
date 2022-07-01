import { SelectSC as Select } from '01/shared/ui/Fields';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const SelectSC = styled(Select)`
  flex: none;
  width: 300px;
  margin-left: 16px;
`;
