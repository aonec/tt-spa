import { ChannelResponse, ChannelType } from 'api/types';

export type Props = {
  channel: ChannelResponse | null;
  chennalType: ChannelType;
  handleConnect: () => void;
  handleDisconnect: (channelId: string) => void;
};
