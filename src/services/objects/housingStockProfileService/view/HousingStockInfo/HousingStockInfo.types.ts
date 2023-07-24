import { HousingStockResponse, ResourceDisconnectingResponse } from 'myApi';

export type HousingStockInfoProps = {
  housingStock: HousingStockResponse;
  resourceDisconnections: ResourceDisconnectingResponse[];
};
