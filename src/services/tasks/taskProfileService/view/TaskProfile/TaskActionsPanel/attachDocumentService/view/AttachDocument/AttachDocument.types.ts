export type AttachDocumentProps = {
  handleDocumentsChange: (ids: number[]) => void;
  componentData: {
    lable: string;
    maxDocuments: number;
  };
};
