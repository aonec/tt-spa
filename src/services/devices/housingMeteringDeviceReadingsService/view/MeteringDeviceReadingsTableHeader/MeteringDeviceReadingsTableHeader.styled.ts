import styled from 'styled-components';
import {
  gridTemplateForColdWaterResource,
  gridTemplateNotForColdWaterResource,
} from './MeteringDeviceReadingsTableHeader.constants';

export const Wrapper = styled.div<{ isColdWater: boolean }>`
  display: grid;
  align-items: center;
  align-content: center;
  overflow: hidden;

  padding: 0 16px;
  height: 48px;

  color: #272f5ae5;

  grid-template-columns: ${({ isColdWater }) =>
    isColdWater
      ? gridTemplateForColdWaterResource
      : gridTemplateNotForColdWaterResource};
  background-color: #272f5a0a;
`;
