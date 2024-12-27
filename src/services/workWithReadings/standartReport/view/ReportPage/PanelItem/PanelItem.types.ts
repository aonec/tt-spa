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
};

export type PanelItemData = Props;
