import queryString from 'query-string';
import { axios } from 'api/axios';
import { CalculatorIntoHousingStockResponse } from 'api/types';
import { GetConsolidatedReport } from './consolidatedReportService.types';
import { downloadURI } from 'services/reports/CreateReportModal/utils';

export const getConsolidatedReport = async ({
  Name,
  BuildingId,
  ...params
}: GetConsolidatedReport) => {
  const calculators: CalculatorIntoHousingStockResponse[] = await axios.get(
    `Buildings/${BuildingId}/Calculators`,
  );

  const calculatorsIds = calculators.map((calculator) => calculator.id);

  const res: string = await axios.get('Reports/ConsolidatedReport', {
    params: { ...params, CalculatorsId: calculatorsIds },
    responseType: 'blob',
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

  const url = window.URL.createObjectURL(new Blob([res]));

  downloadURI(url, Name);
};
