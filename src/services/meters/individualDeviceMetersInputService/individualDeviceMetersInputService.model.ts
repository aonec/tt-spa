import { createDomain, forward, sample } from 'effector';
import { managementFirmConsumptionRatesService } from '../managementFirmConsumptionRatesService';
import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.model';
import { openConfirmReadingModal } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import {
  removeReading,
  uploadReading,
} from './individualDeviceMetersInputService.api';
import {
  DeleteMeterPayload,
  UploadMeterPayload,
} from './individualDeviceMetersInputService.types';
import { MetersInputBlockStatus } from './view/MetersInputsBlock/MetersInputsBlock.types';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsResponse,
} from 'myApi';
import { message } from 'antd';
import moment from 'moment';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('individualDeviceMetersInputService');

const $uploadingMetersStatuses = domain.createStore<{
  [deviceId: number]: {
    [sliderIndex: number]: MetersInputBlockStatus;
  };
}>({});

const uploadMeterFx = domain.createEffect<
  UploadMeterPayload,
  IndividualDeviceReadingsResponse,
  EffectFailDataAxiosError
>(({ meter }) => uploadReading(meter));

const deleteMeterFx = domain.createEffect<DeleteMeterPayload, void>(
  ({ meterId }) => removeReading(meterId)
);

const uploadMeter = domain.createEvent<UploadMeterPayload>();

const deleteMeter = domain.createEvent<DeleteMeterPayload>();

const $devices =
  apartmentIndividualDevicesMetersService.outputs.$individualDevicesList;

forward({
  from: uploadMeter,
  to: uploadMeterFx,
});

forward({
  from: deleteMeter,
  to: deleteMeterFx,
});

uploadMeterFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

$uploadingMetersStatuses
  .on(uploadMeter, (state, { meter: { deviceId }, sliderIndex }) => ({
    ...state,
    [deviceId]: {
      ...(state[deviceId] || {}),
      [sliderIndex]: MetersInputBlockStatus.Loading,
    },
  }))
  .on(
    uploadMeterFx.done,
    (
      state,
      {
        params: {
          meter: { deviceId },
          sliderIndex,
        },
      }
    ) => ({
      ...state,
      [deviceId]: {
        ...(state[deviceId] || {}),
        [sliderIndex]: MetersInputBlockStatus.Done,
      },
    })
  )
  .on(
    uploadMeterFx.fail,
    (
      state,
      {
        params: {
          meter: { deviceId },
          sliderIndex,
        },
      }
    ) => ({
      ...state,
      [deviceId]: {
        ...(state[deviceId] || {}),
        [sliderIndex]: MetersInputBlockStatus.Failed,
      },
    })
  );

$devices
  .on(uploadMeterFx.done, (state, { params, result }) =>
    state.map((device) => {
      if (device.id !== params.meter.deviceId) return device;

      const filteredReadings =
        device.readings?.filter(({ id }) => params.meterId !== id) || [];

      return {
        ...device,
        readings: [...filteredReadings, result],
      };
    })
  )
  .on(deleteMeterFx.done, (state, { params: { deviceId, meterId } }) =>
    state.map((device) => {
      if (device.id !== deviceId) return device;

      return {
        ...device,
        readings: device.readings?.filter(({ id }) => id !== meterId) || [],
      };
    })
  );

const handleDeviceMeterDeleted = domain.createEvent<{
  device?: IndividualDeviceListItemResponse;
  readingDate: string;
}>();

handleDeviceMeterDeleted.watch(({ device, readingDate }) => {
  if (!device) return;

  const readingMonth = moment(readingDate).format('MMMM');

  message.info(
    `Показание за ${readingMonth} на приборе ${device.model} (${device.serialNumber}) было удалено`
  );
});

sample({
  source: $devices,
  clock: deleteMeterFx.done,
  fn: (devices, { params: { deviceId, readingDate } }) => {
    const device = devices.find((elem) => elem.id === deviceId);

    return { device, readingDate };
  },
  target: handleDeviceMeterDeleted,
});

export const individualDeviceMetersInputService = {
  inputs: {
    openConfirmReadingModal,
    uploadMeter,
    deleteMeter,
    uploadMeterFx,
    deleteMeterFx,
  },
  outputs: {
    $uploadingMetersStatuses,
    $devices,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
};
