import moment from 'moment';
import { GetTaskXPosPayload } from './GraphView.types';

export const getTaskXPos = (payload: GetTaskXPosPayload) => {
  const { currentData, minData, reportType } = payload;
  if (!currentData) {
    return null;
  }
  if (reportType === 'hourly') {
    return moment(currentData).utc(true).diff(moment(minData), 'h') + 1;
  }
  return moment(currentData).utc(true).diff(moment(minData), 'd') + 2;
};
