export type GetElectricNodesRequestParams =
  Partial<GetElectricNodesByAddress> & {
    HousingStockId?: number;
  };

export type GetElectricNodesByAddress = {
  'Address.City': string;
  'Address.Street': string;
  'Address.HousingStockNumber': string;
  'Address.Corpus'?: string;
};
