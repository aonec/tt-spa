import {
  ChangeStatusRequest,
  MvituNodeResponsePagedList,
  StatusResponse,
} from 'api/mvitu.types';

export type Props = {
  mvituNodesList: MvituNodeResponsePagedList | null;
  integrationData: StatusResponse;
  handleUpdateStatus: (payload: ChangeStatusRequest) => void;
  isUpdateStatusLoading: boolean;
};
