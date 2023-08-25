import { VictoryTooltipProps } from 'victory';

export type CustomTooltipProps = VictoryTooltipProps & {
  minValue: number;
  maxValue: number;
  height: number;
  datum?: { value: number | null };
  scale?: {
    y: (y: number) => number;
  };
};
