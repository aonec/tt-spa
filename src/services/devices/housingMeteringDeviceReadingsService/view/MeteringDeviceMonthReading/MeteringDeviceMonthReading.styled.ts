import styled from 'styled-components';
import {
  gridTemplateForColdWaterResource,
  gridTemplateNotForColdWaterResource,
} from '../MeteringDeviceReadingsTableHeader/MeteringDeviceReadingsTableHeader.constants';

export const Wrapper = styled.div<{ isColdWater: boolean }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ isColdWater }) =>
    isColdWater
      ? gridTemplateForColdWaterResource
      : gridTemplateNotForColdWaterResource};

  padding: 8px 16px;
  height: 48px;
  &:last-child {
    margin-bottom: 8px;
  }
`;

export const MonthWrapper = styled.div`
  display: flex;
  align-items: center;

  font-size: 16px;
  font-weight: 500;

  color: #272f5a;
  text-transform: capitalize;
`;

