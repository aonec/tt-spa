import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  margin-top: 16px;
`;

export const DeviceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AddressWrapper = styled(Link)`
  margin-top: 8px;
  font-weight: 500;
  color: #272f5a;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 16opx;
`;

export const SerialNumber = styled.span`
  color: rgba(39, 47, 90, 0.7);
`;

export const Content = styled.div`
  margin-top: 16px;
`;

export const CommonInfoWrapper = styled.div`
  width: 618px;
`;

export const ReadingsHistoryWrapper = styled.div`
  width: 1000px;
`;
