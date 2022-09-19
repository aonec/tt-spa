import {
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceTypeNullableStringDictionaryItem,
  HeatingStationResponse,
  ResourceDisconnectingCreateRequest,
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
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
  isEdit: boolean;
  isDisconnectionLoading: boolean;
  resourceDisconnection: ResourceDisconnectingResponse | null;
  handleEditResourceDisconnection: (
    payload: ResourceDisconnectingUpdateRequest
  ) => void;
  handleUpdateDocument: (id: number) => void;
  handleDeleteDocument: () => void;
};

export type ExistingStreetWithHousingStocks = {
  title: string;
  key: string | number;
  value: string | number;
  children?: { title: string; value: number; key: number }[];
};
