import { ApartmentListResponse, ApartmentResponse } from 'myApi';

export const getApartmentAddressString = (
  apartment: ApartmentResponse | ApartmentListResponse,
  isCityNeeded?: boolean
) => {
  const housingStock = apartment.housingStock;

  const address = housingStock?.address?.mainAddress;
  const city = isCityNeeded ? address?.city : '';
  const corpusText = address?.corpus ? ` корпус ${address?.corpus},` : '';

  return `${city} ул. ${address?.street}, д. ${address?.number},${corpusText} кв. ${apartment.apartmentNumber}`;
};
