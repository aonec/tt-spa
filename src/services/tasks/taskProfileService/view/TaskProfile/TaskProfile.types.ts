import { StagePushRequest } from './../../../../../myApi';
import { DocumentResponse, PipeNodeResponse, TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  isLoadingTask: boolean;
  isPerpetrator: boolean;
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  commentText: string;
  handleDeleteDocument: () => void;
  relatedPipeNode: PipeNodeResponse | null;
  isViewerExecutor: boolean;
  documents: DocumentResponse[];
  pushStage: () => void;
  handleChangePushStagePayload: (
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest)
  ) => void;
  isPushStageLoading: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
  deleteDocumentModalIsOpen: boolean;
  openDeleteDocumentModal: (id: number) => void;
  closeDeleteDocumentModal: () => void;
};
