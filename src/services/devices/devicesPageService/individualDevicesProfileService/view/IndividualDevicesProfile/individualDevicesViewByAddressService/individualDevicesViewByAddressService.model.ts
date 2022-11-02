import { createDomain, sample, forward, guard, Store } from 'effector';
import { createGate } from 'effector-react';
import { HousingByFilterResponse } from 'myApi';
import { getHousingsByFilter } from './individualDevicesViewByAddressService.api';
import {
  GetHousingByFilterRequestPayload,
  SearchIndividualDevicesRequestPayload,
} from './individualDevicesViewByAddressService.types';

const domain = createDomain('individualDevicesViewByAddressService');

const setIndividualDeviceSearchRquestPayload = domain.createEvent<SearchIndividualDevicesRequestPayload>();

const IndividualDevicesSearchGate = createGate();

const $individualDeviceSearchRquestPayload = domain
  .createStore<SearchIndividualDevicesRequestPayload | null>(null)
  .on(setIndividualDeviceSearchRquestPayload, (_, data) => data)
  .reset(IndividualDevicesSearchGate.close);

const fetchHousingsByFilter = domain.createEffect<
  GetHousingByFilterRequestPayload,
  HousingByFilterResponse | null
>(getHousingsByFilter);

const $housingsByFilter = domain
  .createStore<HousingByFilterResponse | null>(null)
  .on(fetchHousingsByFilter.doneData, (_, data) => data);

const $getHousingsByFilterRquestPayload: Store<GetHousingByFilterRequestPayload | null> = $individualDeviceSearchRquestPayload.map(
  (values) => {
    if (!(values?.City && values?.Street && values?.HouseNumber)) return null;

    const payload: GetHousingByFilterRequestPayload = {
      City: values.City,
      Street: values.Street,
      Number: values.HouseNumber,
      Corpus: values.HouseCorpus,
    };

    return payload;
  }
);

guard({
  clock: $getHousingsByFilterRquestPayload,
  filter: (payload): payload is GetHousingByFilterRequestPayload =>
    Boolean(payload),
  target: fetchHousingsByFilter,
});

const $isHousingsByFilterLoading = fetchHousingsByFilter.pending;

export const individualDevicesViewByAddressService = {
  inputs: {
    setIndividualDeviceSearchRquestPayload,
  },
  outputs: {
    $housingsByFilter,
    $isHousingsByFilterLoading,
  },
  gates: {
    IndividualDevicesSearchGate,
  },
};
