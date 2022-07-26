import axios from '../../api/axios';
import { message } from 'antd';
import { DocumentResponse, ECheckType, ENodeCheckType } from '../../api/types';
import { saveAs } from 'file-saver';

export const CheckingActDocumentType = {
  [ENodeCheckType.PlannedCheck]: 'Плановая',
  [ENodeCheckType.UnplannedCheck]: 'Внеплановая',
  [ENodeCheckType.AdmissionCheck]: 'Акт допуска',
};

export function getCheckingActDocument(type: ENodeCheckType) {
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
