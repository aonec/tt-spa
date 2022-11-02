import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type SearchIndividualDevicesRequestPayload = SearchIndividualDevicesParams & {
  Apartment?: string;
};

export type GetHousingByFilterRequestPayload = {
  City: string;
  Street: string;
  Number: string;
  Corpus?: string;
};
