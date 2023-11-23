import styled from 'styled-components';

export const individualDeviceGrid = '0.6fr 0.25fr 0.3fr 0.3fr 0.26fr 0.55fr';

export const Header = styled.div`
  height: 50px;
  padding: 0 25px;
  background: #f3f5f6;
  display: grid;
  grid-gap: 0 15px;
  align-items: center;
  grid-template-columns: ${individualDeviceGrid};
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
`;

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
