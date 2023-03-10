import { axios } from '01/axios';
import moment from 'moment';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import {
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
} from './resourceConsumptionService.types';
import { prepareDataForConsumptionGraph } from './resourceConsumptionService.utils';

export const fetchConsumptionsForTwoMonth = async (
  params: ConsumptionDataFilter,
): Promise<ConsumptionDataForTwoMonth> => {
  const prevMonth = moment(params.From).subtract(1, 'month');
  const paramsForPrevMonthRequest = {
    ...params,
    From: prevMonth.startOf('month').utcOffset(0, true).format(),
    To: prevMonth.endOf('month').utcOffset(0, true).format(),
  };

  const currentMonthData = await fetchConsumptionsForMonth(params);
  const prevMonthData = await fetchConsumptionsForMonth(
    paramsForPrevMonthRequest,
  );

  return { currentMonthData, prevMonthData };
};

export const fetchConsumptionsForMonth = async (
  params: ConsumptionDataFilter,
): Promise<MonthConsumptionData> => {
  const housingMonthData = await fetchHousingConsumptionData(params);

  const normativeAndSubscriberData = await fetchNormativeConsumptionData(
    params,
  );

  return {
    housing: prepareDataForConsumptionGraph(
      housingMonthData.housingConsumption || [],
    ),
    normative: prepareDataForConsumptionGraph(
      normativeAndSubscriberData.normativeConsumption || [],
    ),
    subscriber: prepareDataForConsumptionGraph(
      normativeAndSubscriberData.subscriberConsumption || [],
    ),
  };
};

export const fetchHousingConsumptionData = (
  params: ConsumptionDataFilter,
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('PipeNodes/DataForHousingConsumptionPlot', {
    params,
    headers: {
      'api-version': 2,
    },
  });

export const fetchNormativeConsumptionData = (
  params: ConsumptionDataFilter,
): Promise<GetDataForIndividualDevicesConsumptionPlotResponse> =>
  axios.get(
    'IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot',
    {
      params,
      headers: {
        'api-version': 2,
      },
    },
  );

export const fetchAddresses = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement',
  );
