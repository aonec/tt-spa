import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  GetIndividualDevicesToClose,
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
  PollCommand,
  PollResponse,
} from 'api/types';
import { CloseDevicesWithoutReadingsQuery } from './standartReportService.types';
import queryString from 'query-string';

export const getAllClosingDevicesQuery = createQuery<
  [],
  GetIndividualDevicesToClose
>({
  handler: () => axios.get(`IndividualDevices/getAllClosing`),
});

// pending -> running -> done | error

// ---- CloseDevicesByCheckingDate ----

export const startCloseDevicesByCheckingDatePoll = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesByCheckingDate', null, {
      params: { Command: PollCommand.Create },
    }),
});

export const lastCloseDevicesByCheckingDatePollQuery = createQuery<
  [{ isInitial?: boolean } | void],
  PollResponse
>({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesByCheckingDate', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});

// ---- CloseDevicesWithoutReadings ----

export const startCloseDevicesWithoutReadingsPoll = createQuery<
  [CloseDevicesWithoutReadingsQuery],
  PollResponse
>({
  handler: (payload): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesWithoutReadings', null, {
      params: { Command: PollCommand.Create, ...payload },
      paramsSerializer: (params) => queryString.stringify(params),
    }),
});

export const lastCloseDevicesWithoutReadingsPollQuery = createQuery<
  [{ isInitial?: boolean } | void],
  PollResponse
>({
  handler: (): Promise<PollResponse> =>
    axios.post('IndividualDevices/CloseDevicesWithoutReadings', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});

// ---- DuplicateReadings ----

export const startDuplicateReadingsPoll = createQuery({
  handler: (): Promise<PollResponse> =>
    axios.post('Apartments/DuplicateReadings', null, {
      params: { Command: PollCommand.Create },
    }),
});

export const lastDuplicateReadingsPollQuery = createQuery<
  [{ isInitial?: boolean } | void],
  PollResponse
>({
  handler: (): Promise<PollResponse> =>
    axios.post('Apartments/DuplicateReadings', null, {
      params: {
        Command: PollCommand.GetLast,
      },
    }),
});

// ---- form params ----

export const organizationsQuery = createQuery<
  [],
  OrganizationResponsePagedList
>({ handler: () => axios.get('Organizations') });

export const addressesWithHouseManagementsQuery = createQuery({
  handler: (): Promise<HouseManagementWithStreetsResponse[]> =>
    axios.get(
      'Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement',
    ),
});
