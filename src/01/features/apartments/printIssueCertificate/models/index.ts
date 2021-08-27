import { createStore, createEvent } from 'effector';

export const $isPrintIssueCertificateModalOpen = createStore(false);

export const getIssueCertificateButtonClicked = createEvent();
export const closeIssueCertificateModalButtonClicked = createEvent();
export const printIssueSertificateButtonClicked = createEvent<number>();
