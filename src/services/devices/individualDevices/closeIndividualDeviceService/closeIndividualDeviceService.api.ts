import { axios } from 'api/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { CloseIndividualDevicePayload } from './closeIndividualDeviceService.types';
import { EffectFailDataAxiosError } from 'types';
import { EditReadingsHistoryPayload } from 'services/meters/editReadingsHistoryService/editReadingsHistoryService.types';
import { IndividualDeviceReadingsSlimResponse } from 'api/types';

export const closeIndivididualDeviceMutation = createMutation({
  effect: createEffect<
    CloseIndividualDevicePayload,
    void,
    EffectFailDataAxiosError
  >(({ deviceId, ...payload }) =>
    axios.post(`IndividualDevices/${deviceId}/close`, payload),
  ),
});

export const editReadingsHistory = ({
  deviceId,
  newReadings,
}: EditReadingsHistoryPayload): Promise<void> =>
  axios.post(`IndividualDevices/${deviceId}/editReadingsHistory`, {
    newReadings: [newReadings],
  });

export const getLastReading = (
  deviceId: string,
): Promise<IndividualDeviceReadingsSlimResponse> =>
  axios.get(`IndividualDevices/${deviceId}/LastReading`);
