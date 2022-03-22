import axios from '01/axios';
import { message } from 'antd';
import { DocumentResponse, ECheckType } from 'myApi';
import { saveAs } from 'file-saver';

export const CheckingActDocumentType = {
  [ECheckType.Planned]: 'Плановая',
  [ECheckType.Unplanned]: 'Внеплановая',
  [ECheckType.Admission]: 'Акт допуска',
};

export function getCheckingActDocument(type: ECheckType) {
  return CheckingActDocumentType[type];
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
