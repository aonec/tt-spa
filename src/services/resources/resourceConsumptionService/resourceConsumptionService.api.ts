import { axios } from '01/axios';
import moment from 'moment';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'myApi';
import {
  ConsumptionDataForTwoMonth,
  ConsumptionDataPayload,
  MonthConsumptionData,
} from './resourceConsumptionService.types';
import {
  prepareDataForConsumptionGraph,
  prepareDataForConsumptionGraphWithLastValue,
} from './resourceConsumptionService.utils';
import queryString from 'query-string';

export const fetchConsumptionsForTwoMonth = async (
  params: ConsumptionDataPayload,
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
  params: ConsumptionDataPayload,
): Promise<MonthConsumptionData> => {
  const housingMonthData = await fetchHousingConsumptionData(params);
  const housingConsumptionArr = housingMonthData.housingConsumption || [];

  const normativeAndSubscriberData = await fetchNormativeConsumptionData(
    params,
  );

  if (
    !housingMonthData.housingConsumption ||
    housingMonthData.housingConsumption.length === 0
  ) {
    throw new Error();
  }

  return {
    housing: prepareDataForConsumptionGraph(housingConsumptionArr),
    normative: prepareDataForConsumptionGraph(
      normativeAndSubscriberData.normativeConsumption || [],
    ),
    subscriber: prepareDataForConsumptionGraphWithLastValue(
      normativeAndSubscriberData.subscriberConsumption || [],
      housingConsumptionArr[housingConsumptionArr.length - 1]?.key,
    ),
  };
};

export const fetchHousingConsumptionData = (
  params: ConsumptionDataPayload,
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('Nodes/DataForHousingConsumptionPlot', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

export const fetchNormativeConsumptionData = (
  params: ConsumptionDataPayload,
): Promise<GetDataForIndividualDevicesConsumptionPlotResponse> =>
  axios.get(
    'IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot',
    {
      params,
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
      headers: {
        'api-version': 2,
      },
    },
  );

export const fetchSummaryConsumption = (
  params: ConsumptionDataPayload,
): Promise<GetSummaryHousingConsumptionsByResourcesResponse> =>
  axios.get('Nodes/SummaryHousingConsumptionsByResources', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });
