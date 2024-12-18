import { AccountingNodesReadingsYearHistoryResponse } from '../../AccountingNodesReadingsService.types';

export type Props = {
  preparedReadings: AccountingNodesReadingsYearHistoryResponse[];
  handleCloseHistory: () => void;
  isOpen: boolean;
};
