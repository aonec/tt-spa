import { VictoryLabelProps } from 'victory';

export type ResourceConsumptionGraphTooltipProps = VictoryLabelProps & {
  datum?: {
    key: string;
    value: number;
  };
  startOfMonth: string;
};
