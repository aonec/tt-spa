import { ApartmentResponse } from './../../../../myApi';

export function getAddress(apartment: ApartmentResponse | null) {
  if (!apartment) return;

  const house = apartment.housingStock;

  return `${house?.city}, ул. ${house?.street}, ${
    house?.corpus ? `к. ${house?.corpus},` : ''
  } кв. ${house?.number}`;
}
