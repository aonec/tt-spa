import { HeatIndividualDevicesReportPayload } from '../../heatIndividualDevicesReportService.types';

export type HeatIndividualDevicesReportFormProps = {
  handleDownloadModal: (payload: HeatIndividualDevicesReportPayload) => void;
};
