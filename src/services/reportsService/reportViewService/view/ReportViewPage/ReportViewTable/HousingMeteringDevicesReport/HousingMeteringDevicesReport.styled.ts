import styled from 'styled-components';

export const DeviceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DeviceSerialNumber = styled.div`
  color: #272f5a;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
`;

export const DeviceModel = styled.div`
  color: #272f5a;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
`;

export const DeviceCheckingDates = styled.div`
  margin-top: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
  transform: translateX(24px);
`;

export const FullAddressWrapper = styled.div`
  max-width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
