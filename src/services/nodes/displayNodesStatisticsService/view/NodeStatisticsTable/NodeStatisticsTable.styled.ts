import { Pagination } from 'antd';
import styled from 'styled-components';

export const TableWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  margin-top: 32px;

  border-top: 1px solid #0000000f;
`;

export const PaginationSC = styled(Pagination)`
  margin-top: 16px;
  align-self: flex-end;
`;
