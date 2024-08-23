import {
  ChangeStatusRequest,
  MvituNodeResponsePagedList,
  StatusResponse,
} from 'api/mvitu.types';
import { ChangeNodeStatusRequestPayload } from '../mvituIntegrationSectionService.types';

export type Props = {
  mvituNodesList: MvituNodeResponsePagedList | null;
  integrationData: StatusResponse;
  handleUpdateStatus: (payload: ChangeStatusRequest) => void;
  isUpdateStatusLoading: boolean;
  changeNodeStatus: (payload: ChangeNodeStatusRequestPayload) => void;
};
