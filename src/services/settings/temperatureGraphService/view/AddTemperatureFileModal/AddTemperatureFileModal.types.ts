export type AddTemperatureFileModalProps = {
  isModalOpen: boolean;
  setModalOpen: (payload: boolean) => void;
  handleGetTemplateFile: () => void;
  isFileLoading: boolean;
  handlePostTemplateFile: (payload: File) => void;
  file: File | null;
  setFile: (payload: File | null) => void;
};
