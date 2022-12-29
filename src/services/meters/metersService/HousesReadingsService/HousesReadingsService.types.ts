export type GetHousingStocksListRequestPayload = {
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  PageNumber?: number;
  PageSize?: number;
};

export type GetHousingStocksRequestPayload = GetHousingStocksListRequestPayload & {
  HousingStockId?: number | null;
};
