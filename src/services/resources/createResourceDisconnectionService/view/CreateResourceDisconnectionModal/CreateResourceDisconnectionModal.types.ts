import {
  EResourceDisconnectingTypeNullableStringDictionaryItem,
  EResourceTypeNullableStringDictionaryItem,
  ResourceDisconnectingCreateRequest,
  ResourceDisconnectingResponse,
  ResourceDisconnectingUpdateRequest,
} from 'myApi';
import { EAddressDetails } from '../../createResourceDisconnectionService.types';

export type CreateResourceDisconnectionModalProps = {
  resourceTypes: EResourceTypeNullableStringDictionaryItem[];
  disconnectingTypes: EResourceDisconnectingTypeNullableStringDictionaryItem[];
  treeData: TreeSelectElement[];
  isOpen: boolean;
  handleClose: () => void;
  handleCreateResourceDisconnection: (
    payload: ResourceDisconnectingCreateRequest
  ) => void;
  isInterHeatingSeason: boolean;
  isEdit: boolean;
  isDisconnectionLoading: boolean;
  resourceDisconnection: ResourceDisconnectingResponse | null;
  handleEditResourceDisconnection: (
    payload: ResourceDisconnectingUpdateRequest
  ) => void;
  handleUpdateDocument: (id: number) => void;
  setTypeOfAddress: (type: EAddressDetails) => void;
  typeOfAddress: EAddressDetails;
  isHousingStocksLoading: boolean;
};

export type TreeSelectElement = {
  title: string;
  key: string | number;
  value: string | number;
  children?: TreeSelectElement[];
};
