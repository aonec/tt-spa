import { HousingStockResponse } from './../../../../myApi';

export function getAddress(house: HousingStockResponse | null) {
  if (!house) return;
  return `${house?.city}, ул. ${house?.street}, ${
    house.corpus ? `к. ${house.corpus},` : ''
  } кв. ${house.number}`;
}
