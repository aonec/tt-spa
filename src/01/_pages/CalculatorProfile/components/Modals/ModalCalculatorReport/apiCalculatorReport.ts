// import axios from '../../../../../axios';
import axiosWithHeaders from '01/axiosWithHeaders';
import { GetReportParams } from './ModalCalculatorReport.types';

export async function getReport(link: string, params: GetReportParams) {
  try {
    const res: any = await axiosWithHeaders.get(link, {
      responseType: 'blob',
      params,
    });
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
