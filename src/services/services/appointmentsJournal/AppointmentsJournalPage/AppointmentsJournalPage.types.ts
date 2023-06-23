import { AssingmentResponse, ControllerResponse } from 'myApi';
import { SearchFormType } from '../appointmentsJournalService.types';

export type Props = {
  form: SearchFormType;
  assignmentslist: AssingmentResponse[] | null;
  isLoadingAssygnments: boolean;
  controllersList: ControllerResponse[];
};
