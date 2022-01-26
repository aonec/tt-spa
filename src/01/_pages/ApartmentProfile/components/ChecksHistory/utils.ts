import axios from '01/axios';
import { message } from 'antd';
import { DocumentResponse, ECheckType } from 'myApi';

export function getCheckingActDocument(type: ECheckType) {
  return type === ECheckType.Planned ? 'Плановая' : 'Внеплановая';
}

export const getOnSaveFile = (document: DocumentResponse) =>
  async function onSaveFile() {
    try {
      const url: string = await axios.get(`Documents/${document.id}`);
      saveAs(url, document.name!);
    } catch (error) {
      message.error('Не удалось скачать файл');
    }
  };
