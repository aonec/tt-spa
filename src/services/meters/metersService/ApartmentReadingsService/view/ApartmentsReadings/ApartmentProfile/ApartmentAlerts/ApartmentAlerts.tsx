import React, { FC } from 'react';
import {
  AlertContent,
  AlertLink,
  ApartmentAlertWrapper,
} from './ApartmentAlerts.styled';
import { ApartmentAlertsProps } from './ApartmentAlerts.types';
import { EApartmentStatus } from 'myApi';
import { Alert } from '01/shared/ui/Alert/Alert';
import moment from 'moment';

export const ApartmentAlerts: FC<ApartmentAlertsProps> = ({ apartment }) => {
  const isPaused = apartment.status === EApartmentStatus.Pause;

  const pausedAlert = isPaused && (
    <ApartmentAlertWrapper>
      <Alert type="stop" color="FC525B">
        <AlertContent>
          <div>
            Квартира на паузе до{' '}
            {moment(apartment.stoppedTo).format('DD.MM.YYYY')}
          </div>
          <AlertLink
            // onClick={cancelPauseApartment}
            className="ant-btn-link"
          >
            Снять с паузы
          </AlertLink>
        </AlertContent>
      </Alert>
    </ApartmentAlertWrapper>
  );

  return <div>{pausedAlert}</div>;
};
