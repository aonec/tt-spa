import {
  EResourceDisconnectingType,
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceType,
  EResourceTypeNullableStringDictionaryItem,
  HeatingStationResponse,
  HousingStockShortResponse,
  ResourceDisconnectingCreateRequest,
} from 'myApi';
import { Document } from 'ui-kit/DocumentsService';
import { ExistingStreetWithHousingStocks } from '../CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';

export type CreateResourceDisconnectionFormProps = {
  cities: string[];
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[];
  heatingStations: HeatingStationResponse[];
  treeData: ExistingStreetWithHousingStocks[];
  selectedCity: string;
  formId: string;
  handleSubmit: (payload: ResourceDisconnectingCreateRequest) => void;
  handleSelectCity: (city: string) => void;
  handleSelectHeatingStation: (id: string) => void;
  isInterHeatingSeason: boolean;
};

export type CreateResourceDisconnectionFormTypes = {
  resource: EResourceType | null;
  disconnectingType: EResourceDisconnectingType | null;
  sender: string;

  heatingStationId?: string | null;
  housingStockIds: number[];

  startDate: string;
  startHour: string;

  endDate: string;
  endHour: string;

  documentId: null | number;
};

export type TreeSelectLabelValueType = {
  key?: string | number;
  value?: string | number;
  label?: React.ReactNode;
};
