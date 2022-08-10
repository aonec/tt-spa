import { createDomain, forward } from 'effector';
import { managementFirmConsumptionRatesService } from '../managementFirmConsumptionRatesService';
import { apartmentIndividualDevicesMetersService } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.model';
import { openConfirmReadingModal } from '01/features/readings/readingsInput/confirmInputReadingModal/models';
import { uploadReading } from './individualDeviceMetersInputService.api';
import { UploadMeterPayload } from './individualDeviceMetersInputService.types';
import { MetersInputBlockStatus } from './view/MetersInputsBlock/MetersInputsBlock.types';
import { IndividualDeviceReadingsResponse } from 'myApi';

const domain = createDomain('individualDeviceMetersInputService');

const $uploadingMetersStatuses = domain.createStore<{
  [deviceId: number]: {
    [sliderIndex: number]: MetersInputBlockStatus;
  };
}>({});

const uploadMeterFx = domain.createEffect<
  UploadMeterPayload,
  IndividualDeviceReadingsResponse
>(({ meter }) => uploadReading(meter));

const uploadMeter = domain.createEvent<UploadMeterPayload>();

const $devices =
  apartmentIndividualDevicesMetersService.outputs.$individualDevicesList;

forward({
  from: uploadMeter,
  to: uploadMeterFx,
});

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

$devices.on(uploadMeterFx.done, (state, { params, result }) =>
  state.map((device) => {
    if (device.id !== params.meter.deviceId) return device;

    const filteredReadings =
      device.readings?.filter(({ id }) => params.meterId !== id) || [];

    return {
      ...device,
      readings: [...filteredReadings, result],
    };
  })
);

export const individualDeviceMetersInputService = {
  inputs: {
    openConfirmReadingModal,
    uploadMeter,
  },
  outputs: {
    $uploadingMetersStatuses,
    $devices,
    $consumptionRates:
      managementFirmConsumptionRatesService.outputs.$consumptionRates,
  },
};
