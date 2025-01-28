import { useUnit } from 'effector-react';
import { ReadingReportsArchivePage } from './ReadingReportsArchivePage';
import { readingReportsArchiveService } from './readingReportsArchiveService.models';
import { individualDevicesReportArchiveQuery } from './readingReportsArchiveService.api';

const {
  inputs,
  outputs,
  gates: { ReadingReportsArchiveGate },
} = readingReportsArchiveService;

export const ReadingReportsArchiveContainer = () => {
  const {
    individualDevicesReportArchiveData,
    isLoadingIndividualDevicesReportArchive,
    setQueryParams,
    queryParams,
  } = useUnit({
    individualDevicesReportArchiveData:
      individualDevicesReportArchiveQuery.$data,
    isLoadingIndividualDevicesReportArchive:
      individualDevicesReportArchiveQuery.$pending,
    queryParams: outputs.$queryParams,
    setQueryParams: inputs.setQueryParams,
  });

  return (
    <>
      <ReadingReportsArchiveGate />
      <ReadingReportsArchivePage
        individualDevicesReportArchiveData={individualDevicesReportArchiveData}
        isLoadingIndividualDevicesReportArchive={
          isLoadingIndividualDevicesReportArchive
        }
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />
    </>
  );
};
