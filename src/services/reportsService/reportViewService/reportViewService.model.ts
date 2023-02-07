import { createDomain, forward } from 'effector';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  $existingCities,
  ExistingCitiesGate,
} from '01/features/housingStocks/displayHousingStockCities/models';
import { getAddressesWithHouseManagements } from './reportViewService.api';
import { HouseManagementWithStreetsResponse } from 'myApi';
import { createGate } from 'effector-react';
import { ReportFiltrationFormValues } from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

const domain = createDomain('reportViewService');

const AddressesWithHouseManagementsGate = createGate();

const fetchAddressesWithHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementWithStreetsResponse[]
>(getAddressesWithHouseManagements);

const setFiltrationValues = domain.createEvent<ReportFiltrationFormValues>();

const $addressesWithHouseManagements = domain
  .createStore<HouseManagementWithStreetsResponse[]>([])
  .on(fetchAddressesWithHouseManagementsFx.doneData, (_, data) => data)
  .reset(AddressesWithHouseManagementsGate.close);

const $filtrationValues = domain
  .createStore<ReportFiltrationFormValues>({
    city: null,
    houseManagement: null,
    housingStockId: null,
    resources: [],
    reportOption: null,
    from: null,
    to: null,
    reportDatePeriod: null,
  })
  .on(setFiltrationValues, (_, values) => values);

forward({
  from: AddressesWithHouseManagementsGate.open,
  to: fetchAddressesWithHouseManagementsFx,
});

export const reportViewService = {
  inputs: {
    setFiltrationValues,
  },
  outputs: {
    $existingCities,
    $houseManagements: houseManagementsService.outputs.$houseManagements,
    $addressesWithHouseManagements,
    $filtrationValues,
  },
  gates: {
    ExistingCitiesGate,
    AddressesWithHouseManagementsGate,
    HouseManagementsGate: houseManagementsService.gates.HouseManagementsGate,
  },
};
