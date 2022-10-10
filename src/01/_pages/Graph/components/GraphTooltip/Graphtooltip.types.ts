import { VictoryLabelProps } from 'victory';
import { GraphParamsType } from '../../Graph';

export type GraphTooltipProps = VictoryLabelProps & {
  datum?: {
    time: string;
    value: number;
  };
  graphParam: GraphParamsType;
};
