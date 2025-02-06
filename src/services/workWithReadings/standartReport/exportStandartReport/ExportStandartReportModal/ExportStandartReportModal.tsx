import { FC, useCallback } from 'react';
import { Props } from './ExportStandartReportModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import {
  BillingPeriod,
  Title,
  Date,
} from '../../view/ReportPage/ReportPage.styled';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { PollStatusWrapper } from '../../view/ReportPage/PanelItem/PanelItem.styled';
import {
  PollStateColorLookup,
  PollStateTextLookup,
} from '../../view/ReportPage/PanelItem/PanelItem.constants';
import { EPollState } from 'api/types';
import Panel from './panel.svg?react';
import {
  ExportDateTime,
  ExportResultDateTime,
  ExportResultTitle,
  FileBlock,
  FileBlockTitle,
  Header,
  LastPollBlock,
  Wrapper,
} from './ExportStandartReportModal.styled';
import { Button } from 'ui-kit/Button';
import { DownloadIconSC } from 'ui-kit/DocumentsService/view/DocumentsList/DocumentItem/DocumentItem.styled';
import { DocumentIcon } from 'ui-kit/icons';
import { PollActionTypeLookup } from 'services/workWithReadings/readingReportsArchive/ReadingReportsArchivePage/ReadingReportsArchivePage.constansts';
import { downloadReportFile } from 'services/workWithReadings/readingReportsArchive/readingReportsArchiveService.api';
import { Alert } from 'ui-kit/Alert';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';

export const ExportStandartReportModal: FC<Props> = ({
  isModalOpen,
  closeModal,
  handleStartExport,
  lastPollState,
}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  const isLoading =
    lastPollState?.status === EPollState.Pending ||
    lastPollState?.status === EPollState.Running;

  const handleDownload = useCallback(() => {
    if (!lastPollState || !lastPollState.hasFile) return;

    downloadReportFile(
      lastPollState.id,
      `${PollActionTypeLookup[lastPollState.actionType]}_${dayjs(
        lastPollState.doneAt,
      ).format('DD.MM.YYYY')}`,
    );
  }, []);

  return (
    <FormModal
      formId="readings-export"
      visible={isModalOpen}
      title={
        <Header>{isLoading ? 'Отчет загружается' : 'Экспорт показаний'}</Header>
      }
      onCancel={closeModal}
      submitBtnText="Экспортировать"
      loading={isLoading}
      onSubmit={() =>
        handleStartExport({
          Year: Number(dayjs().format('YYYY')),
          Month: Number(dayjs().format('MM')),
          ManagementFirmIds: [4],
        })
      }
      customFooter={isLoading ? <></> : void 0}
      form={
        <Wrapper>
          {!isLoading && (
            <BillingPeriod>
              <Title>Расчетный период</Title>
              <Date>{uppercaseDate}</Date>
            </BillingPeriod>
          )}
          {isLoading && (
            <>
              <Panel />
              <PollStatusWrapper
                color={PollStateColorLookup[lastPollState.status]}
              >
                {PollStateTextLookup[lastPollState.status]}
              </PollStatusWrapper>
            </>
          )}

          {lastPollState && !isLoading && (
            <LastPollBlock color={PollStateColorLookup[lastPollState.status]}>
              <ExportResultTitle>Результат экспорта:</ExportResultTitle>
              <ExportResultDateTime>
                <PollStatusWrapper
                  color={PollStateColorLookup[lastPollState.status]}
                >
                  {PollStateTextLookup[lastPollState.status]}
                </PollStatusWrapper>
                {dayjs(lastPollState.doneAt).format('DD.MM.YYYY HH:mm')}
              </ExportResultDateTime>
              {lastPollState?.errorMessage && (
                <Alert icon={AlertIconType.warning} type={AlertType.danger}>
                  {lastPollState?.errorMessage}
                </Alert>
              )}
              {lastPollState?.hasFile && (
                <FileBlock>
                  <FileBlockTitle>
                    <DocumentIcon />
                    Стандартный отчет
                  </FileBlockTitle>{' '}
                  <ExportDateTime>
                    {dayjs(lastPollState.doneAt).format('DD.MM.YYYY HH:mm')}
                  </ExportDateTime>
                  <Button
                    icon={<DownloadIconSC />}
                    size="small"
                    type="ghost"
                    onClick={handleDownload}
                  >
                    Скачать
                  </Button>
                </FileBlock>
              )}
            </LastPollBlock>
          )}
        </Wrapper>
      }
    />
  );
};
