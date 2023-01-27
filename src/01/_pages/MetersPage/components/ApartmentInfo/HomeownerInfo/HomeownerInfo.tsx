import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { InfoIcon } from 'ui-kit/icons';
import {
  AccountNumberTitle,
  AccountNumberWrapper,
  DateWrapper,
  EditDateWrapper,
  HomeownerInfoWrapper,
  InfoIconWrapper,
  PaymentCodeWrapper,
  PhoneNumberWrapper,
  Wrapper,
} from './HomeownerInfo.styled';
import { HomeownerInfoProps } from './HomeownerInfo.types';

export const HomeownerInfo: FC<HomeownerInfoProps> = ({
  apartment,
  currentPersonalNumberId,
}) => {
  const { homeownerAccounts } = apartment;
  if (!homeownerAccounts) {
    return null;
  }

  const homeowner = homeownerAccounts.find(
    (account) => account.id === currentPersonalNumberId,
  );
  if (!homeowner) {
    return null;
  }

  const previousHomeowner = homeownerAccounts.find(
    (account) => account.replacedByAccount?.id === homeowner.id,
  );

  const { name, personalAccountNumber, openAt, paymentCode, phoneNumber } =
    homeowner;

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
          {previousHomeowner && (
            <InfoIconWrapper>
              <Tooltip
                color={'#272F5A'}
                placement="topLeft"
                title={
                  <>
                    Основной лицевой счёт был изменен{' '}
                    {previousHomeowner.personalAccountNumber}
                    <div>({previousHomeowner.name})</div>
                    <EditDateWrapper>
                      Дата изменения:{' '}
                      {moment(previousHomeowner.closedAt).format('DD.MM.YYYY')}
                    </EditDateWrapper>
                  </>
                }
              >
                <InfoIcon />
              </Tooltip>
            </InfoIconWrapper>
          )}
        </AccountNumberTitle>
        <div className="account-number-info">
          {personalAccountNumber}{' '}
          <DateWrapper>
            (открыт с<Tooltip title={preparedDate}> {preparedDate} </Tooltip>)
          </DateWrapper>
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
