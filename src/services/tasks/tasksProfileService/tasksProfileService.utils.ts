import moment from 'moment';
import { EStageTimeStatus, TaskListResponse } from 'myApi';

export const prepareData = (tasks: TaskListResponse[], grouptype: string) =>
  tasks.map((item) => ({
    ...item,
    timeline: createTimeline(item),
    timer: createTimer(item),
    formatedCreationTime: new Date(item.creationTime!).toLocaleString(),
    showExecutor: grouptype === 'Observing',
  }));

const createTimeline = (task: TaskListResponse) => {
  const {
    closingTime,
    expectedCompletionTime,
    currentStage,
  } = task;

  if (closingTime) return null;

  const deadline = new Date(expectedCompletionTime!);
  const current = Date.now();

  const remainingTime = getFormatedTime(deadline.valueOf() - current);
  const isFailed = deadline.valueOf() - current < 0;

  return {
    timelineStyle: {
      color: ColorLookup[currentStage?.timeStatus!],
      width: `${currentStage?.timeProgress!}%`,
    },
    deadlineDate: `(до ${new Date(deadline).toLocaleDateString()})`,
    remainingTime,
    isFailed,
  };
};

const createTimer = (task: TaskListResponse) => {
  const {
    closingTime,
    currentStage,
    closingStatus,
    creationTime,
    expectedCompletionTime,
  } = task;

  if (!closingTime) {
    const { expectedCompletionTime: ext } = currentStage!;
    const isFailed = new Date(ext!).valueOf() - Date.now() < 0;

    return {
      stage: {
        remainingTime: getFormatedTime(
          Math.abs(new Date(ext!).valueOf() - Date.now())
        ),
        isFailed,
        deadlineDate: `(до ${new Date(ext!).toLocaleDateString()})`,
      },
      statusDescription: 'Время на этап:',
      icon: 'timer',
    };
  }

  if (closingStatus === 'Interrupted') {
    return {
      stage: null,
      icon: closingStatus,
      statusDescription: 'Закрыта автоматически',
    };
  }

  const start = creationTime;
  const deadline = expectedCompletionTime;
  const finish = closingTime;
  const diffTime = new Date(deadline!).valueOf() - new Date(finish!).valueOf();

  const diffTimeStr = getFormatedTime(Math.abs(diffTime));

  const executionTime = getFormatedTime(
    new Date(finish!).valueOf() - new Date(start!).valueOf()
  );

  if (diffTime < 0) {
    return {
      stage: null,
      diffTime: diffTimeStr,
      icon: 'redTimer',
      statusDescription: 'Просрочена на',
      isFailed: true,
    };
  }

  return {
    stage: null,
    diffTime: `(+${diffTimeStr})`,
    executionTime,
    icon: closingStatus,
    statusDescription: 'Выполнено за:',
  };
};

const getFormatedTime = (time: number) => {
  const days = Math.floor(moment.duration(Math.abs(time)).asDays());
  const hours = moment.duration(Math.abs(time)).hours();
  const minutes = moment.duration(Math.abs(time)).minutes();

  if (time > 0 && days > 0) {
    return `${days}д ${hours}ч`;
  } else if (time < 0 && days > 0) {
    return `-${days}д ${hours}ч`;
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
};

const ColorLookup = {
  [EStageTimeStatus.Normal]: 'var(--success)',
  [EStageTimeStatus.RunningOut]: 'var(--warning)',
  [EStageTimeStatus.Expired]: 'var(--error)',
};
