/* eslint-disable */

import axios from '01/axios';

export async function uploadFile(file, type = 'AdditionalMaterials') {
  const formData = new FormData();
  formData.append('type', type);
  formData.append('file', file);
  try {
    const res = await axios.post('documents/upload', formData);
    return { newFile: res[0] };
  } catch (error) {
    throw new Error(error);
  }
}
