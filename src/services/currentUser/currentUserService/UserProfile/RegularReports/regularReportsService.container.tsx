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

const {
  // inputs,
  outputs,
  gates: { PageGate },
} = regularReportsService;

const {
  gates: { HouseManagementsGate },
} = houseManagementsService;

const {
  gates: { OrganizationsGate },
} = organizationsService;

export const RegularReportsContainer = () => {
  const { reportsData, houseManagements, organizations } = useUnit({
    reportsData: outputs.$reportsData,
    houseManagements: houseManagementsService.outputs.$houseManagements,
    organizations: organizationsQuery.$data,
  });

  return (
    <>
      <HouseManagementsGate />
      <OrganizationsGate />

      <PageWrapper>
        <PageTitle>Регулярная выгрузка отчетов</PageTitle>

        {reportsData?.map((report) => (
          <RegularReportItem
            key={report.id}
            report={report}
            isFirst={reportsData.indexOf(report) === 0}
            houseManagements={houseManagements}
            organizations={organizations}
          />
        ))}
        <PageGate />
      </PageWrapper>
    </>
  );
};
