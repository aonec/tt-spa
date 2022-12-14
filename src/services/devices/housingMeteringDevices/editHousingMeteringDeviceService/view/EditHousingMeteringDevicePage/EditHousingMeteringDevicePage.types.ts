import { PipeHousingMeteringDeviceResponse } from 'myApi';
import { EditHousingMeteringDeviceTabs } from '../../editHousingMeteringDeviceService.types';

export type EditHousingMeteringDevicePageProps = {
  handleChangeTab: (payload: EditHousingMeteringDeviceTabs) => void;
  currentTab: EditHousingMeteringDeviceTabs;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
};
