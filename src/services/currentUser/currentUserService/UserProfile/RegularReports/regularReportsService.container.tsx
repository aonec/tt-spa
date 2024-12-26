import { useUnit } from 'effector-react';
import { regularReportsService } from './regularReportsService.models';
import { RegularReportItem } from './RegularReportItem';
import {
  PageTitle,
  PageWrapper,
} from './RegularReportItem/RegularReportItem.styled';
import { houseManagementsService } from 'services/objects/houseManagementsService';
import {
  organizationsQuery,
  organizationsService,
} from 'services/organizations';
import { companyProfileService } from 'services/company/companyProfileService';
import { displayContractorsService } from 'services/contractors/displayContractorsService';

const {
  inputs,
  outputs,
  gates: { PageGate },
} = regularReportsService;

const {
  gates: { HouseManagementsGate },
} = houseManagementsService;

const {
  gates: { OrganizationsGate },
} = organizationsService;

const {
  gates: { FetchingStaffGate },
} = companyProfileService;

const {
  gates: { ContractorsGate },
} = displayContractorsService;

export const RegularReportsContainer = () => {
  const {
    reportsData,
    houseManagements,
    organizations,
    handleDeleteReport,
    handleChangeActivity,
    isReportUpdating,
    staffList,
    contractors,
  } = useUnit({
    reportsData: outputs.$reportsData,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    organizations: organizationsQuery.$data,
    handleDeleteReport: inputs.handleDeleteReport,
    handleChangeActivity: inputs.handleChangeActivity,
    isReportUpdating: outputs.$isReportUpdating,
    staffList: companyProfileService.outputs.$staffList,
    contractors: displayContractorsService.outputs.$contractors,
  });

  return (
    <>
      <HouseManagementsGate />
      <OrganizationsGate />
      <FetchingStaffGate />
      <ContractorsGate />

      <PageWrapper>
        <PageTitle>Регулярная выгрузка отчетов</PageTitle>

        {reportsData?.map((report) => (
          <RegularReportItem
            key={report.id}
            report={report}
            isFirst={reportsData.indexOf(report) === 0}
            houseManagements={houseManagements}
            organizations={organizations}
            handleDeleteReport={handleDeleteReport}
            handleChangeActivity={handleChangeActivity}
            isReportUpdating={isReportUpdating}
            staffList={staffList}
            contractors={contractors}
          />
        ))}
        <PageGate />
      </PageWrapper>
    </>
  );
};
