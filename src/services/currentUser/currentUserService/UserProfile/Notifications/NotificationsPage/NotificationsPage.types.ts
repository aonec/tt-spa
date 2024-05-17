import { ChannelResponse } from 'api/types';

export type Props = {
  notifications: ChannelResponse[];
  isLoading: boolean;
  handleConnect: () => void;
};
