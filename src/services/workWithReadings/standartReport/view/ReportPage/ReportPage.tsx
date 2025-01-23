import { FC } from 'react';
import {
  AlertText,
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
import { Alert } from 'ui-kit/Alert';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';
import { Button } from 'ui-kit/Button';
import { PanelItem } from './PanelItem';
import { usePanelsList } from './ReportPage.hooks';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { GoBack } from 'ui-kit/shared/GoBack';

export const ReportPage: FC<Props> = ({
  closingDevices,
  isLoadingClosingDevices,
  handleStartCloseDevicesByCheckingDatePoll,
  lastCloseDevicesByCheckingDatePollData,
}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  const panelsList = usePanelsList({
    closingDevices,
    isLoadingClosingDevices,
    handleStartCloseDevicesByCheckingDatePoll,
    lastCloseDevicesByCheckingDatePollData,
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

        <Alert centered type={AlertType.danger} icon={AlertIconType.warning}>
          <AlertText>
            В выгрузке присутствуют приборы с вышедшей датой поверки
          </AlertText>
        </Alert>

        <PanelsList>
          {panelsList.map((item) => (
            <PanelItem key={item.title} {...item} />
          ))}
        </PanelsList>
      </Container>

      <Footer>
        <Button size="small">Экспортировать</Button>
        <Button size="small" type="ghost">
          Отправить на email
        </Button>
      </Footer>
    </Wrapper>
  );
};
