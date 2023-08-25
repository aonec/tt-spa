import { ElectricNodeResponse } from 'api/types';

export type AccountingNodesListProps = {
  electricNodes: ElectricNodeResponse[];
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
  sum: number;
};
