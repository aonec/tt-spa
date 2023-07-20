import { axios } from 'api/axios';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import {
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import {
  CheckIndividualDevicePayload,
  SwitchIndividualDevicePayload,
} from './workWithIndividualDeviceService.types';

export const getSerialNumberQuery = createQuery<string, boolean>({
  handler: async (serialNumber) => {
    const res: IndividualDeviceListResponseFromDevicePagePagedList =
      await axios.get('devices/individual', {
        params: {
          serialNumber,
        },
      });

    return Boolean((res.items || []).length);
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
