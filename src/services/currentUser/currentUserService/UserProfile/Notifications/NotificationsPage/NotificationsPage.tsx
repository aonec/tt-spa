import React, { FC } from 'react';
import { Props } from './NotificationsPage.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ChannelItem } from './ChannelItem';
import { ChannelType } from 'api/types';
import { ListWrapper, Wrapper } from './NotificationsPage.styled';

export const NotificationsPage: FC<Props> = ({
  channels,
  isLoading,
  handleConnect,
  handleDisconnect,
}) => {
  return (
    <Wrapper>
      <WithLoader isLoading={isLoading}>
        <ListWrapper>
          {Object.values(ChannelType).map((channelType) => (
            <ChannelItem
              key={channelType}
              channel={
                channels?.find((channel) => channel.type === channelType) ||
                null
              }
              chennalType={channelType}
              handleConnect={handleConnect}
              handleDisconnect={handleDisconnect}
            />
          ))}
        </ListWrapper>
      </WithLoader>
    </Wrapper>
  );
};
