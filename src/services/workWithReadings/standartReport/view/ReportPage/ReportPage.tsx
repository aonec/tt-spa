import { FC, useMemo } from 'react';
import {
  AlertText,
  BillingPeriod,
  Container,
  Date,
  Footer,
  PageTitle,
  Title,
  Wrapper,
} from './ReportPage.styled';
import { Props } from './ReportPage.types';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { Alert } from 'ui-kit/Alert';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';
import { Button } from 'ui-kit/Button';
import { PanelItemData, PanelItemStatus } from './PanelItem/PanelItem.types';
import { PanelItem } from './PanelItem';

export const ReportPage: FC<Props> = ({
  closingDevices,
  isLoadingClosingDevices,
}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  const panelsList = useMemo((): PanelItemData[] => {
    return [
      {
        title: 'Приборы с вышедшей датой поверки',
        status: closingDevices?.expiredCheckingDateCount
          ? PanelItemStatus.Error
          : PanelItemStatus.Success,
        info: closingDevices?.expiredCheckingDateCount
          ? `${closingDevices?.expiredCheckingDateCount} приборов`
          : null,
        btnText: 'Закрыть приборы',
        btnOnClick: () => void 0,
        isLoadingInfo: isLoadingClosingDevices,
        link: 'link',
      },
      {
        title: 'Квартиры на паузе',
        status: PanelItemStatus.Success,
        info: null,
        btnText: 'Дублировать показания',
        btnOnClick: () => void 0,
        isLoadingInfo: false,
      },
      {
        title: 'Приборы без показаний более 6 месяцев',
        status: closingDevices?.withoutReadingsCount
          ? PanelItemStatus.Error
          : PanelItemStatus.Success,
        info: closingDevices?.withoutReadingsCount
          ? `${closingDevices?.withoutReadingsCount} приборов`
          : null,
        btnText: 'Закрыть приборы',
        btnOnClick: () => void 0,
        isLoadingInfo: isLoadingClosingDevices,
      },
      {
        title: 'Проверить разрядность приборов',
        status: PanelItemStatus.Info,
        info: null,
        btnText: 'Создать задачи',
        btnOnClick: () => void 0,
        isLoadingInfo: false,
      },
    ];
  }, [isLoadingClosingDevices, closingDevices]);

  return (
    <Wrapper>
      <Container>
        <PageTitle>Стандартный отчет</PageTitle>

        <BillingPeriod>
          <Title>Расчетный период</Title>
          <Date>{uppercaseDate}</Date>
        </BillingPeriod>

        <Alert centered type={AlertType.danger} icon={AlertIconType.warning}>
          <AlertText>
            В выгрузке присутствуют приборы с вышедшей датой поверки
          </AlertText>
        </Alert>

        {panelsList.map((item) => (
          <PanelItem key={item.title} {...item} />
        ))}
      </Container>

      <Footer>
        <Button size="small" disabled>
          Экспортировать
        </Button>
        <Button size="small" type="ghost">
          Отправить на email
        </Button>
      </Footer>
    </Wrapper>
  );
};
