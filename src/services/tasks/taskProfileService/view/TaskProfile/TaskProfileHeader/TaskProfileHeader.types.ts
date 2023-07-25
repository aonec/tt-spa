import {
  IndividualDeviceOnTaskResponse,
  MeteringDeviceResponse,
  PipeNodeResponse,
} from 'api/types';
import { Timeline } from 'ui-kit/shared/TimeLine/TimeLine.types';
import { Timer } from 'ui-kit/shared/Timer/Timer.types';

export type TaskProfileHeaderProps = {
  name: string;
  devices: IndividualDeviceOnTaskResponse[];
  nodeDevice: MeteringDeviceResponse | null;
  timeline: Timeline | null;
  timer: Timer;
  taskName: string;
  pipeNode: PipeNodeResponse | null;
};
