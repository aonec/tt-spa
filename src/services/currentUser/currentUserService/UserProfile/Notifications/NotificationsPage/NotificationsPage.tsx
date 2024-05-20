import React, { FC } from 'react';
import { ListWrapper, Wrapper } from './NotificationsPage.styled';
import { Props } from './NotificationsPage.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { ChannelItem } from './ChannelItem';
import { ChannelType } from 'api/types';

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
          {Object.values(ChannelType).map((channalType) => (
            <ChannelItem
              key={channalType}
              channel={
                channels?.find((channel) => channel.type === channalType) ||
                null
              }
              chennalType={channalType}
              handleConnect={handleConnect}
              handleDisconnect={handleDisconnect}
            />
          ))}
        </ListWrapper>
      </WithLoader>
    </Wrapper>
  );
};
