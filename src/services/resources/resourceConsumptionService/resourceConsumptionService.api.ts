import { axios } from 'api/axios';
import queryString from 'query-string';
import {
  ConsumptionDataPayload,
  ResourceConsumptionWithNull,
} from './resourceConsumptionService.types';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import {
  prepareDataForConsumptionGraph,
  prepareDataForConsumptionGraphWithLastValue,
} from './resourceConsumptionService.utils';

export const fetchSummaryHousingConsumptions = (
  params: ConsumptionDataPayload,
): Promise<GetSummaryHousingConsumptionsByResourcesResponse> => {
  console.log(
    new URLSearchParams([
      ...params.BuildingIds.map((id) => ['BuildingIds', id.toString()]),
      ...params.AdditionalHousingStockIds.map((id) => [
        'AdditionalHousingStockIds',
        id.toString(),
      ]),
    ]).toString(),
  );

  console.log(queryString.stringify(params));

  return axios.get('Nodes/SummaryHousingConsumptionsByResources', {
    params,
    paramsSerializer: (params) => {
      return new URLSearchParams(params).toString();
    },
  });
};

export const fetchHousingConsumptionPlot = async (
  params: ConsumptionDataPayload,
): Promise<{ housing: ResourceConsumptionWithNull[] }> => {
  const res: GetDataForHousingConsumptionPlotResponse = await axios.get(
    'Nodes/DataForHousingConsumptionPlot',
    {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    },
  );
  const housingConsumptionArr = res.housingConsumption || [];

  const housing: ResourceConsumptionWithNull[] = prepareDataForConsumptionGraph(
    housingConsumptionArr,
  );

  return { housing };
};

export const fetchNormativeAndSubscriberConsumptionData = async (
  params: ConsumptionDataPayload,
): Promise<{
  normative: ResourceConsumptionWithNull[];
  subscriber: ResourceConsumptionWithNull[];
}> => {
  const normativeAndSubscriberData: GetDataForIndividualDevicesConsumptionPlotResponse =
    await axios.get(
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
      },
    );

  const normative: ResourceConsumptionWithNull[] =
    prepareDataForConsumptionGraphWithLastValue(
      normativeAndSubscriberData.normativeConsumption || [],
    );
  const subscriber: ResourceConsumptionWithNull[] =
    prepareDataForConsumptionGraphWithLastValue(
      normativeAndSubscriberData.subscriberConsumption || [],
    );

  return { normative, subscriber };
};
