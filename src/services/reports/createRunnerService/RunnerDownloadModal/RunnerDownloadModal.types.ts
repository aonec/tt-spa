export type Props = {
  isOpen: boolean;
  setOpen: (payload: boolean) => void;
  handleDownloadFile: () => void;
  isDownloading: boolean;
  handleReset: () => void;
};
