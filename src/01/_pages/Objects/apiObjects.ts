import axios from '../../../api/axios';
import { GroupReportFormResponse } from '.../../api/types';

export async function getReports() {
  try {
    const res = await axios.get<any, GroupReportFormResponse>(`Reports`);
    return res;
  } catch (error) {
    throw {
      resource: 'reports',
      message: 'Произошла ошибка запроса',
    };
  }
}

export async function getArchive(link = '') {
  try {
    const res = await axios.get<string, object>(link, {
      responseType: 'blob',
    });
    return res;
  } catch (error) {
    throw {
      resource: 'groupReports',
      message: 'Произошла ошибка при загрузке групповых отчетов',
    };
  }
}
