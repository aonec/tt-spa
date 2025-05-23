export type Props = {
  setModalOpen: (payload: boolean) => void;
  isModalOpen: boolean;
  setFile: (payload: File | null) => void;
  file: File | null;
  handleUploadFile: (payload: File) => void;
  isUploading: boolean;
};
