import { Tabs } from 'antd';
import styled from 'styled-components';

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AddressWrapper = styled.div`
  color: rgba(39, 47, 90);
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
  .ant-tabs-tab-btn {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const WarningWrapper = styled.div`
  font-weight: 300;
  color: #272f5a;
  font-size: 32px;
  line-height: 1.5;
  margin-bottom: 22px;
`;
