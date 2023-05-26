import { ActsJournalRequestParams } from 'services/actsJournalService/actsJournalService.types';

export type ActsListHeaderProps = {
  setActsFilter: (filter: ActsJournalRequestParams) => void;
  filter: ActsJournalRequestParams;
};
