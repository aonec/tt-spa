import { Alert } from 'ui-kit/Alert/Alert';
import dayjs from 'api/dayjs';
import React, { FC } from 'react';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { AlertContent, AlertWrapper } from './ObjectDisconnectionAlerts.styled';
import { ObjectDisconnectionAlertsProps } from './ObjectDisconnectionAlerts.types';

export const ObjectDisconnectionAlerts: FC<ObjectDisconnectionAlertsProps> = ({
  disconnections,
}) => {
  const disconnectionsAlert = disconnections.map((disconnection) => {
    const resourceName = actResourceNamesLookup[disconnection.resource];
    const endDate = dayjs(disconnection.endDate).format('DD.MM.YYYY');

    const dateText = disconnection.endDate ? ` до ${endDate}` : '';

    const disconnectionType = disconnection.disconnectingType;
    const disconnectionTypeDescription = disconnectionType?.description;

    if (!disconnectionTypeDescription) {
      return null;
    }

    return (
      <AlertWrapper key={disconnection.id}>
        <Alert type="default" icon="stop">
          <AlertContent>
            <div>
              На объекте отключение ресурса {resourceName}
              {dateText}, тип: {disconnectionTypeDescription}
            </div>
          </AlertContent>
        </Alert>
      </AlertWrapper>
    );
  });

  return <>{disconnectionsAlert}</>;
};
