import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { InfoIcon } from 'ui-kit/icons';
import {
  AccountNumberTitle,
  AccountNumberWrapper,
  DateWrapper,
  HomeownerInfoWrapper,
  InfoIconWrapper,
  PaymentCodeWrapper,
  PhoneNumberWrapper,
  Wrapper,
} from './HomeownerInfo.styled';
import { HomeownerInfoProps } from './HomeownerInfo.types';

export const HomeownerInfo: FC<HomeownerInfoProps> = ({
  apartment,
  currentPersonalNumberIndex,
}) => {
  const { homeownerAccounts } = apartment;
  if (!homeownerAccounts) {
    return null;
  }

  const homeowner = homeownerAccounts[currentPersonalNumberIndex];
  const {
    name,
    personalAccountNumber,
    openAt,
    paymentCode,
    phoneNumber,
  } = homeowner;

  const preparedDate = moment(openAt).format('DD.MM.YYYY');

  return (
    <Wrapper>
      <HomeownerInfoWrapper>
        <div className="title">Собственник</div>
        <Tooltip title={name}>{name}</Tooltip>
      </HomeownerInfoWrapper>

      <AccountNumberWrapper>
        <AccountNumberTitle>
          <div className="title">Лицевой счет</div>
          <InfoIconWrapper>
            <Tooltip
              color={'#272F5A'}
              placement="topLeft"
              title={`Основной лицевого счёта квартиры был изменен 1243455 (Константинопольский К.К.)`}
            >
              <InfoIcon />
            </Tooltip>
          </InfoIconWrapper>
        </AccountNumberTitle>
        <div className="account-number-info">
          {personalAccountNumber}{' '}
          <DateWrapper>(открыт с {preparedDate})</DateWrapper>
        </div>
      </AccountNumberWrapper>

      <PaymentCodeWrapper>
        <div className="title">Платежный код</div>
        <Tooltip title={paymentCode}>{paymentCode}</Tooltip>
      </PaymentCodeWrapper>

      {phoneNumber && (
        <PhoneNumberWrapper>
          <div className="title">Телефон</div>
          {phoneNumber}
        </PhoneNumberWrapper>
      )}
    </Wrapper>
  );
};
