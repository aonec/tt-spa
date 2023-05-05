import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AddressWrapper = styled(Link)`
  color: #272f5ae5;
  font-weight: 500;
  line-height: 26px;
`;

export const ResourceIconWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-right: 8px;
  svg {
    height: 24px;
    width: 24px;
  }
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
  overflow: visible;

  .ant-tabs-tab-btn {
    color: #272f5a;
    font-weight: 500;
    font-size: 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 820px;
`;

export const CommonInfoWrapper = styled.div`
  width: 640px;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;
