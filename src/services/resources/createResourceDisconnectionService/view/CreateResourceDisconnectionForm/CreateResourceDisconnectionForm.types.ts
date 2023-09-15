import {
  BuildingListResponse,
  EResourceDisconnectingType,
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceType,
  EResourceTypeNullableStringDictionaryItem,
  ResourceDisconnectingCreateRequest,
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import { EAddressDetails } from '../../createResourceDisconnectionService.types';

export type CreateResourceDisconnectionFormProps = {
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[];
  treeData: TreeSelectElement[];
  formId: string;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  isInterHeatingSeason: boolean;
  isEdit: boolean;
  resourceDisconnection: ResourceDisconnectingResponse | null;
  handleEditResourceDisconnection: (
    payload: ResourceDisconnectingUpdateRequest,
  ) => void;
  handleUpdateDocument: (id: number) => void;
  setTypeOfAddress: (type: EAddressDetails) => void;
  typeOfAddress: EAddressDetails;
  isHousingStocksLoading: boolean;
  existingCities: string[];
  selectedCity: string | null;
  selectCity: (city: string) => void;
  selectedBuilding: BuildingListResponse | null;
  handleCreateDisconnectionState?: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  handleCloseModal: () => void;
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

export const DetailsSelectLookup = [
  { key: EAddressDetails.All, value: 'УК' },
  { key: EAddressDetails.HouseManagements, value: 'Домоуправления' },
  { key: EAddressDetails.HeatingStation, value: 'ЦТП' },
];

export type TreeSelectValue =
  | TreeSelectLabelValueType
  | TreeSelectLabelValueType[]
  | string
  | (string | number)[]
  | number;
