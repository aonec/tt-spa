import { Alert } from 'ui-kit/Alert/Alert';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { ArrowRightLongIcon } from 'ui-kit/icons';
import {
  AccountNumberWrapper,
  AccountNumberWrapperCrossedOut,
  AlertContent,
  AlertTextWrapper,
  ApartmentAlertWrapper,
  HomeownerAccountChangeDate,
} from './ReplacedAccountAlert.styled';
import { ReplacedAccountAlertProps } from './ReplacedAccountAlert.types';
import { AlertIconType } from 'ui-kit/Alert/Alert.types';

export const ReplacedAccountAlert: FC<ReplacedAccountAlertProps> = ({
  recentlyReplacedAccount,
}) => {
  if (!recentlyReplacedAccount.replacedByAccount) {
    return null;
  }

  const closedDate = dayjs(recentlyReplacedAccount.closedAt).format(
    'DD.MM.YYYY',
  );

  return (
    <ApartmentAlertWrapper>
      <Alert icon={AlertIconType.info}>
        <AlertContent>
          <AlertTextWrapper>
            Смена номера лицевого счёта
            <AccountNumberWrapperCrossedOut>
              {recentlyReplacedAccount.personalAccountNumber}
            </AccountNumberWrapperCrossedOut>
            <ArrowRightLongIcon />
            <AccountNumberWrapper>
              {recentlyReplacedAccount.replacedByAccount.personalAccountNumber}
            </AccountNumberWrapper>
          </AlertTextWrapper>
          <HomeownerAccountChangeDate>{closedDate}</HomeownerAccountChangeDate>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );
};
