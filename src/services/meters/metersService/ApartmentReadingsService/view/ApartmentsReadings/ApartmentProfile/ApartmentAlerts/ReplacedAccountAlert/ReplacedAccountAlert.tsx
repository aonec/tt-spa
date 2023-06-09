import React, { FC } from 'react';
import moment from 'moment';
import { Alert } from 'ui-kit/Alert/Alert';
import {
  AccountNumberWrapper,
  AlertContent,
  AlertTextWrapper,
  ApartmentAlertWrapper,
  HomeownerAccountChangeDate,
} from './ReplacedAccountAlert.styled';
import { ReplacedAccountAlertProps } from './ReplacedAccountAlert.types';

export const ReplacedAccountAlert: FC<ReplacedAccountAlertProps> = ({
  recentlyReplacedAccount,
}) => {
  if (!recentlyReplacedAccount.replacedByAccount) {
    return null;
  }
  const closedDate = moment(recentlyReplacedAccount.closedAt).format(
    'DD.MM.YYYY',
  );

  return (
    <ApartmentAlertWrapper>
      <Alert>
        <AlertContent>
          <AlertTextWrapper>
            Лицевой счет
            <AccountNumberWrapper>
              {recentlyReplacedAccount.personalAccountNumber}
            </AccountNumberWrapper>
            заменен на
            <AccountNumberWrapper>
              {recentlyReplacedAccount.replacedByAccount.personalAccountNumber}
            </AccountNumberWrapper>
          </AlertTextWrapper>
          <HomeownerAccountChangeDate>
            Дата изменения: {closedDate}
          </HomeownerAccountChangeDate>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );
};
