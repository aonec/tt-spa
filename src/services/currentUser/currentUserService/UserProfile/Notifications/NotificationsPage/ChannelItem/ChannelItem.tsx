import React, { FC } from 'react';
import { Title, Wrapper } from './ChannelItem.styled';
import { Props } from './ChannelItem.types';
import { Switch } from 'antd';

export const ChannelItem: FC<Props> = ({ channel, handleConnect }) => {
  return (
    <Wrapper>
      <Title>{channel.type}</Title>
      <Switch onChange={(checked) => checked && handleConnect()} />
    </Wrapper>
  );
};
