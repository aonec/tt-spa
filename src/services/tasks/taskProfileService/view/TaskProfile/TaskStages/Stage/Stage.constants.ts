import { EStageStatus } from 'myApi';

export const StageIconColorLookup: { [key in EStageStatus]: string } = {
  Done: '#189ee9',
  InProgress: '#ffffff',
  Waiting: '#272F5AE5',
};

export const StageCircleColorLookup: {
  [key in EStageStatus]: { border: string; background: string };
} = {
  Done: {
    border: '#189ee9',
    background: '#ffffff',
  },
  InProgress: {
    border: '#189ee9',
    background: '#189ee9',
  },
  Waiting: {
    border: '#F3F5F6',
    background: '#F3F5F6',
  },
};
