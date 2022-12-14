import { createDomain } from 'effector';
import { housingMeteringDeviceProfileService } from '../housingMeteringDeviceProfileService';
import { EditHousingMeteringDeviceTabs } from './editHousingMeteringDeviceService.types';

const domain = createDomain('editHousingMeteringDeviceService');

const handleChangeTab = domain.createEvent<EditHousingMeteringDeviceTabs>();

const $currentTab = domain
  .createStore<EditHousingMeteringDeviceTabs>(
    EditHousingMeteringDeviceTabs.CommonInfo
  )
  .on(handleChangeTab, (_, tab) => tab);

export const editHousingMeteringDeviceService = {
  inputs: { handleChangeTab },
  outputs: {
    $currentTab,
    $housingMeteringDevice:
      housingMeteringDeviceProfileService.outputs.$housingMeteringDevice,
  },
  gates: {
    FetchHousingMeteringDeviceGate:
      housingMeteringDeviceProfileService.gates.FetchHousingMeteringDeviceGate,
  },
};
