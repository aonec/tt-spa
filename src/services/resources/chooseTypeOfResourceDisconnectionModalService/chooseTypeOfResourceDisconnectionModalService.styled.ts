import styled from 'styled-components';
import { HeatIcon, TimerIcon } from 'ui-kit/icons';

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  align-items: center;
`;

export const HeatIconSC = styled(HeatIcon)`
  width: 32px;
  height: 32px;
`;

export const TimerIconSC = styled(TimerIcon)`
  width: 32px;
  height: 32px;
`;
