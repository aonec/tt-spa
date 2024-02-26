import { axios } from 'api/axios';
import queryString from 'query-string';
import {
  ConsumptionRequestPayload,
  ResourceConsumptionWithNull,
} from './resourceConsumptionService.types';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import { prepareDataForConsumptionGraph } from './resourceConsumptionService.utils';

export const fetchSummaryHousingConsumptions = ({
  params,
  token,
}: ConsumptionRequestPayload): Promise<GetSummaryHousingConsumptionsByResourcesResponse> =>
  axios.get('Nodes/SummaryHousingConsumptionsByResources', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
    cancelToken: token.token,
  });

export const fetchHousingConsumptionPlot = async ({
  params,
  token,
}: ConsumptionRequestPayload): Promise<{
  housing: ResourceConsumptionWithNull[];
}> => {
  const res: GetDataForHousingConsumptionPlotResponse = await axios.get(
    'Nodes/DataForHousingConsumptionPlot',
    {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
      cancelToken: token.token,
    },
  );
  const housingConsumptionArr = res.housingConsumption || [];

  const housing: ResourceConsumptionWithNull[] = prepareDataForConsumptionGraph(
    housingConsumptionArr,
  );

  return { housing };
};

export const fetchNormativeAndSubscriberConsumptionData = async ({
  params,
  token,
}: ConsumptionRequestPayload): Promise<{
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
        cancelToken: token.token,
      },
    );

  const normative: ResourceConsumptionWithNull[] =
    prepareDataForConsumptionGraph(
      normativeAndSubscriberData.normativeConsumption || [],
    );
  const subscriber: ResourceConsumptionWithNull[] =
    prepareDataForConsumptionGraph(
      normativeAndSubscriberData.subscriberConsumption || [],
    );

  return { normative, subscriber };
};
