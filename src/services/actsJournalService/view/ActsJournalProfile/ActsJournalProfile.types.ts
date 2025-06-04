import { Event } from 'effector';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  DocumentResponse,
} from 'api/types';
import { ActsJournalRequestParams } from 'services/actsJournalService/actsJournalService.types';

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
  uploadedFile: DocumentResponse | null;
  setViewModalOpen: (payload: boolean) => void;
  handleDeleteDoc: (payload: number) => void;
  handleOpenDoc: (payload: number) => void;
  resetActAddress: () => void;
};
