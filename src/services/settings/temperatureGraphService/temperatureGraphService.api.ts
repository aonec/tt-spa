import { axios } from 'api/axios';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { Document } from 'ui-kit/DocumentsService';
import { downloadURI } from 'utils/downloadByURL';

export const getTemperatureNormative =
  (): Promise<TemperatureNormativeResponse> =>
    axios.get('ManagingFirms/TemperatureNormatives');

export const createOrUpdateTemperatureNormative = (
  data: TemperatureNormativeUpdateRequest,
): Promise<TemperatureNormativeResponse> =>
  axios.post('ManagingFirms/TemperatureNormatives/CreateOrUpdate', data);

export async function createOrUpdateFromFile(
  file: File,
  type = 'AdditionalMaterials',
) {
  const formData = new FormData();

  formData.append('type', type);
  formData.append('file', file);

  const res: Document[] = await axios.post(
    'ManagingFirms/TemperatureNormatives/CreateOrUpdateFromFile',
    formData,
  );

  return res[0];
}

export const getTemplateFile = async (): Promise<void> => {
  const res: string = await axios.get(
    'ManagingFirms/TemperatureNormatives/TemplateFile',
    {
      responseType: 'blob',
    },
  );

  const fileURL = window.URL.createObjectURL(new Blob([res]));

  downloadURI(fileURL, `Температурный график`);
};
