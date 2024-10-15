import { axios } from 'api/axios';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import {
  IndividualDeviceListResponseFromDevicePage,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import {
  CheckIndividualDevicePayload,
  SwitchIndividualDevicePayload,
} from './workWithIndividualDeviceService.types';

export const getSerialNumberQuery = createQuery<
  [string],
  IndividualDeviceListResponseFromDevicePage[]
>({
  handler: async (serialNumber) => {
    const res: IndividualDeviceListResponseFromDevicePagePagedList =
      await axios.get('devices/individual', {
        params: {
          serialNumber,
          PageSize: 1,
          PageNumber: 1,
        },
      });

    return res.items || [];
  },
});

export const switchIndividualDeviceMutation = createMutation({
  effect: createEffect<
    SwitchIndividualDevicePayload,
    IndividualDeviceResponse,
    EffectFailDataAxiosError
  >(({ deviceId, ...payload }) =>
    axios.post(`IndividualDevices/${deviceId}/switch`, payload),
  ),
});

export const checkIndividualDeviceMutation = createMutation({
  effect: createEffect<
    CheckIndividualDevicePayload,
    IndividualDeviceResponse,
    EffectFailDataAxiosError
  >(({ deviceId, ...payload }) =>
    axios.post(`IndividualDevices/${deviceId}/check`, payload),
  ),
});
