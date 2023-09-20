import { axios } from 'api/axios';
import dayjs from 'api/dayjs';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import {
  ConsumptionDataForTwoMonth,
  ConsumptionDataPayload,
  ConsumptionRequestPayload,
  MonthConsumptionData,
} from './resourceConsumptionService.types';
import {
  prepareDataForConsumptionGraph,
  prepareDataForConsumptionGraphWithLastValue,
} from './resourceConsumptionService.utils';
import queryString from 'query-string';
import { CancelTokenSource } from 'axios';

export const fetchConsumptionsForTwoMonth = async ({
  params,
  token,
}: ConsumptionRequestPayload): Promise<ConsumptionDataForTwoMonth> => {
  const prevMonth = dayjs(params.From).subtract(1, 'month');
  const paramsForPrevMonthRequest = {
    ...params,
    From: prevMonth.startOf('month').utcOffset(0, true).format(),
    To: prevMonth.endOf('month').utcOffset(0, true).format(),
  };

  const currentMonthData = await fetchConsumptionsForMonth({ params, token });
  const prevMonthData = await fetchConsumptionsForMonth({
    params: paramsForPrevMonthRequest,
    token,
  });

  return { currentMonthData, prevMonthData };
};

export const fetchConsumptionsForMonth = async ({
  params,
  token,
}: ConsumptionRequestPayload): Promise<MonthConsumptionData> => {
  const housingMonthData = await fetchHousingConsumptionData(params, token);
  const housingConsumptionArr = housingMonthData.housingConsumption || [];

  const normativeAndSubscriberData = await fetchNormativeConsumptionData(
    params,
    token,
  );

  if (
    !housingMonthData.housingConsumption ||
    housingMonthData.housingConsumption.length === 0
  ) {
    throw new Error();
  }

  return {
    housing: prepareDataForConsumptionGraph(housingConsumptionArr),
    normative: prepareDataForConsumptionGraphWithLastValue(
      normativeAndSubscriberData.normativeConsumption || [],
      housingConsumptionArr[housingConsumptionArr.length - 1]?.key,
    ),
    subscriber: prepareDataForConsumptionGraphWithLastValue(
      normativeAndSubscriberData.subscriberConsumption || [],
      housingConsumptionArr[housingConsumptionArr.length - 1]?.key,
    ),
  };
};

const fetchHousingConsumptionData = (
  params: ConsumptionDataPayload,
  token: CancelTokenSource,
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('Nodes/DataForHousingConsumptionPlot', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
    cancelToken: token.token,
  });

const fetchNormativeConsumptionData = (
  params: ConsumptionDataPayload,
  token: CancelTokenSource,
): Promise<GetDataForIndividualDevicesConsumptionPlotResponse> =>
  axios.get(
    'IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot',
    {
      params: {
        HousingStockIds: params.BuildingIds,
        From: params.From,
        To: params.To,
        ResourceType: params.ResourceType,
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
      headers: {
        'api-version': 2,
      },
      cancelToken: token.token,
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
