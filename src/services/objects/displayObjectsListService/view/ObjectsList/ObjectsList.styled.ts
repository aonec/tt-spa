import styled from 'styled-components';
import { Pagination } from 'ui-kit/Pagination';

export const StreetGroupWrapper = styled.div`
  padding-bottom: 15px;
`;

export const StreetGroupHeader = styled.div`
  padding: 5px 5px 5px 0px;
  margin-bottom: 5px;
  border-bottom: 1px solid #dcdee4;
`;

export const StickyPanel = styled.div`
  position: fixed;
  bottom: 0px;
  left: 208px;

  padding: 16px 56px;
  width: calc(100% - 208px);
  background: #ffffff;
  box-shadow: 0px -4px 8px 0px rgba(78, 93, 146, 0.16);

  display: flex;
  align-items: center;
  gap: 16px;
`;

export const PaginationSC = styled(Pagination)`
  margin-left: 605px;
`;
