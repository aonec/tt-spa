import { ENodeCommercialAccountStatus, PipeNodeResponse } from 'myApi';
import { ChangeNodeStatusFormPayload } from '../../changeNodeStatusService.types';

export type ChangeNodeStatusFormProps = {
  initialValues?: PipeNodeResponse;
  formId: string;
  handleChangeNodeStatus: (payload: ChangeNodeStatusFormPayload) => void;
};

export type ChangeNodeStatusFormik = {
  commercialStatus: ENodeCommercialAccountStatus | null;
  documentId: number | null;
  firstDate: string | null;
  secondDate: string | null;
};
