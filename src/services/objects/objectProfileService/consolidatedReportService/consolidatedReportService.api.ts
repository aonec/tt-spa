import queryString from 'query-string';
import { axios } from '01/axios';
import { CalculatorIntoHousingStockResponse } from 'myApi';
import { GetConsolidatedReport } from './consolidatedReportService.types';
import { downloadURI } from '01/features/reports/CreateReportModal/utils';

export const getConsolidatedReport = async ({
  Name,
  HousingStockId,
  ...params
}: GetConsolidatedReport) => {
  const calculators: CalculatorIntoHousingStockResponse[] = await axios.get(
    `HousingStocks/${HousingStockId}/Calculators`
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
