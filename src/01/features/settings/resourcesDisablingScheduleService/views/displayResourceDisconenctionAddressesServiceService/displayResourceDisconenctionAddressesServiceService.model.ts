import { createDomain } from 'effector';
import { groupBy } from 'lodash';
import {
  HousingStockShortResponse,
  ResourceDisconnectingResponse,
} from 'myApi';

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
  .createStore<[string, HousingStockShortResponse[]][]>([])
  .on(openModal, (_, disconnection) => {
    if (!disconnection) {
      return [];
    }

    const housingStocks = disconnection.housingStocks || [];
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
