import { createDevice } from '01/_api/utils';
import { StageResponse, TaskListResponse } from 'myApi';

export const preparedData = (
  tasks: TaskListResponse[] | null | undefined,
  grouptype: string
) =>
  tasks &&
  tasks.map((item) => ({
    ...item,
    timeline: createTimeline(item),
    timer: createTimer(item),
    device: createDevice(item.device),
    calendar: new Date(item.creationTime!).toLocaleString(),
    showExecutor: grouptype === 'observing',
  }));

const createTimeline = ({
  creationTime,
  expectedCompletionTime,
  closingTime,
}: {
  creationTime: string | null;
  expectedCompletionTime: string | null;
  closingTime: string | null;
}) => {
  if (closingTime) return null;
  const start = new Date(creationTime!);
  const deadline = new Date(expectedCompletionTime!);
  const current = Date.now();

  const percent = Math.abs(
    ((current - start.valueOf()) / (deadline.valueOf() - start.valueOf())) * 100
  );
  const color =
    percent < 60
      ? 'var(--success)'
      : percent < 90
      ? 'var(--warning)'
      : 'var(--error)';
  const { timeStr, fail } = formatTime(deadline.valueOf() - current);
  return {
    style: {
      background: color,
      width: percent > 100 ? '100%' : `${percent}%`,
    },
    before: `(до ${new Date(deadline).toLocaleDateString()})`,
    timeStr: !fail ? timeStr : `-${timeStr}`,
    fail,
  };
};

const formatTime = (time: number) => {
  if (!time) return {};
  let timeStr = '';
  const fail = time < 0;
  const days = Math.abs(time) / 1000 / 60 / 60 / 24;
  const hours = (days - (days >> 0)) * 24;
  const minutes = (hours - (hours >> 0)) * 60;

  if (days >> 0) {
    timeStr = `${days >> 0}д ${hours >> 0}ч`;
  } else if (hours >> 0) {
    timeStr = `${hours >> 0}ч ${minutes >> 0}м`;
  } else {
    timeStr = `${minutes >> 0}м`;
  }
  return { timeStr, fail };
};

const createTimer = ({
  creationTime,
  expectedCompletionTime,
  closingTime,
  currentStage,
}: {
  creationTime: string | null;
  expectedCompletionTime: string | null;
  closingTime: string | null;
  currentStage: StageResponse | null;
}) => {
  if (currentStage) {
    const { expectedCompletionTime: ext } = currentStage;
    return {
      stage: {
        ...formatTime(new Date(ext!).valueOf() - Date.now()),
        before: `(до ${new Date(ext!).toLocaleDateString()})`,
      },
      text: 'Время на этап:',
      icon: { icon: 'timer', fill: 'var(--main-100)' },
    };
  }

  const start = creationTime;
  const deadline = expectedCompletionTime;
  const finish = closingTime;

  const diff = formatTime(
    new Date(deadline!).valueOf() - new Date(start!).valueOf()
  );
  const final = formatTime(
    new Date(start!).valueOf() - new Date(finish!).valueOf()
  );

  return {
    diff: {
      timeStr: !final.fail ? `(${diff.timeStr})` : `(-${diff.timeStr})`,
    },
    final,
    icon: { icon: 'ok', fill: 'var(--success)' },
    stage: null,
    text: 'Выполнено за:',
  };
};
