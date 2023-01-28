import { HousingStockAddressItemResponse } from 'myApi';

export const getHousingStockItemAddress = (
  address: HousingStockAddressItemResponse
) => {
  const { street, number, corpus } = address;
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `ул. ${street}, ${number}${corpusText}`;
};
