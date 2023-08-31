import { CalculatorsListRequestPayload } from 'services/calculators/calculatorsListService/calculatorsListService.types';
import { DiamtersConfig } from 'services/currentUserService/currentUserService.types';
import { DevicesSearchType } from 'services/devices/devicesPageService/devicesPageService.types';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

export interface DeviceProfileProps extends HeaderInject {
  setFilter: (payload: CalculatorsListRequestPayload) => void;
  isOpen: boolean;
  open: (payload: void) => void;
  close: (payload: void) => void;
  openDownloadDevicesReportModal: () => void;
  searchState: CalculatorsListRequestPayload | null;
  clearSearchPayload: (payload: void) => void;
  diametersConfig: DiamtersConfig;
  devicesSearchType: DevicesSearchType;
  setDevicesSearchType: (type: DevicesSearchType) => void;
  setSerialNumber: (value: string) => void;
  serialNumber: string;
  isSearchError: boolean;
  calculatorsModels: string[];
  handleFetchModels: (payload: string) => void;
}
