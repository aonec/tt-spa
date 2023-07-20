import { HousingDevicesConstructedReportResponse } from 'api/myApi';

export type HousingMeteringDevicesReportProps = {
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
};
