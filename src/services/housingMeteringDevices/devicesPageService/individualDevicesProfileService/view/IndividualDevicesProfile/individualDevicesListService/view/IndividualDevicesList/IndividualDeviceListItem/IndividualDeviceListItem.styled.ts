import styled from 'styled-components';
import { individualDeviceGrid } from '../IndividualDevicesList.styled';

export const Wrapper = styled.div`
  height: 64px;
  display: grid;
  grid-gap: 0 15px;
  align-items: center;
  grid-template-columns: ${individualDeviceGrid};
  padding: 0 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const DeviceStatusWrapper = styled.div`
  margin-left: -16px;
  overflow: hidden;
`;

export const DateWrapper = styled.div`
  color: #272f5a;
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
