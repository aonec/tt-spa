import React, { FC } from 'react';
import { ListWrapper, Wrapper } from './NotificationsPage.styled';
import { Props } from './NotificationsPage.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Button } from 'ui-kit/Button';
import { ChannelItem } from './ChannelItem';

export const NotificationsPage: FC<Props> = ({
  channels,
  isLoading,
  handleConnect,
}) => {
  return (
    <Wrapper>
      <WithLoader isLoading={isLoading}>
        {!channels.length && (
          <Button onClick={handleConnect}>Подключить уведомление</Button>
        )}
        {Boolean(channels.length) && (
          <ListWrapper>
            {channels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                handleConnect={handleConnect}
              />
            ))}
          </ListWrapper>
        )}
      </WithLoader>
    </Wrapper>
  );
};
