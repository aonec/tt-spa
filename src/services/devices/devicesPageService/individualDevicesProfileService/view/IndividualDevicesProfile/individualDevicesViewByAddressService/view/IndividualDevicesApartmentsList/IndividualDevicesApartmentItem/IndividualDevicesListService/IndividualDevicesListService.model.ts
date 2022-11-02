import { createDomain } from 'effector';

const domain = createDomain('individualDevicesListService');

const toggleBlock = domain.createEvent<number>();

const $openedBlockId = domain
  .createStore<number | null>(null)
  .on(toggleBlock, (prevId, id) => (prevId === id ? null : id));

export const individualDevicesListService = {
  inputs: { toggleBlock },
  outputs: { $openedBlockId },
};
