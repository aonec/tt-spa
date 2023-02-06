export type ConfirmationAddingExistingPersonalNumberProps = {
  isConfirmationModalOpen: boolean;
  samePersonalAccountNumderId: number | null;
  confirmationModalClose: () => void;
  handleForced: () => void;
};
