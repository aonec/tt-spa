import { ErpApplicationResponse } from 'api/types';

export type ApplicationInfoBlockProps = {
  applicationInfo: ErpApplicationResponse | null;
  addressLinkPath: string;
  address: string | null;
  isLoading: boolean;
  handleDelete: () => void;
  isDeleting: boolean;
  isDispacher: boolean;
};
