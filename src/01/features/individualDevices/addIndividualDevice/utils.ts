import { ApartmentResponse, EResourceType } from './../.../../api/types';

export function getAddress(apartment: ApartmentResponse | null) {
  if (!apartment) return;

  const house = apartment.housingStock?.address?.mainAddress;

  return `${house?.city}, ул. ${house?.street}, ${
    house?.corpus ? `к. ${house?.corpus},` : ''
  } д. ${house?.number}, кв. ${apartment.apartmentNumber}`;
}

export function getBitDepthAndScaleFactor(
  resource: EResourceType
): {
  bitDepth: number;
  scaleFactor: number;
} {
  switch (resource) {
    case EResourceType.Electricity:
      return {
        bitDepth: 6,
        scaleFactor: 1,
      };

    default:
      return {
        bitDepth: 5,
        scaleFactor: 1,
      };
  }
}
