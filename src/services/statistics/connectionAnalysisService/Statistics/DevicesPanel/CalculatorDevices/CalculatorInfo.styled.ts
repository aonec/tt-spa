import styled from 'styled-components';

import { PencilIcon } from 'ui-kit/icons';

export const Wrapper = styled.div`
  height: 52px;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  border-top: 1px solid #e1e1e1;
  color: #272f5ab2;
  font-weight: 500;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SerialNumber = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: rgba(39, 47, 90, 0.7);
`;

export const Model = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 500;
  font-size: 16px;
`;

export const DeviceType = styled.div`
  font-weight: 400;
  font-size: 16px;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

export const DeviceInfoWrapper = styled.div`
  display: flex;
  gap: 8px;

  &:hover {
    div {
      transition: 0.2s;
      color: #189ee9 !important;
    }
  }
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;

export const DeviceTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusWrapper = styled.div`
  margin: 0 16px 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
