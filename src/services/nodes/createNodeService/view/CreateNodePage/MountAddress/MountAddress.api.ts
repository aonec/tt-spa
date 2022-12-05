import { getHousuingStocks } from 'services/objects/displayObjectsListService/displayObjectsListService.api';
import { GetHousingStocksRequestPayload } from 'services/objects/displayObjectsListService/displayObjectsListService.types';

export const getHousingStock = async (
  values: GetHousingStocksRequestPayload
) => {
  const housingStocks = await getHousuingStocks(values);

  const housingStock = housingStocks.items?.[0];

  return housingStock || null;
};
