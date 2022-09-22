import { DocumentResponse, PipeNodeResponse, TaskResponse } from 'myApi';
import { PushStageRequestPayload } from '../../taskProfileService.types';

export type TaskProfileProps = {
  task: TaskResponse;
  isPerpetrator: boolean;
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  commentText: string;
  handleDeleteDocument: (id: number) => void;
  relatedPipeNode: PipeNodeResponse | null;
  isViewerExecutor: boolean;
  documents: DocumentResponse[];
  pushStage: (payload: PushStageRequestPayload) => void;
  isPushStageLoading: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
