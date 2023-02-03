import { addPipeNodeCommonDeviceService } from 'services/nodes/addPipeNodeCommonDeviceService';

export const addConnectedCommonDevicesService = {
  inputs: {
    openAddCommonDeviceModal:
      addPipeNodeCommonDeviceService.inputs.openAddCommonDeviceModal,
    handleMeteringDeviceCreated:
      addPipeNodeCommonDeviceService.inputs.handleMeteringDeviceCreated,
  },
};
