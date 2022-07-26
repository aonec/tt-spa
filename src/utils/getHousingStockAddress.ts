import { HousingStockListResponse, HousingStockShortResponse } from "../api/types";

export const getHousingStockAddress = (
  housingStock: HousingStockListResponse | HousingStockShortResponse | null,
  isCityNeeded?: boolean
) => {
  if (!housingStock) return null;

  const { city, corpus, street, number } =
    housingStock.address?.mainAddress || {};
  const cityText = isCityNeeded ? `${city},` : '';
  const corpusText = corpus ? `, корпус ${corpus}` : '';

  return `${cityText} ${street}, ${number}${corpusText}`;
};
