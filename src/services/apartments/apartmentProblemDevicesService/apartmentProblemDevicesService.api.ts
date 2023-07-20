import { axios } from 'api/axios';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';
import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/myApi';
import queryString from 'query-string';

export const getProblemDevices = async ({
  requestPayload,
  apartmentId,
}: GetProblemDevicesRequestPayload): Promise<
  IndividualDeviceWithExpiredCheckingDateResponse[]
> => {
  const res: {
    devices: IndividualDeviceWithExpiredCheckingDateResponse[];
  } = await axios.get(
    `Apartments/${apartmentId}/SetStatusProblemDevices`,

    {
      params: requestPayload,
      paramsSerializer: queryString.stringify,
    },
  );

  return res.devices;
};
