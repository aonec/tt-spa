import { guard, forward } from 'effector';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { message } from 'antd';
import { refetchIndividualDevices } from '../displayIndividualDevices/models';

deleteIndividualDeviceService.outputs.$individualDevice
  .on(
    deleteIndividualDeviceService.inputs.deleteDeviceButtonClicked,
    (_, device) => device
  )
  .reset(
    deleteIndividualDeviceService.inputs.closeModalButtonClicked,
    deleteIndividualDeviceService.inputs.deleteIndividualDeviceFx.doneData
  );

deleteIndividualDeviceService.inputs.deleteIndividualDeviceFx.doneData.watch(
  () => message.success('Прибор успшно удален!')
);
deleteIndividualDeviceService.inputs.deleteIndividualDeviceFx.failData.watch(
  () => message.error('Ошибка удаления прибора')
);

guard({
  source: deleteIndividualDeviceService.outputs.$individualDevice.map(
    (device) => device?.id
  ),
  clock: deleteIndividualDeviceService.inputs.acceptDeleteDeviceButtonClicked,
  filter: (id): id is number => typeof id === 'number',
  target: deleteIndividualDeviceService.inputs.deleteIndividualDeviceFx,
});

forward({
  from: deleteIndividualDeviceService.inputs.deleteIndividualDeviceFx.doneData,
  to: refetchIndividualDevices,
});
