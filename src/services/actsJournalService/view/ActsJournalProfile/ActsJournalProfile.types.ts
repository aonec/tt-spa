import { Event } from 'effector';
import { AddApartmentActRequest, ApartmentActResponsePagedList } from 'myApi';
import { ActsJournalRequestParams } from 'services/actsJournalService/actsJournalService.types';

export type ActsJournalProfileProps = {
  handleCreateAct: (
    payload: Omit<AddApartmentActRequest, 'apartmentId'>,
  ) => void;
  isCreateLoading: boolean;
  isActsLoading: boolean;
  actsPagedData: ApartmentActResponsePagedList | null;
  setActsFilter: (filter: ActsJournalRequestParams) => void;
  actsFilter: ActsJournalRequestParams;
  setPageNumber: (pageNumber: number) => void;
  actCreated: Event<void>;
};
