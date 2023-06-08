import { PageHeader } from 'ui-kit/shared_components/PageHeader';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';

export const Wrapper = styled.div``;

export const DeviceTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const DeviceModel = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  margin: 0px 8px;
`;

export const DeviceNumber = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const PageGridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 36px;
`;

export const RightBlock = styled.div``;

export const TasksWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Tasks = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #272f5a;
`;

export const LinkSC = styled(Link)`
  color: #189ee9;
`;

export const ResourceIconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 24px;
    width: 24px;
  }
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
`;
