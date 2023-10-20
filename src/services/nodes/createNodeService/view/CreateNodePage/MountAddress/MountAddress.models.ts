import { createEffect, createStore } from 'effector';
import { createNodeService } from './../../../createNodeService.model';
import { message } from 'antd';

import { BuildingListResponse } from 'api/types';
import { GetHousingStocksRequestPayload } from 'services/objects/displayObjectsListService/displayObjectsListService.types';
import { EffectFailDataAxiosError } from 'types';
import { getBuilding } from './MountAddress.api';

const fetchBuildingFx = createEffect<
  GetHousingStocksRequestPayload,
  BuildingListResponse | null,
  EffectFailDataAxiosError
>(getBuilding);

const $buildingListItem = createStore<BuildingListResponse | null>(null)
  .on(fetchBuildingFx.doneData, (prev, housingStock) => housingStock || prev)
  .reset(createNodeService.gates.CreateNodeGate.close);

const $isLoading = fetchBuildingFx.pending;

fetchBuildingFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

fetchBuildingFx.doneData.watch((housingStock) => {
  if (!housingStock) message.warning('Адрес отсутствует');
});

export const mountAddressService = {
  outputs: { $isLoading, $buildingListItem },
  effects: { fetchBuildingFx },
};
