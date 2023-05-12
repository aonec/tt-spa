import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { Tabs } from 'antd';
import styled from 'styled-components';

export const CityWrappper = styled.div`
  font-size: 14px;
  color: #272f5ae5;
  min-height: 16px;
`;

export const TabsSC = styled(Tabs)`
  min-width: 850px;
  margin-top: 16px;
  overflow: visible;

  .ant-tabs-tab-btn {
    color: #272f5a;
    font-weight: 400;
    font-size: 16px;
  }
  .ant-tabs-tabpane {
    display: grid;
    grid-template-columns: auto 300px;
  }
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;
