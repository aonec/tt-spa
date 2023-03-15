import { Tabs } from 'antd';
import styled from 'styled-components';

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
  .ant-tabs-tab-btn {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-gap: 16px;
  align-content: start;
`;
