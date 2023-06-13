import { GetElectricNodesByAddress } from '../../AccountingNodesReadingsService.types';
import { ElectricNodeResponse, HousingStockAddressItemResponse } from 'myApi';

export type AccountingNodesReadingsProps = {
  handleGetElectricNodes: (address: GetElectricNodesByAddress) => void;
  address: HousingStockAddressItemResponse | null;
  electricNodes: ElectricNodeResponse[];
  isLoading: boolean;
  sliderIndex: number;
  upSliderIndex: () => void;
  downSliderIndex: () => void;
};
