import { ElectricNodeResponse } from 'myApi';

export type AccountingNodesListProps = {
  electricNodes: ElectricNodeResponse[];
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
  sum: number;
};
