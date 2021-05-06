import { getReport } from '../../../../_pages/CalculatorProfile/components/Modals/ModalCalculatorReport/apiCalculatorReport';
import { sendGroupReport } from '../../../../_api/group_report';
import {
  EmailSubscriptionType,
  NodeCommercialAccountStatus,
  ResourceType,
} from '../../../../../myApi';

export type reportQuery = {
  GroupReportId?: string | null;
  HouseManagementId?: string | null;
  NodeResourceTypes?: ResourceType[] | null;
  NodeStatus?: NodeCommercialAccountStatus;
  'Subscription.Email'?: string | null;
  'Subscription.ContractorIds'?: number[] | null;
  'Subscription.TriggerAt'?: string;
  'Subscription.Type'?: EmailSubscriptionType;
  DelayedEmailTarget?: string | null;
  ReportType?: string | null;
  From?: string | null;
  To?: string | null;
};

export function downloadReport(query?: reportQuery) {
  return sendGroupReport(query).then((response: any) => {
    debugger;
    const fileNameWithJunk = response.headers['content-disposition'].split(';');
    const encodedFileName = fileNameWithJunk[2].split("'")[2];
    const decodedFileName = decodeURI(encodedFileName).replace(/%2C/g, ',');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodedFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}
