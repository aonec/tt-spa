import { message } from 'antd';
import { createDomain, forward } from 'effector';
import {
  MeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { housingMeteringDeviceProfileService } from '../housingMeteringDeviceProfileService';
import { putHousingMeteringDevice } from './editHousingMeteringDeviceService.api';
import { EditHousingMeteringDeviceTabs } from './editHousingMeteringDeviceService.types';

const domain = createDomain('editHousingMeteringDeviceService');

const handleChangeTab = domain.createEvent<EditHousingMeteringDeviceTabs>();

const handleHousingMeteringDeviceUpdate =
  housingMeteringDeviceProfileService.inputs.handleHousingMeteringDeviceUpdate;

const handleSubmitForm = domain.createEvent<{
  deviceId: number;
  request: UpdatePipeHousingMeteringDeviceRequest;
}>();

const editHousingMeteringDeviceFx = domain.createEffect<
  {
    deviceId: number;
    request: UpdatePipeHousingMeteringDeviceRequest;
  },
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(putHousingMeteringDevice);

forward({
  from: handleSubmitForm,
  to: editHousingMeteringDeviceFx,
});

const $currentTab = domain
  .createStore<EditHousingMeteringDeviceTabs>(
    EditHousingMeteringDeviceTabs.CommonInfo,
  )
  .on(handleChangeTab, (_, tab) => tab);

editHousingMeteringDeviceFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

editHousingMeteringDeviceFx.doneData.watch(() => {
  message.success('ОДПУ успешно обновлен!');
  handleHousingMeteringDeviceUpdate();
});

export const editHousingMeteringDeviceService = {
  inputs: {
    handleChangeTab,
    handleSubmitForm,
  },
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
