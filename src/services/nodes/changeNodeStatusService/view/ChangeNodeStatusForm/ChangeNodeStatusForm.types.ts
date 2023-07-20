import { ENodeCommercialAccountStatus } from 'api/myApi';
import { ChangeNodeStatusFormPayload } from '../../changeNodeStatusService.types';

export type ChangeNodeStatusFormProps = {
  formId?: string;
  handleChangeNodeStatus: (payload: ChangeNodeStatusFormPayload) => void;
  createMode?: boolean;
  initialData?: ChangeNodeStatusFormik;
};

export type ChangeNodeStatusFormik = {
  commercialStatus?: ENodeCommercialAccountStatus | null;
  documentId?: number | null;
  firstDate?: string | null;
  secondDate?: string | null;
};
