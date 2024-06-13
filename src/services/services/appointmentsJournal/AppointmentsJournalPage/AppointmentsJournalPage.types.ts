import { AssignmentResponse, ControllerResponse } from 'api/types';
import { DownloadControllerWorkFileRequestPayload } from '../appointmentsJournalService.types';
import dayjs from 'dayjs';

export type Props = {
  assignmentslist: AssignmentResponse[] | null;
  isLoadingAssygnments: boolean;
  controllersList: ControllerResponse[];
  downloadWorkFile: (payload: DownloadControllerWorkFileRequestPayload) => void;
  setForm: (payload: FormType) => void;
  formValues: FormType;
};

export type FormType = {
  from: dayjs.Dayjs;
  to: dayjs.Dayjs | null;
};
