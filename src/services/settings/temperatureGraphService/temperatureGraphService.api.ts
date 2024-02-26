import { axios } from 'api/axios';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { downloadURI } from 'utils/downloadByURL';

export const getTemperatureNormative =
  (): Promise<TemperatureNormativeResponse> =>
    axios.get('ManagingFirms/TemperatureNormatives');

export const createOrUpdateTemperatureNormative = (
  data: TemperatureNormativeUpdateRequest,
): Promise<TemperatureNormativeResponse> =>
  axios.post('ManagingFirms/TemperatureNormatives/CreateOrUpdate', data);

export function createOrUpdateFromFile(
  file: File,
): Promise<TemperatureNormativeResponse> {
  const formData = new FormData();

  formData.append('file', file);

  return axios.post(
    'ManagingFirms/TemperatureNormatives/CreateOrUpdateFromFile',
    formData,
  );
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
