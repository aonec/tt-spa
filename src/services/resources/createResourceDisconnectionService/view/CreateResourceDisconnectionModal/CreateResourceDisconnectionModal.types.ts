import {
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceTypeNullableStringDictionaryItem,
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';

export type CreateResourceDisconnectionModalProps = {
  selectedCity: string;
  cities: string[];
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[];
  heatingStations: HeatingStationResponse[];
  treeData: ExistingStreetWithHousingStocks[];
  isOpen: boolean;
  handleClose: () => void;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest
  ) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
  isInterHeatingSeason: boolean;
};

export type ExistingStreetWithHousingStocks = {
  title: string;
  key: string | number;
  value: string | number;
  children?: { title: string; value: number; key: number }[];
};
