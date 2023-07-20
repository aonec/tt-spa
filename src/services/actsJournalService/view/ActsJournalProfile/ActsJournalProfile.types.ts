import { Event } from 'effector';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
} from 'api/myApi';
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
};
