import styled from 'styled-components';
import { DescendingSortIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 2.5fr 3fr;
  gap: 16px;
`;

export const StyledFormThreeRows = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  gap: 5px;
`;

export const SortContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 6px;
  align-items: center;
`;

export const SortTitle = styled.div`
  color: rgba(39, 47, 90, 0.9);
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export const DescendingSortIconSC = styled(DescendingSortIcon)`
  margin-top: 6px;
`;
