import styled from 'styled-components';
import { Select } from 'ui-kit/Select';

export const RowWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;

  grid-column-gap: 16px;
`;

export const SelectSC = styled(Select)`
  min-height: 48px;
`;
