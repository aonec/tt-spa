export type DocumentPreloadProps = {
  setFile: (payload: File | null) => void;
  file: File | null;
  accept: string;
  uniqId: string;
  label?: string;
};
