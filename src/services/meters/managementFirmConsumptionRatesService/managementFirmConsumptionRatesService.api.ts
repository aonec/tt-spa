import { axios } from "../../../api/axios";
import { EResourceTypeConsumptionRateResponseDictionaryItem } from "../../../api/types";

export const getConsuptionRates = (
  managementFirmId: number
): Promise<EResourceTypeConsumptionRateResponseDictionaryItem[]> =>
  axios.get(`ManagingFirms/${managementFirmId}/ConsumptionRates`);
