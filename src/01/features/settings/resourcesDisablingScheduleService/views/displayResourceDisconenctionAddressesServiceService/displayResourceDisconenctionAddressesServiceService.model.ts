import { createDomain } from 'effector';
import { groupBy } from 'lodash';
import {
  HousingStockShortResponse,
  ResourceDisconnectingResponse,
} from 'myApi';
import { StreetWithHousingStocks } from './displayResourceDisconenctionAddressesServiceService.types';

const domain = createDomain(
  'displayResourceDisconenctionAddressesServiceService',
);

const openModal = domain.createEvent<ResourceDisconnectingResponse>();
const closeModal = domain.createEvent();

const $disconnection = domain
  .createStore<ResourceDisconnectingResponse | null>(null)
  .on(openModal, (_, disconnection) => disconnection)
  .reset(closeModal);

const $addresses = $disconnection
  .map((disconnecion) => {
    if (!disconnecion) {
      return [];
    }
    const housingStocks = disconnecion.housingStocks || [];
    const preparedHousingStocks = groupBy(
      housingStocks,
      'address.mainAddress.street',
    );
    return Object.entries(preparedHousingStocks);
  })
  .reset(closeModal);

export const displayResourceDisconenctionAddressesServiceService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $addresses,
    $disconnection,
  },
};
