import { TreeSelectElement } from 'ui-kit/sharedComponents/AddressTreeSelect/AddressTreeSelect.types';
import { HeatIndividualDevicesReportPayload } from '../../heatIndividualDevicesReportService.types';

export type HeatIndividualDevicesReportFormProps = {
  handleDownloadModal: (payload: HeatIndividualDevicesReportPayload) => void;
  formId: string;
  selectedCity: string | null;
  selectCity: (city: string) => void;
  treeData: TreeSelectElement[];
};
