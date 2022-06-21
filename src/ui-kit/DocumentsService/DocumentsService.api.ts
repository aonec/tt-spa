import { axios } from '01/axios';
import { Document } from './DocumentsService.types';

export async function uploadDocument(file: File, type = 'AdditionalMaterials') {
  const formData = new FormData();

  formData.append('type', type);
  formData.append('file', file);

  const res: Document[] = await axios.post('documents/upload', formData);

  return res[0];
}

export const saveDocument = async (document: Document) => {
  const url: string = await axios.get(`Documents/${document.id}`);
  saveAs(url, document.name!);
};
