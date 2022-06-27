import { ApartmentResponse } from 'myApi';

export const getApartmentAddressString = (apartment: ApartmentResponse) => {
  const housingStock = apartment.housingStock;

  const address = housingStock?.address?.mainAddress;

  return `${address?.city} ул. ${address?.street}, д. ${address?.number}, кв. ${
    apartment.apartmentNumber
  }${address?.corpus || ''}`;
};
