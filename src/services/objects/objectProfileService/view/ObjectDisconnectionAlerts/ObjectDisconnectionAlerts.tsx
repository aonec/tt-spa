import { Alert } from '01/shared/ui/Alert/Alert';
import moment from 'moment';
import React, { FC } from 'react';
import { InvisibleContextMenuButton } from 'ui-kit/InvisibleContextMenuButton';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { AlertContent, AlertWrapper } from './ObjectDisconnectionAlerts.styled';
import { ObjectDisconnectionAlertsProps } from './ObjectDisconnectionAlerts.types';

export const ObjectDisconnectionAlerts: FC<ObjectDisconnectionAlertsProps> = ({
  disconnections,
}) => {
  const disconnectionsAlert = disconnections.map((disconnection) => {
    const resourceName = actResourceNamesLookup[disconnection.resource];
    const entDate = moment(disconnection.endDate).format('DD.MM.YYYY');

    const disconnectionType = disconnection.disconnectingType;
    const disconnectionTypeDescription = disconnectionType?.description;

    if (!disconnectionTypeDescription) {
      return null;
    }

    return (
      <AlertWrapper>
        <Alert type="stop" iconColor="#189ee9">
          <AlertContent>
            <div>
              На объекте отключение ресурса {resourceName}, тип:
              {disconnectionTypeDescription}, до {entDate}
            </div>
            <InvisibleContextMenuButton />
          </AlertContent>
        </Alert>
      </AlertWrapper>
    );
  });
  return <>{disconnectionsAlert}</>;
};
