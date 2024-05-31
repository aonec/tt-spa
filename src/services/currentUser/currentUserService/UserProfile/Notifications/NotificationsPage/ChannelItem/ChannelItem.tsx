import React, { FC, useCallback } from 'react';
import {
  ConnectedBadge,
  PanelContent,
  Title,
  Wrapper,
} from './ChannelItem.styled';
import { Props } from './ChannelItem.types';
import { OkIcon } from 'ui-kit/icons';
import { Switch } from 'antd';

export const ChannelItem: FC<Props> = ({
  channel,
  handleConnect,
  chennalType,
  handleDisconnect,
}) => {
  const handleClickSwitch = useCallback(() => {
    if (!channel) return handleConnect();

    handleDisconnect(channel.id);
  }, [channel, handleConnect, handleDisconnect]);

  return (
    <Wrapper>
      <Title>Уведомления {chennalType}</Title>
      <PanelContent>
        {channel && (
          <ConnectedBadge>
            <OkIcon />
            Подключено
          </ConnectedBadge>
        )}
        <Switch checked={Boolean(channel)} onClick={handleClickSwitch} />
      </PanelContent>
    </Wrapper>
  );
};
