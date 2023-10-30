import { ErpApplicationResponse } from 'api/types';

export type ApplicationBaseInfoProps = {
  applicationInfo: ErpApplicationResponse | null;
  addressLinkPath: string;
  address: string | null;
  isLoading: boolean;
};
