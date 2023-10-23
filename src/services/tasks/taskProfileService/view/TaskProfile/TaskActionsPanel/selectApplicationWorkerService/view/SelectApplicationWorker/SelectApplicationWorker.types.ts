import { ErpExecutorResponse } from 'api/types';

export type SelectApplicationWorkerProps = {
  applicationBrigade: ErpExecutorResponse[];
  handleSelectWorker: (workerId: number) => void;
};
