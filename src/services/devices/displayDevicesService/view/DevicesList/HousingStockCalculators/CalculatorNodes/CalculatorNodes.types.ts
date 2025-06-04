import { GroupedByCalculatorPipeNodes } from 'services/devices/displayDevicesService/displayDevicesService.types';

export type CalculatorNodesProps = {
  devices: GroupedByCalculatorPipeNodes;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
