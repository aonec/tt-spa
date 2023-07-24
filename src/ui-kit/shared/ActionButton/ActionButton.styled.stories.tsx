import styled from 'styled-components';
import { HeatIcon, TimerIcon, UploadIcon } from 'ui-kit/icons';

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  align-items: center;
  width: 800px;
`;

export const TimerIconSC = styled(TimerIcon)`
  height: 32px;
  width: 32px;
`;

export const HeatIconSC = styled(HeatIcon)`
  height: 32px;
  width: 32px;
`;

export const UploadIconSC = styled(UploadIcon)`
  height: 32px;
  width: 32px;
`;
