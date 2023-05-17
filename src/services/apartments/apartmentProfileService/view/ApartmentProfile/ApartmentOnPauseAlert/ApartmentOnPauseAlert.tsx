import { Alert } from 'ui-kit/Alert';
import { EApartmentStatus } from 'myApi';
import React, { FC } from 'react';
import { ApartmentOnPauseAlertProps } from './ApartmentOnPauseAlert.types';
import moment from 'moment';
import { AlertIconType, AlertType } from 'ui-kit/Alert/Alert.types';

export const ApartmentOnPauseAlert: FC<ApartmentOnPauseAlertProps> = ({
  apartment,
}) => {
  const { stoppedFrom, stoppedTo } = apartment || {};
  const isPaused = apartment?.status === EApartmentStatus.Pause;

  if (!apartment || !isPaused || !stoppedFrom || !stoppedTo) {
    return null;
  }

  const from = moment(apartment.stoppedFrom).format('MMMM YYYY');
  const to = moment(apartment.stoppedTo).format('MMMM YYYY');

  if (!isPaused) {
    return null;
  }

  return (
    <Alert type={AlertType.danger} icon={AlertIconType.stop}>
      Квартира на паузе: {from} - {to}
    </Alert>
  );
};
