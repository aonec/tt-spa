import { Pagination, Tabs } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  // max-width: 960px;
`;

export const TabsSC = styled(Tabs)`
  .ant-tabs-tab-btn {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const PaginationSC = styled(Pagination)`
  margin-top: 20px;
`;
