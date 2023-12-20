import { axios } from 'api/axios';
import { GetProblemDevicesRequestPayload } from './apartmentProblemDevicesService.types';
import { IndividualDeviceWithExpiredCheckingDateResponse } from 'api/types';
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
      paramsSerializer: (params) => queryString.stringify(params),
    },
  );

  return res.devices;
};
