import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { ChannelResponse } from 'api/types';

export const notifiactionsQuery = createQuery<void, ChannelResponse[]>({
  handler: () => axios.get(`Notifications/Channels`),
});
