import { Alert } from '01/shared/ui/Alert/Alert';
import moment from 'moment';
import React, { FC } from 'react';
import {
  AccountNumberWrapper,
  AlertContent,
  AlertTextWrapper,
  ApartmentAlertWrapper,
} from './ReplacedAccountAlert.styled';
import { ReplacedAccountAlertProps} from './ReplacedAccountAlert.types';

export const ReplacedAccountAlert: FC<ReplacedAccountAlertProps> = ({
  recentlyReplacedAccount,
}) => {
  if (!recentlyReplacedAccount.replacedByAccount) {
    return null;
  }
  const closedDate = moment(recentlyReplacedAccount.closedAt).format(
    'DD.MM.YYYY'
  );

  return (
    <ApartmentAlertWrapper>
      <Alert type="info">
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
          Дата изменения: {closedDate}
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );
};
