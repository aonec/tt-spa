import { AddressSearchValues } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export type GetApartmentRequestPayload = AddressSearchValues & { question?: string }
