import { PollResponse } from 'api/types';
import { IndividualDeviceExportQuery } from '../exportStandartReportService.types';

export type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  handleStartExport: (payload: IndividualDeviceExportQuery) => void;
  lastPollState: PollResponse | null;
};
