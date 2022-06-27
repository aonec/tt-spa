import { HousingStockListResponse } from 'myApi';

export const getHousingStockAddress = (
  housingStock: HousingStockListResponse,
  isCityNeeded?: boolean
) => {
  const { city, corpus, street, number } =
    housingStock.address?.mainAddress || {};
  const cityText = isCityNeeded ? city : '';
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `${cityText} ${street}, ${number}${corpusText}`;
};
