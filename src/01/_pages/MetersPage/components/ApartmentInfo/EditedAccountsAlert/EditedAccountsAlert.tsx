import { Alert } from '01/shared/ui/Alert/Alert';
import moment from 'moment';
import React, { FC } from 'react';
import {
  AccountNumberWrapper,
  AlertContent,
  AlertTextWrapper,
  ApartmentAlertWrapper,
  HomeownerAccountChangeDate,
} from './EditedAccountsAlert.styled';
import { EditedAccountsAlertProps } from './EditedAccountsAlert.types';

export const EditedAccountsAlert: FC<EditedAccountsAlertProps> = ({
  recentlyEditedAccount,
}) => {
  const { editedAt, personalAccountNumber } = recentlyEditedAccount;
  const preparedDate = moment(editedAt).format('DD.MM.YYYY');
  return (
    <ApartmentAlertWrapper>
      <Alert type="info">
        <AlertContent>
          <AlertTextWrapper>
            Лицевой счёт квартиры был отредактирован{' '}
            <AccountNumberWrapper>{personalAccountNumber}</AccountNumberWrapper>{' '}
          </AlertTextWrapper>
          <HomeownerAccountChangeDate>
            Дата изменения: {preparedDate}
          </HomeownerAccountChangeDate>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );
};
