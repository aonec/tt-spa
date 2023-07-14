import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';
import { PageHeader } from 'ui-kit/shared_components/PageHeader';

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const CityWrappper = styled.div`
  font-size: 14px;
  color: #272f5ae5;
  min-height: 16px;
`;

export const TabsSC = styled(Tabs)`
  min-width: 850px;
  margin-top: 16px;

  .ant-tabs-tab-btn {
    color: #272f5a;
    font-weight: 400;
    font-size: 16px;
  }
`;

export const ContentWrapper = styled.div`
  min-width: 850px;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
