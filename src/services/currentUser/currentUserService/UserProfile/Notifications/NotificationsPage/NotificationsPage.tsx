import React, { FC } from 'react';
import { Wrapper } from './NotificationsPage.styled';
import { Props } from './NotificationsPage.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Button } from 'ui-kit/Button';

export const NotificationsPage: FC<Props> = ({
  notifications,
  isLoading,
  handleConnect,
}) => {
  //   console.log(notifications);

  return (
    <Wrapper>
      <WithLoader isLoading={isLoading}>
        {!notifications.length && (
          <Button onClick={handleConnect}>Подключить уведомление</Button>
        )}
      </WithLoader>
    </Wrapper>
  );
};
