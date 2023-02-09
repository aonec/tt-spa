import moment from 'moment';
import { GetTaskXPosPayload } from './GraphView.types';

export const getTaskXPos = (payload: GetTaskXPosPayload) => {
  const { currentData, minData, reportType } = payload;

  const minDataMoment = moment(minData).utcOffset(0).startOf('d');

  if (!currentData) {
    return null;
  }
  if (reportType === 'hourly') {
    return moment(currentData).utc(true).diff(minDataMoment, 'h') + 1;
  }

  return moment(currentData).utc(true).diff(minDataMoment, 'd') + 1;
};
