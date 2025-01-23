import { useUnit } from 'effector-react';
import { ReadingReportsArchivePage } from './ReadingReportsArchivePage';
import { readingReportsArchiveService } from './readingReportsArchiveService.models';
import { individualDevicesReportArchiveQuery } from './readingReportsArchiveService.api';

const {
  gates: { ReadingReportsArchiveGate },
} = readingReportsArchiveService;

export const ReadingReportsArchiveContainer = () => {
  const {
    individualDevicesReportArchiveData,
    isLoadingIndividualDevicesReportArchive,
  } = useUnit({
    individualDevicesReportArchiveData:
      individualDevicesReportArchiveQuery.$data,
    isLoadingIndividualDevicesReportArchive:
      individualDevicesReportArchiveQuery.$pending,
  });

  return (
    <>
      <ReadingReportsArchiveGate />
      <ReadingReportsArchivePage
        individualDevicesReportArchiveData={individualDevicesReportArchiveData}
        isLoadingIndividualDevicesReportArchive={
          isLoadingIndividualDevicesReportArchive
        }
      />
    </>
  );
};
