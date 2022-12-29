import { ENodeCommercialAccountStatus, PipeNodeResponse } from 'myApi';

export type ChangeNodeStatusFormProps = {
  node: PipeNodeResponse;
  formId: string;
  handleChangeNodeStatus: () => void;
};

export type ChangeNodeStatusFormik = {
  commercialStatus: ENodeCommercialAccountStatus;
  date: string;
  documentId: string | null;
};
