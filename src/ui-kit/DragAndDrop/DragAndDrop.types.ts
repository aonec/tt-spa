export type DragAndDropProps = {
  fileHandler: (files: FileList) => void;
  accept?: string;
  uniqId: string;
  text?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};
