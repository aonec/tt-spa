import { axios } from 'api/axios';
import { saveAs } from 'file-saver';
import { CalculatorResponse, DocumentResponse } from 'api/types';

export const fetchCalculator = (
  calcilatorId: number,
): Promise<CalculatorResponse> => axios.get(`Calculators/${calcilatorId}`);

export const saveFileRequest = async (document: DocumentResponse) => {
  const url: string = await axios.get(`Documents/${document.id}`);
  saveAs(url, document.name || 'Без названия');
};
