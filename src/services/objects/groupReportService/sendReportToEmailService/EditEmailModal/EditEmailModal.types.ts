export type EditEmailModalProps = {
  setEmailIsOpen: boolean;
  email: string;
  submitEmail: () => void;
  setEmail: (email: string) => void;
  handleCloseSetEmailModal: () => void;
};
