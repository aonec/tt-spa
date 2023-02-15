import moment from 'moment';
import { DateTimeTaskStatisticsItemArrayDictionaryItem } from 'myApi';
import { GetTaskXPosPayload, ReportType } from './GraphView.types';

const getTaskXPos = (payload: GetTaskXPosPayload) => {
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

export const getPreparedData = ({
  tasksByDate,
  maxValue,
  minData,
  reportType,
}: {
  tasksByDate: DateTimeTaskStatisticsItemArrayDictionaryItem;
  reportType: ReportType;
  maxValue: number;
  minData: string;
}) => {
  const tasksArr = tasksByDate.value || [];

  return {
    x: getTaskXPos({
      currentData: tasksByDate?.key,
      minData,
      reportType,
    }),
    y: maxValue * 0.9,
    amount: tasksArr.length,
    isEmergency: tasksArr.filter((elem) => elem.isEmergency).length !== 0,
    isAllActive: tasksArr.filter((elem) => elem.isClosed).length === 0,
    tasksInfo: tasksArr.map((task) => ({
      id: task.id,
      title: task.creationReason,
    })),
  };
};
