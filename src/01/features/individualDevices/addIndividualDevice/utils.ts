import { ApartmentResponse, EResourceType } from './../../../../myApi';

export function getAddress(apartment: ApartmentResponse | null) {
  if (!apartment) return;

  const house = apartment.housingStock;

  return `${house?.city}, ул. ${house?.street}, ${
    house?.corpus ? `к. ${house?.corpus},` : ''
  } кв. ${house?.number}`;
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
        scaleFactor: 2,
      };

    default:
      return {
        bitDepth: 5,
        scaleFactor: 3,
      };
  }
}
