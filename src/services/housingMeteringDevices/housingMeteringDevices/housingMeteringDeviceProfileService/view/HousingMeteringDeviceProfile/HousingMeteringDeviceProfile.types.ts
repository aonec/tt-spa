import { PipeHousingMeteringDeviceResponse, TasksPagedList } from 'myApi';
import { HousingProfileTabs } from '../../housingMeteringDeviceProfileService.types';

export type HousingMeteringDeviceProfileProps = {
  deviceId: string;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  currentTab: HousingProfileTabs;
  handleChangeTab: (payload: HousingProfileTabs) => void;
  housingMeteringDeviceTasks: TasksPagedList | null;
  handleCheckModalOpen: () => void;
  handleDeviceClosingModalOpen: () => void;
  tasksPending: boolean;
  isPermitionToCheckHousingMeteringDevice: boolean;
  isPermitionToCloseHousingMeteringDevice: boolean;
  isPermitionToEditHousingMeteringDevice: boolean;
};
