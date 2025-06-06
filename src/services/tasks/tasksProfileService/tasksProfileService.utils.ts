import dayjs from 'api/dayjs';
import {
  EStageTimeStatus,
  ETaskClosingStatus,
  HousingStockListResponse,
  HousingStockResponse,
  TaskListResponse,
  TaskResponse,
} from 'api/types';
import { Timeline } from 'ui-kit/shared/TimeLine/TimeLine.types';
import { TimerClosingStatus } from 'ui-kit/shared/Timer/Timer.types';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';

export const getAddressObject = (
  object: HousingStockResponse | HousingStockListResponse | null,
) => {
  const address = object?.address?.mainAddress;
  const City = address?.city || '';
  const Street = address?.street || '';
  const Corpus = address?.corpus || '';
  const HousingStockNumber = address?.number || '';

  return {
    City,
    Street,
    Corpus,
    HousingStockNumber,
  };
};

export const prepareData = (tasks: TaskListResponse[], grouptype: string) =>
  tasks.map((item) => ({
    ...item,
    timeline: createTimeline(item),
    timer: createTimer(item),
    formatedCreationTime:
      item.creationTime && getTimeStringByUTC(item.creationTime),
    showExecutor: grouptype === 'Observing',
  }));

export const createTimelineForTaskHeader = (
  task: TaskListResponse | TaskResponse,
): Timeline | null => {
  const { closingTime, currentStage } = task;

  if (closingTime) return null;

  const deadline = new Date(currentStage?.expectedCompletionTime || '');
  const current = Date.now();

  const remainingTime = getFormatedTime(deadline.valueOf() - current);
  const isFailed = deadline.valueOf() - current < 0;

  return {
    timelineStyle: {
      color: currentStage?.timeStatus
        ? ColorLookup[currentStage.timeStatus]
        : ColorLookup.Normal,
      width: `${currentStage?.timeProgress}%`,
    },
    deadlineDate: `(до ${new Date(deadline).toLocaleDateString()})`,
    remainingTime,
    isFailed,
  };
};

export const createTimerForTaskHeader = (
  task: TaskListResponse | TaskResponse,
) => {
  const { closingTime, closingStatus, creationTime, expectedCompletionTime } =
    task;

  if (!closingTime) {
    const ext = expectedCompletionTime;
    const isFailed = new Date(ext!).valueOf() - Date.now() < 0;

    return {
      stage: {
        remainingTime: getFormatedTime(
          Math.abs(new Date(ext!).valueOf() - Date.now()),
        ),
        isFailed,
        deadlineDate: `(до ${new Date(ext!).toLocaleDateString()})`,
      },
      statusDescription: isFailed ? 'Этап просрочен:' : 'Время на этап:',
      icon: 'timer',
      label: 'Время на задачу:',
    };
  }

  if (closingStatus === 'Interrupted') {
    return {
      stage: null,
      icon: closingStatus,
      statusDescription: 'Закрыта автоматически',
      closingStatus: TimerClosingStatus.ClosedAutomatically,
      label: 'Время на задачу:',
    };
  }

  const start = creationTime;
  const deadline = expectedCompletionTime;
  const finish = closingTime;
  const diffTime = new Date(deadline!).valueOf() - new Date(finish!).valueOf();

  const diffTimeStr = getFormatedTime(Math.abs(diffTime));

  const executionTime = getFormatedTime(
    new Date(finish!).valueOf() - new Date(start!).valueOf(),
  );

  if (diffTime < 0) {
    return {
      stage: null,
      diffTime: diffTimeStr,
      icon: 'redTimer',
      statusDescription: 'Просрочена на:',
      closingStatus: TimerClosingStatus.Overdue,
      label: 'Время на задачу:',
    };
  }

  return {
    closingStatus: TimerClosingStatus.Done,
    stage: null,
    diffTime: `(+${diffTimeStr})`,
    executionTime,
    icon: ETaskClosingStatus.Properly,
    statusDescription: 'Выполнено за:',
    label: 'Время на задачу:',
  };
};

export const createTimeline = (
  task: TaskListResponse | TaskResponse,
): Timeline | null => {
  const { closingTime, expectedCompletionTime, currentStage } = task;

  if (closingTime) return null;

  const deadline = new Date(expectedCompletionTime!);
  const current = Date.now();

  const remainingTime = getFormatedTime(deadline.valueOf() - current);
  const isFailed = deadline.valueOf() - current < 0;

  return {
    timelineStyle: {
      color: currentStage?.timeStatus
        ? ColorLookup[currentStage.timeStatus]
        : ColorLookup.Normal,
      width: `${currentStage?.timeProgress}%`,
    },
    deadlineDate: `(до ${new Date(deadline).toLocaleDateString()})`,
    remainingTime,
    isFailed,
  };
};

export const createTimer = (task: TaskListResponse | TaskResponse) => {
  const {
    closingTime,
    currentStage,
    closingStatus,
    creationTime,
    expectedCompletionTime,
  } = task;

  if (!closingTime) {
    const ext = currentStage?.expectedCompletionTime;
    const isFailed = new Date(ext!).valueOf() - Date.now() < 0;

    return {
      stage: {
        remainingTime: getFormatedTime(
          Math.abs(new Date(ext!).valueOf() - Date.now()),
        ),
        isFailed,
        deadlineDate: `(до ${new Date(ext!).toLocaleDateString()})`,
      },
      statusDescription: isFailed ? 'Этап просрочен:' : 'Время на этап:',
      icon: 'timer',
    };
  }

  if (closingStatus === 'Interrupted') {
    return {
      stage: null,
      icon: closingStatus,
      statusDescription: 'Закрыта автоматически',
      closingStatus: TimerClosingStatus.ClosedAutomatically,
    };
  }

  const start = creationTime;
  const deadline = expectedCompletionTime;
  const finish = closingTime;
  const diffTime = new Date(deadline!).valueOf() - new Date(finish!).valueOf();

  const diffTimeStr = getFormatedTime(Math.abs(diffTime));

  const executionTime = getFormatedTime(
    new Date(finish!).valueOf() - new Date(start!).valueOf(),
  );

  if (diffTime < 0) {
    return {
      stage: null,
      diffTime: diffTimeStr,
      icon: 'redTimer',
      statusDescription: 'Просрочена на:',
      closingStatus: TimerClosingStatus.Overdue,
    };
  }

  return {
    closingStatus: TimerClosingStatus.Done,
    stage: null,
    diffTime: `(+${diffTimeStr})`,
    executionTime,
    icon: ETaskClosingStatus.Properly,
    statusDescription: 'Выполнено за:',
  };
};

const getFormatedTime = (time: number) => {
  const days = Math.floor(dayjs.duration(Math.abs(time)).asDays());
  const hours = dayjs.duration(Math.abs(time)).hours();
  const minutes = dayjs.duration(Math.abs(time)).minutes();

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

export const getAcceptableSearchParams = () => {
  const { searchParams } = new URL(window.location.href);

  const params = {
    apartmentId: searchParams.get('apartmentId'),
    housingStockId: searchParams.get('housingStockId'),
    city: searchParams.get('city'),
    street: searchParams.get('street'),
    pipeNodeId: searchParams.get('pipeNodeId'),
    deviceId:
      searchParams.get('calculatorId') ||
      searchParams.get('housingMeteringDeviceId'),
    resource: searchParams.get('resource'),
    taskType: searchParams.get('taskType'),
  };

  return params;
};
