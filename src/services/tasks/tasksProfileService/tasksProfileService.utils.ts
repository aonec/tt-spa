import moment from 'moment';
import { ETaskTimeStatus, TaskListResponse } from 'myApi';

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
    creationTime,
    timeStatus,
  } = task;

  if (closingTime) return null;

  const start = new Date(creationTime!);
  const deadline = new Date(expectedCompletionTime!);
  const current = Date.now();

  const percent = Math.abs(
    ((current - start.valueOf()) / (deadline.valueOf() - start.valueOf())) * 100
  );

  const remainingTime = getFormatedTime(deadline.valueOf() - current);
  const isFailed = deadline.valueOf() - current < 0;

  return {
    timelineStyle: {
      color: ColorLookup[timeStatus],
      width: percent > 100 ? '100%' : `${percent}%`,
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
      icon: closingStatus,
      statusDescription: 'Закрыта автоматически',
    };
  }

  const start = creationTime;
  const deadline = expectedCompletionTime;
  const finish = closingTime;

  const diffTimeStr = getFormatedTime(
    new Date(deadline!).valueOf() - new Date(finish!).valueOf()
  );

  const executionTime = getFormatedTime(
    new Date(finish!).valueOf() - new Date(start!).valueOf()
  );

  return {
    diffTime: `(${diffTimeStr})`,
    executionTime,
    icon: closingStatus,
    statusDescription: 'Выполнено за:',
  };
};

const getFormatedTime = (time: number) => {
  const days = moment.duration(time).asDays();
  const hours = moment.duration(Math.abs(time)).hours();
  const minutes = moment.duration(Math.abs(time)).minutes();

  if (days >> 0) {
    return `${days >> 0}д ${hours}ч`;
  } else if (hours > 0) {
    return `${hours}ч ${minutes}м`;
  } else {
    return `${minutes}м`;
  }
};

const ColorLookup = {
  [ETaskTimeStatus.Normal]: 'var(--success)',
  [ETaskTimeStatus.RunningOut]: 'var(--warning)',
  [ETaskTimeStatus.Expired]: 'var(--error)',
};
