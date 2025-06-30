import { FC, useState } from 'react';
import {
  BillingPeriod,
  Container,
  Date,
  Footer,
  PanelsList,
  Title,
  Wrapper,
} from './ReportPage.styled';
import { Props } from './ReportPage.types';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { Button } from 'ui-kit/Button';
import { PanelItem } from './PanelItem';
import { usePanelsList } from './ReportPage.hooks';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { GoBack } from 'ui-kit/shared/GoBack';
import { CloseDevicesWithReadingsParamsModal } from './CloseDevicesWithReadingsParamsModal';

export const ReportPage: FC<Props> = ({
  closingDevices,
  isLoadingClosingDevices,
  handleStartCloseDevicesByCheckingDatePoll,
  lastCloseDevicesByCheckingDatePollData,
  handleStartCloseDevicesWithoutReadingsPoll,
  lastCloseDevicesWithoutReadingsPollData,
  handleStartDuplicateReadingsPoll,
  lastDuplicateReadingsPollData,
  handleExport,
  organizations,
  houseManagements,
}) => {
  const [isCheckingDatePollModalOpen, setIsCheckingDatePollModalOpen] =
    useState(false);

  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  const handleOpenCheckingDatePollModal = () => {
    setIsCheckingDatePollModalOpen(true);
  };

  const panelsList = usePanelsList({
    closingDevices,
    isLoadingClosingDevices,
    handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData,
    handleStartCloseDevicesWithoutReadingsPoll: handleOpenCheckingDatePollModal,
    lastCloseDevicesWithoutReadingsPollData,
    handleStartDuplicateReadingsPoll,
    lastDuplicateReadingsPollData,
  });

  return (
    <Wrapper>
      <Container>
        <GoBack />
        <PageHeader isGhost title="Стандартный отчет" />

        <BillingPeriod>
          <Title>Расчетный период</Title>
          <Date>{uppercaseDate}</Date>
        </BillingPeriod>

        <PanelsList>
          {panelsList.map((item) => (
            <PanelItem key={item.title} {...item} />
          ))}
        </PanelsList>
      </Container>

      <Footer>
        <Button size="s" onClick={handleExport}>
          Экспортировать
        </Button>
      </Footer>

      <CloseDevicesWithReadingsParamsModal
        isOpen={isCheckingDatePollModalOpen}
        handleClose={() => setIsCheckingDatePollModalOpen(false)}
        onSubmit={handleStartCloseDevicesWithoutReadingsPoll}
        organizations={organizations}
        houseManagements={houseManagements}
      />
    </Wrapper>
  );
};
