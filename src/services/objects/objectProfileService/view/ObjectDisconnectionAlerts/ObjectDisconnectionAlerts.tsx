import { Alert } from 'ui-kit/Alert/Alert';
import moment from 'moment';
import React, { FC } from 'react';
import { actResourceNamesLookup } from 'utils/actResourceNamesLookup';
import { AlertContent, AlertWrapper } from './ObjectDisconnectionAlerts.styled';
import { ObjectDisconnectionAlertsProps } from './ObjectDisconnectionAlerts.types';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';

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
            <ContextMenuButton size="small" />
          </AlertContent>
        </Alert>
      </AlertWrapper>
    );
  });
  return <>{disconnectionsAlert}</>;
};
