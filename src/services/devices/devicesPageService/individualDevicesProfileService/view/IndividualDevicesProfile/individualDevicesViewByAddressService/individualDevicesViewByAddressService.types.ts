import { SearchIndividualDevicesParams } from '../../../individualDevicesProfileService.types';

export type SearchIndividualDevicesRequestPayload = SearchIndividualDevicesParams & {
  Apartment?: string;
};
