import { createNodeService } from './../../../createNodeService.model';
import { message } from 'antd';
import { createDomain } from 'effector';
import { HousingStockListResponse } from 'myApi';
import { GetHousingStocksRequestPayload } from 'services/objects/displayObjectsListService/displayObjectsListService.types';
import { EffectFailDataAxiosError } from 'types';
import { getHousingStock } from './MountAddress.api';

const domain = createDomain('mountAddressService');

const fetchHousingStockFx = domain.createEffect<
  GetHousingStocksRequestPayload,
  HousingStockListResponse | null,
  EffectFailDataAxiosError
>(getHousingStock);

const $housingStockListItem = domain
  .createStore<HousingStockListResponse | null>(null)
  .on(
    fetchHousingStockFx.doneData,
    (prev, housingStock) => housingStock || prev,
  )
  .reset(createNodeService.gates.CreateNodeGate.close);

const $isLoading = fetchHousingStockFx.pending;

fetchHousingStockFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

fetchHousingStockFx.doneData.watch((housingStock) => {
  if (!housingStock) message.warning('Адрес отсутствует');
});

export const mountAddressService = {
  outputs: { $isLoading, $housingStockListItem },
  effects: { fetchHousingStockFx },
};
