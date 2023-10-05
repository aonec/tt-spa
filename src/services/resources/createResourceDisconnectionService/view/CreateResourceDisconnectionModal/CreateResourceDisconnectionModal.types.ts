import {
  BuildingListResponse,
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceType,
  EResourceTypeNullableStringDictionaryItem,
  ResourceDisconnectingCreateRequest,
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';
import { EAddressDetails } from '../../createResourceDisconnectionService.types';

export type CreateResourceDisconnectionModalProps = {
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[];
  treeData: TreeSelectElement[];
  isOpen: boolean;
  handleClose: () => void;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest,
  ) => void;
  isInterHeatingSeason: boolean;
  isEdit: boolean;
  isDisconnectionLoading: boolean;
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
  dateFrom?: string | null;
  preselectedBuilding?: number | null;
  defaultResource?: EResourceType | null;
  preselectedBuildingData?: StreetWithBuildingNumbersResponse;
  defaultCity?: string | null;
};
