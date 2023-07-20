import { AssignmentResponse, ControllerResponse } from 'api/myApi';
import {
  DownloadControllerWorkFileRequestPayload,
  SearchFormType,
} from '../appointmentsJournalService.types';

export type Props = {
  form: SearchFormType;
  assignmentslist: AssignmentResponse[] | null;
  isLoadingAssygnments: boolean;
  controllersList: ControllerResponse[];
  downloadWorkFile: (payload: DownloadControllerWorkFileRequestPayload) => void;
};
