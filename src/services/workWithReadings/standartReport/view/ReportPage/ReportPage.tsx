import React, { FC } from 'react';
import {
  AlertText,
  BillingPeriod,
  Blue,
  Date,
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
import { QuestionMarkCircleIcon, XCircleIcon } from 'ui-kit/icons';
import { ChevronIconRight } from 'services/workingRanges/WorkingRangeTab/WorkingRangeTab.styled';

export const ReportPage: FC<Props> = ({}) => {
  const date = dayjs().format('MMMM YYYY');

  const uppercaseDate = date
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

  return (
    <Wrapper>
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
          <XCircleIcon />
          <PanelTitle> Приборы с вышедшей датой поверки</PanelTitle>
        </LeftBlock>
        <RightBlock>
          <Info>7 приборов</Info> <ChevronIconRight />
        </RightBlock>
      </Panel>

      <Panel>
        <LeftBlock>
          <XCircleIcon />
          <PanelTitle> Квартиры на паузе</PanelTitle>
        </LeftBlock>
        <RightBlock>
          <Info>26.10.2023</Info> <Blue>Дублировать показания</Blue>
        </RightBlock>
      </Panel>

      <Panel>
        <LeftBlock>
          <XCircleIcon />
          <PanelTitle> Приборы без показаний более 4 месяцев </PanelTitle>
        </LeftBlock>
        <RightBlock>
          <Info>10 приборов</Info> <Blue>Закрыть приборы</Blue>
        </RightBlock>
      </Panel>

      <Panel>
        <LeftBlock>
          <QuestionMarkCircleIcon />
          <PanelTitle> Проверить разрядность приборов </PanelTitle>
        </LeftBlock>
        <RightBlock></RightBlock>
      </Panel>
    </Wrapper>
  );
};
