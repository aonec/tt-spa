import { VictoryAxisProps } from 'victory';

export type DeviceGraphTickProps = VictoryAxisProps & {
  y1?: number;
  index?: number;
  stringTicks?: string[];
};
