import { DocumentResponse, PipeNodeResponse, TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  isPerpetrator: boolean;
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  commentText: string;
  handleDeleteDocument: () => void;
  relatedPipeNode: PipeNodeResponse | null;
  documents: DocumentResponse[];
  deleteDocumentModalIsOpen: boolean;
  openDeleteDocumentModal: (id: number) => void;
  closeDeleteDocumentModal: () => void;
};
