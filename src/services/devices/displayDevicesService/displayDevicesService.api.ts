import { CalculatorsListRequestPayload } from "../../../01/features/carlculators/calculatorsIntoHousingStockService/calculatorsIntoHousingStockService.types";
import { axios } from "../../../api/axios";
import { CalculatorListResponsePagedList } from "../../../api/types";

export const getCalculatorsList = (
  params: CalculatorsListRequestPayload
): Promise<CalculatorListResponsePagedList> =>
  axios.get(`Calculators`, {
    params,
  });
