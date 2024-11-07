import { PageHeader } from 'ui-kit/shared/PageHeader';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  CalculatorIcon,
  CheckConnection,
  NoConnectionIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { Tabs } from 'ui-kit/Tabs';

export const HeaderTitleWrapper = styled.div`
  flex-grow: 1;
`;

export const PageHeaderSC = styled(PageHeader)`
  margin-top: 16px;
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #272f5ae5;
  font-weight: 500;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 16px;
`;

export const AddressLinkWrapper = styled(Link)`
  color: #272f5a;
  font-weight: 500;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const Content = styled.div`
  width: 100%;
`;

export const CalculatorIconSC = styled(CalculatorIcon)`
  width: 24px;
  height: 16px;
  margin-right: 8px;
`;

export const NoConnectionIconSC = styled(NoConnectionIcon)`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`;

export const CheckConnectionSС = styled(CheckConnection)`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`;

export const WarningIconSС = styled(WarningIcon)`
  width: 22px;
  height: 22px;
  margin-left: 8px;
`;

export const PanelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
