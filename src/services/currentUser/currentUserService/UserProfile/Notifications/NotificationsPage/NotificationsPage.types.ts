import { ChannelResponse } from 'api/types';

export type Props = {
  channels: ChannelResponse[];
  isLoading: boolean;
  handleConnect: () => void;
};
