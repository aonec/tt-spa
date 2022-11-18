import styled from 'styled-components';
import { ResourceAccountingSystemsSegment } from '../../ResourceAccountingSystems.types';

export const Wrapper = styled.div<{
  segmentName: ResourceAccountingSystemsSegment;
}>`
  height: 60px;
  padding: 0 25px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: ${({ segmentName }) =>
    segmentName === 'resource' ? '0.7fr 1fr 1fr' : '1fr 1fr'};
  align-items: center;

  border-top: 1px solid #e9e9e9;

  &:first-child {
    border-top: 1px solid #d9d9d9;
  }
`;

export const NodeName = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;

export const NodeServiceZone = styled.div<{ isZoneExist: boolean }>`
  margin-top: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(
    39,
    47,
    90,
    ${({ isZoneExist }) => (isZoneExist ? '0.7' : '0.4')}
  );
`;

export const NoCalculatorTextWrapper = styled.div`
  color: rgba(39, 47, 90, 0.4);
`;

export const NodeStatusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const NodeInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const BaseNodeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 120px;
  max-width: 120px;
`;

export const NodeInfo = styled.div`
  margin-left: 10px;
`;

export const DeviceIconWrapper = styled.div`
  cursor: pointer;

  svg {
    width: 21px;
    height: 16px;
  }
`;

export const ResourceIconWrapper = styled.div`
  width: 18px;
  transform: translateY(-8px);
`;
