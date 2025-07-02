import React, { FC, useMemo } from 'react';
import {
  AlertContent,
  AlertLink,
  ApartmentAlertWrapper,
  ArrowRightSC,
  HomeownerAccountChangeDate,
} from './ApartmentAlerts.styled';
import { ApartmentAlertsProps } from './ApartmentAlerts.types';
import { EApartmentStatus } from 'api/types';
import { Alert } from 'ui-kit/Alert/Alert';
import dayjs from 'api/dayjs';
import { Link } from 'react-router-dom';
import { ReplacedAccountAlert } from './ReplacedAccountAlert';
import { EditedAccountsAlert } from './EditedAccountsAlert';
import { checkIsHomeownerAccountRecentlyModified } from './ApartmentAlerts.utils';

export const ApartmentAlerts: FC<ApartmentAlertsProps> = ({
  apartment,
  handleCancelPauseApartment,
  isPermitionToApartmentStatusPatch,
}) => {
  const isPaused = apartment.status === EApartmentStatus.Pause;

  const apartmentTaskId = apartment?.activeTaskIds?.[0];

  const isApartmentTaskExist = Boolean(apartmentTaskId);

  const homeownerAccounts = useMemo(
    () => apartment?.homeownerAccounts || [],
    [apartment],
  );

  const recentlyReplacedAccounts = homeownerAccounts.filter(
    (account) =>
      account.replacedByAccount &&
      dayjs().diff(dayjs(account.closedAt), 'month') < 3,
  );

  const openedHomeownerAccounts = useMemo(
    () => homeownerAccounts.filter((account) => !account.closedAt),
    [homeownerAccounts],
  );

  const recentlyEditedAccounts = openedHomeownerAccounts.filter(
    (account) =>
      account.editedAt && dayjs().diff(dayjs(account.editedAt), 'month') < 3,
  );

  const recentlyModifiedApartmentPersonalAccounts =
    openedHomeownerAccounts.filter(checkIsHomeownerAccountRecentlyModified);

  const pausedAlert = isPaused && (
    <ApartmentAlertWrapper>
      <Alert type="danger" icon="stop">
        <AlertContent>
          <div>
            Квартира на паузе до{' '}
            {dayjs(apartment.stoppedTo).format('DD.MM.YYYY')}
          </div>
          {isPermitionToApartmentStatusPatch && (
            <AlertLink onClick={handleCancelPauseApartment}>
              Снять с паузы
            </AlertLink>
          )}
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );

  const apartmentTaskAlert = isApartmentTaskExist && (
    <ApartmentAlertWrapper>
      <Alert type="danger" icon="warning">
        <AlertContent>
          <div>
            По данной квартире есть незакрытая задача. Возможность вводить
            показания появится после закрытия задачи.
          </div>
          <Link to={`/tasks/profile/${apartmentTaskId}`}>
            <AlertLink>
              Перейти к задаче
              <ArrowRightSC className="arrow-right" />
            </AlertLink>
          </Link>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );

  const replacedAccountsAlert = useMemo(
    () =>
      recentlyReplacedAccounts.map((account) => (
        <ReplacedAccountAlert
          key={account.id}
          recentlyReplacedAccount={account}
        />
      )),
    [recentlyReplacedAccounts],
  );

  const editedAccountsAlert = useMemo(
    () =>
      recentlyEditedAccounts.map((account) => (
        <EditedAccountsAlert key={account.id} recentlyEditedAccount={account} />
      )),
    [recentlyEditedAccounts],
  );

  const apartmentHomeownerAcconutChangeAlerts =
    recentlyModifiedApartmentPersonalAccounts?.map((homeownerAccount) => {
      const changeDateInfo = `Дата изменения: ${dayjs(
        homeownerAccount?.openAtFact,
      ).format('DD.MM.YYYY')}`;

      return (
        <ApartmentAlertWrapper key={homeownerAccount.id}>
          <Alert icon="info">
            <AlertContent>
              <div>
                Добавлен новый номер лицевого счёта квартиры{' '}
                {homeownerAccount.personalAccountNumber} (
                {homeownerAccount.name})
              </div>
              <HomeownerAccountChangeDate>
                {changeDateInfo}
              </HomeownerAccountChangeDate>
            </AlertContent>
          </Alert>
        </ApartmentAlertWrapper>
      );
    });

  return (
    <div>
      {pausedAlert}
      {apartmentTaskAlert}
      {replacedAccountsAlert}
      {editedAccountsAlert}
      {apartmentHomeownerAcconutChangeAlerts}
    </div>
  );
};
