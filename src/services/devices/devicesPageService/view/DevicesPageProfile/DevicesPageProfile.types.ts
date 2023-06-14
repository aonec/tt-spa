import { DevicesProfileTabsType } from '../../devicesPageService.types';

export type DevicesPageProfileProps = {
  type?: DevicesProfileTabsType;
  setDevicesType: (type: DevicesProfileTabsType) => void;
  handleAddNode: () => void;
  isPermitionToAddNode: boolean;
  openDownloadDevicesReportModal: () => void;
};
