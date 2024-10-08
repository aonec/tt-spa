import {
  HomeownerAccountCloseRequest,
  HomeownerAccountListResponse,
} from 'api/types';

export type CloseHomeownerAccountModalProps = {
  isLoading: boolean;
  homeowner: HomeownerAccountListResponse;
  isVisible: boolean;
  setVisible: (payload: boolean) => boolean;
  handleCloseHomeownerAccount: (payload: HomeownerAccountCloseRequest) => void;
};
