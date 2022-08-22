import { GetApartmentsListRequestPayload } from 'services/objects/displayApartmentsListService/displayApartmentsListService.types';

export type PersonalNumbersSearchProps = {
  handleSearch: (params: GetApartmentsListRequestPayload) => void;
  cities: string[] | null;
};
