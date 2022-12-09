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
} from './resourceConsumptionService.types';
import { prepareDataForConsumptionGraph } from './resourceConsumptionService.utils';

export const fetchConsumptionsForTwoMonth = async (
  params: ConsumptionDataFilter
): Promise<ConsumptionDataForTwoMonth> => {
  const prevMonth = moment(params.From).subtract(1, 'month');
  const paramsForPrevMonthRequest = {
    ...params,
    From: prevMonth.startOf('month').utcOffset(0, true).format(),
    To: prevMonth.endOf('month').utcOffset(0, true).format(),
  };

  const currentHousingMonthData = await fetchHousingConsumptionData(params);
  const prevHousingMonthData = await fetchHousingConsumptionData(
    paramsForPrevMonthRequest
  );

  const currentNormativeAndSubscriberData = await fetchNormativeConsumptionData(
    params
  );
  const prevNormativeAndSubscriberData = await fetchNormativeConsumptionData(
    paramsForPrevMonthRequest
  );

  return {
    currentMonthData: {
      housing: prepareDataForConsumptionGraph(
        currentHousingMonthData.housingConsumption || []
      ),
      normative: prepareDataForConsumptionGraph(
        currentNormativeAndSubscriberData.normativeConsumption || []
      ),
      subscriber: prepareDataForConsumptionGraph(
        currentNormativeAndSubscriberData.subscriberConsumption || []
      ),
    },
    prevMonthData: {
      housing: prepareDataForConsumptionGraph(
        prevHousingMonthData.housingConsumption || []
      ),
      normative: prepareDataForConsumptionGraph(
        prevNormativeAndSubscriberData.normativeConsumption || []
      ),
      subscriber: prepareDataForConsumptionGraph(
        prevNormativeAndSubscriberData.subscriberConsumption || []
      ),
    },
  };
};

export const fetchHousingConsumptionData = (
  params: ConsumptionDataFilter
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('PipeNodes/DataForHousingConsumptionPlot', { params });

export const fetchNormativeConsumptionData = (
  params: ConsumptionDataFilter
): Promise<GetDataForIndividualDevicesConsumptionPlotResponse> =>
  axios.get(
    'IndividualDeviceReadings/DataForSubscriberAndNormativeConsumptionPlot',
    { params }
  );

export const fetchAddresses = (): Promise<
  HouseManagementWithStreetsResponse[]
> =>
  axios.get(
    'HousingStocks/ExistingStreetsWithHousingStockNumbersWithHouseManagement'
  );
