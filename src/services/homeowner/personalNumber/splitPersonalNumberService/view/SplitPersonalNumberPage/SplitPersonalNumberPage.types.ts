import {
  ApartmentResponse,
  HomeownerAccountListResponse,
  IndividualDeviceListItemResponse,
} from 'myApi';
import {
  AddNewApartmentStage,
  SwitchStage,
  TransferStage,
} from '../../splitPersonalNumberService.types';

export type SplitPersonalNumberPageProps = {
  stageNumber: number;
  apartment: ApartmentResponse | null;
  homeowner: HomeownerAccountListResponse | undefined;
  handleSubmitSwitchStage: (payload: SwitchStage) => void;
  handleSubmitAddNewApartmentStage: (payload: AddNewApartmentStage) => void;
  goBackStage: () => void;
  switchStageData: SwitchStage | null;
  addNewApartmentStageData: AddNewApartmentStage | null;
  transferDevicesData: TransferStage | null;
  individualDevices: {
    items: IndividualDeviceListItemResponse[];
  } | null;
  handleSubmitTransferDevicesStage: (payload: TransferStage) => void;
};
