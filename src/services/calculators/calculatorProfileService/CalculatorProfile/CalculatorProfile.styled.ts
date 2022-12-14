import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'ui-kit/Tabs';

export const Wrapper = styled.div``;

export const HeaderWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
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
