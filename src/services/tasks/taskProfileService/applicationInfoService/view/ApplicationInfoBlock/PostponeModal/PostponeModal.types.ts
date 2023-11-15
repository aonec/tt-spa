export type PostponeModalProps = {
  setModalOpen: (payload: boolean) => void;
  isPostponeModalOpen: boolean;
  handlePostpone: (payload: string) => void;
};
