import { axios } from 'api/axios';
import { StreetWithBuildingNumbersResponsePagedList } from 'api/types';
import queryString from 'query-string';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';
import { downloadURI } from 'utils/downloadByURL';

export const fetchDownloadHeatIndividualDeviceReport = async ({
  Name,
  ...payload
}: HeatIndividualDevicesReportPayload): Promise<void> => {
  const res: string = await axios.get('Reports/HeatIndividualDevicesReport', {
    params: payload,
    paramsSerializer: (params) => queryString.stringify(params),
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name, true);
};

export const fetchAddresses = (
  City: string,
): Promise<StreetWithBuildingNumbersResponsePagedList> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbers', {
    params: {
      City,
    },
  });
