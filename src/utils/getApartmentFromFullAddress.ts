import { FullAddressResponse } from 'myApi';

export const getApartmentFromFullAddress = (
  address: FullAddressResponse | null,
  isCityNeeded?: boolean
) => {
  if (!address) return null;
  const { city, apartmentNumber, housingStockNumber, street, corpus } = address;

  const cityText = isCityNeeded ? `${city},` : '';
  const corpusText = corpus ? ` корпус ${address?.corpus},` : '';

  return `${cityText} ул. ${street}, д. ${housingStockNumber},${corpusText} кв. ${apartmentNumber}`;
};
