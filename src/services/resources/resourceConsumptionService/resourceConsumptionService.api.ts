import { axios } from '01/axios';
import moment from 'moment';
import { GetDataForHousingConsumptionPlotResponse } from 'myApi';
import { HousingConsumptionDataFilter } from './resourceConsumptionService.types';

export const fetchHousingConsumptionsForTwoMonth = async (
  params: HousingConsumptionDataFilter
) => {
  const prevMonth = moment(params.From).subtract(1, 'month');
  const paramsForPrevMonthRequest = {
    ...params,
    From: prevMonth.startOf('month').utcOffset(0, true).format(),
    To: prevMonth.endOf('month').utcOffset(0, true).format(),
  };

  const currentMonthData = await fetchHousingConsumptionData(params);
  const prevMonthData = await fetchHousingConsumptionData(
    paramsForPrevMonthRequest
  );

  return {
    currentMonthData: currentMonthData.housingConsumption || [],
    prevMonthData: prevMonthData.housingConsumption || [],
  };
};

export const fetchHousingConsumptionData = (
  params: HousingConsumptionDataFilter
): Promise<GetDataForHousingConsumptionPlotResponse> =>
  axios.get('PipeNodes/DataForHousingConsumptionPlot', { params });
