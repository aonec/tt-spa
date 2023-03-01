import { displayInspectorsService } from '01/features/Inspectors/displayInspectors/displayInspectorsService.models';
import { createDomain } from 'effector';
import { HousingStockResponse } from 'myApi';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { patchHousingStockInspectorInfo } from './inspectorHousingStockService.api';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from './inspectorHousingStockService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const inspectorHousingStockServiceDomain = createDomain(
  'inspectorHousingStockService',
);

const $currentHousingStockUpdates =
  inspectorHousingStockServiceDomain.createStore<CurrentHousingStockUpdate[]>(
    [],
  );

const updateHousingStockInspectorInfoFx =
  inspectorHousingStockServiceDomain.createEffect<
    PatchHousingStockInspectorInfoPayload,
    HousingStockResponse | null,
    EffectFailDataAxiosError
  >(patchHousingStockInspectorInfo);

const updateHousingStockInspectorInfo =
  inspectorHousingStockServiceDomain.createEvent<PatchHousingStockInspectorInfoPayload>();

updateHousingStockInspectorInfoFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const inspectorHousingStockService = {
  inputs: {
    updateHousingStockInspectorInfo,
    updateHousingStockInspectorInfoFx,
  },
  outputs: {
    $inspectors: displayInspectorsService.outputs.$inspectorsList,
    $housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
    $currentHousingStockUpdates,
  },
};
