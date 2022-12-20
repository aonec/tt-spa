import { VictoryLabelProps } from 'victory';

export type GraphTooltipProps = VictoryLabelProps & {
  datum?: {
    time: string;
    value: number;
  };
  measure: string;
};
