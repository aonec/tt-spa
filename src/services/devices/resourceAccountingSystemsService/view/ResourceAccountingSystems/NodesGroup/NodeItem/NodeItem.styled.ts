import styled from 'styled-components';
import { IncorrectConfigurationIcon } from 'ui-kit/icons';
import { ResourceAccountingSystemsSegment } from '../../ResourceAccountingSystems.types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 26px;

  border-top: 1px solid #e9e9e9;

  padding: 12px 24px;

  &:first-child {
    border-top: 1px solid #d9d9d9;
    height: 100px;
  }
`;

export const Wrapper = styled.div<{
  segmentName: ResourceAccountingSystemsSegment;
}>`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: ${({ segmentName }) =>
    segmentName === 'resource' ? '1.2fr 1.2fr 1fr 0.2fr' : '1fr 1fr 0.2fr'};
  align-items: center;
`;

export const NodeZoneWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NodeEntryNumber = styled.div`
  color: rgba(39, 47, 90, 0.7);
  margin-left: 4px;
  font-weight: 400;
  font-size: 12px;
`;

export const NodeName = styled.span`
  display: flex;
  align-items: center;

  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #272f5a;
  transition: 0.2s;

  &:hover {
    color: #189ee9;
  }
`;

export const ZoneWrapper = styled.div`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NodeServiceZone = styled.div<{ isZoneExist: boolean }>`
  /* display: flex; */
  /* align-items: center; */

  margin-top: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  gap: 4px;
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
  justify-content: flex-start;
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
  max-width: 240px;
`;

export const NodeInfo = styled.div`
  margin-left: 10px;
`;

export const DeviceIconWrapper = styled.div`
  cursor: pointer;
  margin-left: 16px;

  svg {
    width: 21px;
    height: 16px;
  }
`;

export const ResourceIconWrapper = styled.div`
  width: 18px;
  transform: translateY(-8px);
`;

export const IncorrectConfigurationIconSC = styled(IncorrectConfigurationIcon)`
  margin-left: 6px;
`;
