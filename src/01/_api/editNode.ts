import axios from '../../api/axios';

export const postNodeDocuments = (nodeId: number, documentsIds: number[]) =>
  axios.post(`Nodes/${nodeId}/Documents`, { documentsIds });
