import { HousingStockResponse, ResourceDisconnectingResponse } from 'api/types';

export type HousingStockInfoProps = {
  housingStock: HousingStockResponse;
  resourceDisconnections: ResourceDisconnectingResponse[];
};
