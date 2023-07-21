import { HousingDevicesConstructedReportResponse } from 'api/types';

export type HousingMeteringDevicesReportProps = {
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
};
