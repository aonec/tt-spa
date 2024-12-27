import React, { FC } from 'react';
import {
  AlertText,
  BillingPeriod,
  Blue,
  Container,
  Date,
  Footer,
  Info,
  LeftBlock,
  PageTitle,
  Panel,
  PanelTitle,
  RightBlock,
  Title,
  Wrapper,
} from './ReportPage.styled';
import { Props } from './ReportPage.types';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { Alert } from 'ui-kit/Alert';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';
import {
  ChevronActiveIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from 'ui-kit/icons';
import { ChevronIconRight } from 'services/workingRanges/WorkingRangeTab/WorkingRangeTab.styled';
import { Button } from 'ui-kit/Button';
import { Skeleton } from 'antd';

export const ReportPage: FC<Props> = ({
  closingDevices,
  isLoadingClosingDevices,
}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

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

        <Panel>
          <LeftBlock>
            {closingDevices?.expiredCheckingDateCount ? (
              <XCircleIcon />
            ) : (
              <ChevronActiveIcon />
            )}
            <PanelTitle> Приборы с вышедшей датой поверки</PanelTitle>
          </LeftBlock>
          <RightBlock>
            {isLoadingClosingDevices ? (
              <Skeleton.Input active size="small" />
            ) : (
              <Info>
                {closingDevices?.expiredCheckingDateCount || 0} приборов
              </Info>
            )}
            <Blue>Закрыть приборы</Blue>
            <ChevronIconRight />
          </RightBlock>
        </Panel>

        <Panel>
          <LeftBlock>
            <XCircleIcon />
            <PanelTitle> Квартиры на паузе</PanelTitle>
          </LeftBlock>
          <RightBlock>
            <Info /> <Blue>Дублировать показания</Blue>
          </RightBlock>
        </Panel>

        <Panel>
          <LeftBlock>
            {closingDevices?.withoutReadingsCount ? (
              <XCircleIcon />
            ) : (
              <ChevronActiveIcon />
            )}
            <PanelTitle> Приборы без показаний более 6 месяцев </PanelTitle>
          </LeftBlock>
          <RightBlock>
            {isLoadingClosingDevices ? (
              <Skeleton.Input active size="small" />
            ) : (
              <Info>
                ({closingDevices?.withoutReadingsCount || 0}) приборов
              </Info>
            )}{' '}
            <Blue>Закрыть приборы</Blue>
          </RightBlock>
        </Panel>

        <Panel>
          <LeftBlock>
            <QuestionMarkCircleIcon />
            <PanelTitle> Проверить разрядность приборов </PanelTitle>
          </LeftBlock>
          <RightBlock>
            <Info />
            <Blue>Создать задачи</Blue>
          </RightBlock>
        </Panel>
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
