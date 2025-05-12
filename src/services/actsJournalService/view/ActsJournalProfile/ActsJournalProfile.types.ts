import { Event } from 'effector';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from 'api/types';
import { ActsJournalRequestParams } from 'services/actsJournalService/actsJournalService.types';
import { Document } from 'ui-kit/DocumentsService';

export type ActsJournalProfileProps = {
  handleCreateAct: (
    payload: Omit<AddApartmentActRequest, 'apartmentId'>,
  ) => void;
  isCreateLoading: boolean;
  isActsLoading: boolean;
  actsPagedData: ApartmentActResponsePagedList | null;
  updateActsFilter: (filter: ActsJournalRequestParams) => void;
  actsFilter: ActsJournalRequestParams;
  setPageNumber: (pageNumber: number) => void;
  actCreated: Event<void>;
  handleResetAddressSearchForm: () => void;
  setModalOpen: (payload: boolean) => void;
  uploadedFile: Document | null;
  setViewModalOpen: (payload: boolean) => void;
};
