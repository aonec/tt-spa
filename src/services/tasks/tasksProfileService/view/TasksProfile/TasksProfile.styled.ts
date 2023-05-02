import { Pagination, Tabs } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 960px;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
  .ant-tabs-tab-btn {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const PaginationSC = styled(Pagination)`
  margin-top: 20px;
`;

export const FiltrationWrapper = styled.div`
  position: sticky;
  top: 0px;
  background: white;
  z-index: 10;
  max-width: calc(960px + 32px);
  padding: 0 16px 0px 16px;
  transform: translateX(-16px);
`;
