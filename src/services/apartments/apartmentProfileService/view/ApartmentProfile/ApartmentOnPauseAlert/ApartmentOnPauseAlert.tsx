import { Alert } from '01/shared/ui/Alert';
import { EApartmentStatus } from 'myApi';
import React, { FC } from 'react';
import { ApartmentOnPauseAlertProps } from './ApartmentOnPauseAlert.types';
import moment from 'moment';

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

  return isPaused ? (
    <Alert color="FC525B" type="stop">
      Квартира на паузе: {from} - {to}
    </Alert>
  ) : null;
};
