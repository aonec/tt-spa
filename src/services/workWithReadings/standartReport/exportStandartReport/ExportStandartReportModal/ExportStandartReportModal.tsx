import { FC } from 'react';
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
import { Wrapper } from './ExportStandartReportModal.styled';

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

  return (
    <FormModal
      formId="readings-export"
      visible={isModalOpen}
      title={isLoading ? 'Отчет загружается' : 'Экспорт показаний'}
      onCancel={closeModal}
      submitBtnText="Экспортировать"
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
          {isLoading && <Panel />}
          {lastPollState && (
            <PollStatusWrapper
              color={PollStateColorLookup[lastPollState.status]}
            >
              {PollStateTextLookup[lastPollState.status]}
            </PollStatusWrapper>
          )}
        </Wrapper>
      }
    />
  );
};
