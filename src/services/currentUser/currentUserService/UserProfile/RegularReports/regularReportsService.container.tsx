import { useUnit } from 'effector-react';
import { regularReportsService } from './regularReportsService.models';
import { RegularReportItem } from './RegularReportItem';
import { PageTitle, PageWrapper } from './RegularReportItem/RegularReportItem.styled';

const {
  // inputs,
  outputs,
  gates: { PageGate },
} = regularReportsService;

export const RegularReportsContainer = () => {
  const { reportsData } = useUnit({
    reportsData: outputs.$reportsData,
  });

  return (
    <PageWrapper>
      <PageTitle>Регулярная выгрузка отчетов</PageTitle>

      {reportsData?.map((report) => (
        <RegularReportItem key={report.id} report={report} isFirst={ reportsData.indexOf(report) === 0} />
      ))}
      <PageGate />
    </PageWrapper>
  );
};
