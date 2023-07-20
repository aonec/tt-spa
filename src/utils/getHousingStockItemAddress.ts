import { BuildingAddressItemResponse } from 'api/myApi';

export const getHousingStockItemAddress = (
  address: BuildingAddressItemResponse,
) => {
  const { street, number, corpus } = address;
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `ул. ${street}, ${number}${corpusText}`;
};
