import { createDomain } from 'effector';
import { addPipeNodeCommonDeviceService } from 'services/nodes/addPipeNodeCommonDeviceService';

const domain = createDomain('addConnectedCommonDevicesService');

export const addConnectedCommonDevicesService = {
  inputs: {
    openAddCommonDeviceModal:
      addPipeNodeCommonDeviceService.inputs.openAddCommonDeviceModal,
  },
};
