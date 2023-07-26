import { axios } from 'api/axios';
import moment from 'moment';
import queryString from 'query-string';
import { ConsumptionDataPayload } from './resourceConsumptionService.types';
import {
  GetDataForHousingConsumptionPlotResponse,
  GetDataForIndividualDevicesConsumptionPlotResponse,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';

export const fetchSummaryHousingConsumptions = (
  params: ConsumptionDataPayload,
): Promise<GetSummaryHousingConsumptionsByResourcesResponse> =>
  axios.get('Nodes/SummaryHousingConsumptionsByResources', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

export const fetchHousingConsumptionPlot = (
  params: ConsumptionDataPayload,
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('Nodes/DataForHousingConsumptionPlot', {
    params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

export const fetchNormativeAndSubscriberConsumptionData = (
  params: ConsumptionDataPayload,
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
    },
  );
