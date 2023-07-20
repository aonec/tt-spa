import {
  IndividualDeviceOnTaskResponse,
  MeteringDeviceResponse,
  PipeNodeResponse,
} from 'api/myApi';
import { Timeline } from 'ui-kit/shared_components/TimeLine/TimeLine.types';
import { Timer } from 'ui-kit/shared_components/Timer/Timer.types';

export type TaskProfileHeaderProps = {
  name: string;
  devices: IndividualDeviceOnTaskResponse[];
  nodeDevice: MeteringDeviceResponse | null;
  timeline: Timeline | null;
  timer: Timer;
  taskName: string;
  pipeNode: PipeNodeResponse | null;
};
