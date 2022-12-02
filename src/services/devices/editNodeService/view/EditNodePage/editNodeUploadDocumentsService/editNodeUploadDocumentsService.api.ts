import { axios } from '01/axios';
import { UpdateDocumentPayload } from './editNodeUploadDocumentsService.types';

export const fetchUpdateDocuments = ({
  nodeId,
  documentsIds,
}: UpdateDocumentPayload): Promise<void> =>
  axios.post(`Nodes/${nodeId}/Documents`, { documentsIds });
