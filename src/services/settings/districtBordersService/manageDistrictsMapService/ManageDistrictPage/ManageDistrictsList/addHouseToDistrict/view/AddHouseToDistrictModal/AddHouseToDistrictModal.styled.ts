import styled from 'styled-components';
import { InfoIcon } from 'ui-kit/icons';

export const MapWrapper = styled.div`
  position: relative;
  margin-top: 16px;
  border: 1px solid #dcdee4;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

export const NotificationWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 4px;
  background: rgba(24, 158, 233, 0.16);
`;

export const InfoIconSC = styled(InfoIcon)`
  transform: translateY(2px);
`;

export const NotificationTitle = styled.div`
  color: #189ee9;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

export const NotificationDescription = styled.div`
  margin-top: 4px;
  color: #272f5a;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
