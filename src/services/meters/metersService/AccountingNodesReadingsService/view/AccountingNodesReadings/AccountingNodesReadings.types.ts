import { GetElectricNodesByAddress } from '../../AccountingNodesReadingsService.types';
import { ElectricNodeResponse, BuildingAddressItemResponse } from 'api/types';

export type AccountingNodesReadingsProps = {
  handleGetElectricNodes: (address: GetElectricNodesByAddress) => void;
  address: BuildingAddressItemResponse | null;
  electricNodes: ElectricNodeResponse[];
  isLoading: boolean;
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
  sum: number;
};
