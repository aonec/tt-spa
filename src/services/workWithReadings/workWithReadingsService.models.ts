import { createEvent, createStore } from 'effector';

const handleReportTypeModalOpen = createEvent<boolean>();

const $isReportTypeModalOpen = createStore(false).on(
  handleReportTypeModalOpen,
  (_, data) => data,
);

export const workWithReadingsService = {
  inputs: { handleReportTypeModalOpen },
  outputs: { $isReportTypeModalOpen },
};
