import { HousingDevicesConstructedReportResponse } from 'myApi';

export type HousingMeteringDevicesReportProps = {
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
  city: string | null;
};
