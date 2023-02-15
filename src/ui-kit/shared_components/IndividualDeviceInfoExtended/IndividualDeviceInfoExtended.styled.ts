import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ClosingDate = styled.div`
  margin-top: 4px;
  margin-left: 38px;
  font-weight: bold;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SerialNumberWrapper = styled.span`
  margin-left: 6px;
  font-weight: 500;
`;

export const DeviceLink = styled(Link)`
  display: flex;
  align-items: center;

  font-size: 16px;
  color: #272f5a;
`;

export const ModelWrapper = styled.span`
  margin-left: 6px;
  color: rgba(39, 47, 90, 0.6);
`;

export const ApartmentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
  margin-top: 8px;
`;

export const MountPlace = styled.div`
  margin-left: 8px;
  font-weight: 400;
  color: rgba(39, 47, 90, 0.6);
`;

export const DateLineWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;

  font-weight: 500;
  color: rgba(39, 47, 90);
  line-height: 1.2;

  white-space: nowrap;
`;
