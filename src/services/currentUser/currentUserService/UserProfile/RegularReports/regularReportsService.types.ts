import { EReportFormat, EReportType, EResourceType } from 'api/types';

export type RegularReportItem = {
  id: number;
  reportConfigurationDetails: {
    emails: string;
    contractorIds: number;
    initialDate: string | null;
    nextDate: string | null;
    reportConfigurationPeriod: string;
  };
  report: {
    fileName: string | null;
    groupReportId: string | null;
    managementFirmId: string | null;
    houseManagementId: string | null;
    buildingIds: [];
    nodeResourceTypes: EResourceType[];
    nodeStatus: string | null;
    reportType: EReportType | null;
    from: string | null;
    to: string | null;
    reportFormat: EReportFormat;
  };
  creatorId: number;
};
