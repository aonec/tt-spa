import React, { FC } from 'react';
import { NoConnectionIcon } from 'ui-kit/icons';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { NoConnection } from './ConnectionInfo.styled';
import { ConnectionInfoProps } from './ConnectionInfo.types';

export const ConnectionInfo: FC<ConnectionInfoProps> = ({
  connection,
  isConnected,
}) => {
  const ipV4 = connection?.ipV4 || '000.000.0.0';
  const port = connection?.port || '0';
  const deviceAddress = connection?.deviceAddress || '0';

  const baseInfo = (
    <CommonInfo
      items={[
        { key: 'IP адрес вычислителя', value: ipV4 },
        { key: 'Порт', value: port },
        { key: 'Адрес прибора', value: deviceAddress },
      ]}
    />
  );
  return (
    <div>
      {!isConnected && (
        <NoConnection>
          <NoConnectionIcon />
          <div>Вычислитель не опрашивается</div>
        </NoConnection>
      )}
      {baseInfo}
    </div>
  );
};
