import { PollResponse } from 'api/types';

export enum PanelItemStatus {
  Error = 'Error',
  Success = 'Success',
  Info = 'Info',
}

export type Props = {
  status: PanelItemStatus;
  title: string;
  info: string | null;
  btnText: string | null;
  btnOnClick: () => void | null;
  isLoadingInfo: boolean;
  link?: string;
  pollState: PollResponse | null;
};

export type PanelItemData = Props;
