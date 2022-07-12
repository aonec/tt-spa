import { EResourceTypeConsumptionRateResponseDictionaryItem } from 'myApi';
import { axios } from '01/axios';

export const getConsuptionRates = (
  managementFirmId: number
): Promise<EResourceTypeConsumptionRateResponseDictionaryItem[]> =>
  axios.get(`ManagingFirms/${managementFirmId}/ConsumptionRates`);
