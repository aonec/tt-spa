import axios from '01/axios';

export const postNodeDocuments = (nodeId: number, documentsIds: number[]) =>
  axios.post(`Nodes/${nodeId}/Documents`, { documentsIds });
