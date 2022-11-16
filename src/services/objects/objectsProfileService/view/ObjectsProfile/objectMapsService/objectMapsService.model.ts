import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import { StreetWithHousingStockNumbersResponsePagedList } from 'myApi';
import { getAdresses } from 'services/objects/objectsProfileService/soiReportService/soiReportService.api';
import { GetAddressesRequestPayload } from 'services/objects/objectsProfileService/soiReportService/soiReportService.model.types';

const domain = createDomain('objectMapsService');

const fetchAdressesFx = domain.createEffect<
  GetAddressesRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

const $addressesPagedList = domain
  .createStore<StreetWithHousingStockNumbersResponsePagedList | null>(null)
  .on(fetchAdressesFx.doneData, (_, data) => data);

const StreetsWithHousingStocksGate = createGate();

sample({
  clock: StreetsWithHousingStocksGate.open,
  fn: () => ({}),
  target: fetchAdressesFx,
});

export const objectMapsService = {
  inputs: {},
  outputs: {
    $addressesPagedList,
  },
  gates: { StreetsWithHousingStocksGate },
};
