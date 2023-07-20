import { axios } from 'api/axios';
import { downloadURI } from 'services/reports/CreateReportModal/utils';
import { StreetWithBuildingNumbersResponsePagedList } from 'myApi';
import queryString from 'query-string';
import { HeatIndividualDevicesReportPayload } from './heatIndividualDevicesReportService.types';

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
