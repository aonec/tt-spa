import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';

export const HeaderTitleWrapper = styled.div`
  flex-grow: 1;
`;

export const HeaderWrapper = styled.div`
  margin-top: 12px;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #272f5ae5;
  font-weight: 500;
`;

export const TabsSC = styled(Tabs)`
  margin-top: 24px;
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
