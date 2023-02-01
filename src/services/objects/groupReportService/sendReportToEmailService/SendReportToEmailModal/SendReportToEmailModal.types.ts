export type SendReportToEmailModalProps = {
  defaultEmail: string;
  submitEmail: () => void;
  handleOpenSetEmailModal: () => void;
  handleClose: () => void;
  isOpen: boolean;
};
