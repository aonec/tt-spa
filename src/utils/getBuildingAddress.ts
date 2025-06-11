import {
  BuildingAddressResponse,
  BuildingAddress,
  BuildingAddressItemResponse,
} from 'api/types';

export const getBuildingAddress = (
  housingStock: { address: BuildingAddressResponse | null } | null,
  isCityNeeded?: boolean,
) => {
  if (!housingStock) return null;

  const { city, corpus, street, number } =
    housingStock.address?.mainAddress || {};
  const cityText = isCityNeeded ? `${city},` : '';
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `${cityText} ${street}, ${number}${corpusText}`;
};

export const getBuildingAddressString = (address?: BuildingAddress | null) => {
  if (!address) {
    return '';
  }
  const { street, houseNumber, houseCorpus } = address;
  const corpusText = houseCorpus ? `, корпус ${houseCorpus}` : '';

  return `ул. ${street}, ${houseNumber}${corpusText}`;
};

export const getBuildingItemAddressString = (
  address?: BuildingAddressItemResponse | null,
) => {
  if (!address) {
    return '';
  }
  const { street, number, corpus } = address;
  const corpusText = corpus ? `, корпус ${number}` : '';

  return `ул. ${street}, ${number}${corpusText}`;
};
