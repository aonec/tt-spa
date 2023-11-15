import { ErpApplicationResponse } from 'api/types';

export type ApplicationInfoBlockProps = {
  applicationInfo: ErpApplicationResponse | null;
  addressLinkPath: string;
  address: string | null;
  isLoading: boolean;
  isViewerExecutor: boolean;
  isPostponeModalOpen: boolean;
  setModalOpen: (payload: boolean) => void;
};
