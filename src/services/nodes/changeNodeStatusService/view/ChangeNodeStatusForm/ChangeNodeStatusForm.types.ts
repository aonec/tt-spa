import { ENodeCommercialAccountStatus, PipeNodeResponse } from 'myApi';

export type ChangeNodeStatusFormProps = {
  initialValues?: PipeNodeResponse;
  formId: string;
  handleChangeNodeStatus: () => void;
};

export type ChangeNodeStatusFormik = {
  commercialStatus: ENodeCommercialAccountStatus | null;
  date: string;
  documentId: string | null;
};
