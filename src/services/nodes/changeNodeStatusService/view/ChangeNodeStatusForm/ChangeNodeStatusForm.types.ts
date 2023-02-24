import {
  ENodeCommercialAccountStatus,
  NodeCommercialStatusResponse,
} from 'myApi';
import { ChangeNodeStatusFormPayload } from '../../changeNodeStatusService.types';

export type ChangeNodeStatusFormProps = {
  commercialStatus?: NodeCommercialStatusResponse | null;
  formId?: string;
  handleChangeNodeStatus: (payload: ChangeNodeStatusFormPayload) => void;
  createMode?: boolean;
};

export type ChangeNodeStatusFormik = {
  commercialStatus: ENodeCommercialAccountStatus | null;
  documentId: number | null;
  firstDate: string | null;
  secondDate: string | null;
};
