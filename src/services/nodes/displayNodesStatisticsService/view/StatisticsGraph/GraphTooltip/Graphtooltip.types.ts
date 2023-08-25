import { VictoryLabelProps } from 'victory';

export type GraphTooltipProps = VictoryLabelProps & {
  datum?: {
    timeUtc: string;
    value: number;
  };
  measure: string;
};
