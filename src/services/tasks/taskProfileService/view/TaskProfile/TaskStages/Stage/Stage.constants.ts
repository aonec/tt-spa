import { EStageStatus } from 'myApi';

export const StageIconColorLookup: { [key in EStageStatus]: string } = {
  Done: 'var(--primary-100)',
  InProgress: '#ffffff',
  Waiting: '#272F5AE5',
};

export const StageCircleColorLookup: {
  [key in EStageStatus]: { border: string; background: string };
} = {
  Done: {
    border: 'var(--primary-100)',
    background: '#ffffff',
  },
  InProgress: {
    border: 'var(--primary-100)',
    background: 'var(--primary-100)',
  },
  Waiting: {
    border: '#F3F5F6',
    background: '#F3F5F6',
  },
};
