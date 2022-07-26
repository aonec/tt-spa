import { EResourceTypeConsumptionRateResponseDictionaryItem } from '../../api/types';
import { axios } from '../../api/axios';

export const getConsuptionRates = (
  managementFirmId: number
): Promise<EResourceTypeConsumptionRateResponseDictionaryItem[]> =>
  axios.get(`ManagingFirms/${managementFirmId}/ConsumptionRates`);
