import { AddressWithSearchString } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';

export type AddressAutoCompleteSearchProps = {
  streetsList: AddressWithSearchString[];
  handleChooseHousingStock: (id: number) => void;
};
