import { FullAddressResponse } from "../api/types";

export const getApartmentFromFullAddress = (
  address: FullAddressResponse | null,
  isCityNeeded?: boolean
) => {
  if (!address) return null;

  const cityText = isCityNeeded ? `${address.city},` : '';
  const corpusText = address.corpus ? `, корпус ${address?.corpus}` : '';
  const apartmentNumberText = address?.apartmentNumber
    ? `, кв. ${address.apartmentNumber}`
    : '';

  return `${cityText} ул. ${address.street}, д. ${address.housingStockNumber}${corpusText}${apartmentNumberText}`;
};
