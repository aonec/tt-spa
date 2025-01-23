import { FC } from 'react';
import { Wrapper } from './ReadingReportsArchivePage.styled';
import { Props } from './ReadingReportsArchivePage.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Table } from 'ui-kit/Table';
import dayjs from 'dayjs';
import { DownloadIcon } from 'ui-kit/icons';
import { PollActionTypeLookup } from './ReadingReportsArchivePage.constansts';
import { Pagination } from 'ui-kit/Pagination';

export const ReadingReportsArchivePage: FC<Props> = ({
  individualDevicesReportArchiveData,
  isLoadingIndividualDevicesReportArchive,
  queryParams,
  setQueryParams,
}) => {
  return (
    <Wrapper>
      <GoBack />
      <PageHeader title="Архив отчетов" />
      <Table
        isLoading={isLoadingIndividualDevicesReportArchive}
        elements={individualDevicesReportArchiveData?.items || []}
        columns={[
          {
            label: 'Дата',
            size: '200px',
            render: (elem) => dayjs(elem.doneAt).format('DD.MM.YYYY'),
          },
          {
            label: 'Тип отчета',
            size: '600px',
            render: (elem) => <b>{PollActionTypeLookup[elem.actionType]}</b>,
          },
          {
            label: '',
            size: '50px',
            render: () => <DownloadIcon />,
          },
        ]}
      />
      <Pagination
        pageSize={queryParams.PageSize}
        current={queryParams.PageNumber}
        onChange={(pageNumber) => setQueryParams({ PageNumber: pageNumber })}
        total={individualDevicesReportArchiveData?.totalItems}
        showSizeChanger={false}
      />
    </Wrapper>
  );
};
