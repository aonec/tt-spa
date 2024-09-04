import {
  ChangeStatusRequest,
  MvituNodeResponsePagedList,
  StatusResponse,
} from 'api/mvitu.types';
import {
  ChangeNodeStatusRequestPayload,
  GetMvituNodesRequestParams,
} from '../mvituIntegrationSectionService.types';

export type Props = {
  mvituNodesList: MvituNodeResponsePagedList | null;
  integrationData: StatusResponse;
  handleUpdateStatus: (payload: ChangeStatusRequest) => void;
  isUpdateStatusLoading: boolean;
  changeNodeStatus: (payload: ChangeNodeStatusRequestPayload) => void;
  deleteNode: (payload: number) => void;
  nodesListRequestPayload: GetMvituNodesRequestParams;
  setPageNumber: (payload: number) => void;
  isLoading: boolean;
  setSearchParams: (payload: Partial<GetMvituNodesRequestParams>) => void;
};
