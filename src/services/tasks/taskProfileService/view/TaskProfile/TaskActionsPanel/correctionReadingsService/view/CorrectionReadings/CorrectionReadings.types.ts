import { TaskResponse } from 'myApi';
import { BufferedReadingValues } from 'services/meters/individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';

export type CorrectionReadingsProps = {
  task: TaskResponse;
  handleReadingChange: (values: BufferedReadingValues) => void;
};
