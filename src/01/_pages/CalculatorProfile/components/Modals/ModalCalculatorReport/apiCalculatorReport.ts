// import axios from '../../../../../axios';
import axiosWithHeaders from '../../api/axiosWithHeaders';

export async function getReport(link: string) {
  try {
    const res: any = await axiosWithHeaders.get(link, {
      responseType: 'blob',
    });
    return res;
  } catch (error) {
    throw {
      resource: 'tasks',
      message: 'Произошла ошибка при загрузке данных по задачам',
    };
  }
}
