import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { PipeHousingMeteringDeviceResponse } from 'myApi';
import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';
import { getDevicePipe } from './switchDeviceService.api';

const domain = createDomain('switchDevice');

const DevicePipeGate = createGate<{ deviceId: number }>();

const { $task } = taskProfileService.outputs;

const fetchDevicePipeFx = domain.createEffect<
  number,
  PipeHousingMeteringDeviceResponse,
  void
>(getDevicePipe);

const $devicePipe = domain
  .createStore<PipeHousingMeteringDeviceResponse | null>(null)
  .on(fetchDevicePipeFx.doneData, (_, devicePipe) => devicePipe);

const $device = $task.map((task) => task?.device || null);

forward({
  from: DevicePipeGate.open.map(({ deviceId }) => deviceId),
  to: fetchDevicePipeFx,
});

export const switchDeviceService = {
  outputs: {
    $device,
    $devicePipe,
  },
  gates: { DevicePipeGate },
};
