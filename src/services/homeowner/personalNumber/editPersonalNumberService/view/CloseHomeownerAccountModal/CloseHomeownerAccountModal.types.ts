import {
  HomeownerAccountCloseRequest,
  HomeownerAccountListResponse,
} from 'myApi';

export type CloseHomeownerAccountModalProps = {
  isLoading: boolean;
  homeowner: HomeownerAccountListResponse;
  isVisible: boolean;
  setVisible: (payload: boolean) => boolean;
  handleCloseHomeownerAccount: (payload: HomeownerAccountCloseRequest) => void;
};
