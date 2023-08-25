import { createDomain } from 'effector';
import { groupBy } from 'lodash';
import {
  BuildingShortResponse,
  ResourceDisconnectingResponse,
} from 'api/types';

const domain = createDomain(
  'displayResourceDisconenctionAddressesServiceService',
);

const openModal = domain.createEvent<ResourceDisconnectingResponse>();
const closeModal = domain.createEvent();

const $disconnection = domain
  .createStore<ResourceDisconnectingResponse | null>(null)
  .on(openModal, (_, disconnection) => disconnection)
  .reset(closeModal);

const $addresses = domain
  .createStore<[string, BuildingShortResponse[]][]>([])
  .on(openModal, (_, disconnection) => {
    if (!disconnection) {
      return [];
    }

    const buildings = disconnection.buildings || [];
    const preparedHousingStocks = groupBy(
      buildings,
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
