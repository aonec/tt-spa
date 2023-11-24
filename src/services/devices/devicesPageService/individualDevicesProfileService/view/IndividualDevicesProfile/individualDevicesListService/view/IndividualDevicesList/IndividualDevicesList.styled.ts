import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 8px;
  width: 100%;
`;

export const DeviceStatusWrapper = styled.div`
  margin-left: -16px;
  overflow: hidden;
`;

export const Consumption = styled.div`
  color: #272f5a;
`;

export const ConsumptionDate = styled.div`
  font-size: 10px;
  color: rgba(39, 47, 90, 0.7);
`;

export const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(39, 47, 90, 0.32);
`;

export const NoDataText = styled.div`
  margin-left: 10px;
`;
