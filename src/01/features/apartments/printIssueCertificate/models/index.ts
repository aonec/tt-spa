import { createGate } from 'effector-react';
import { createStore, createEvent, createEffect } from 'effector';
import { HomeownerCertificateResponse } from '../../../../../api/types';

export const $homeownerCertificatre = createStore<HomeownerCertificateResponse | null>(
  null
);
export const $isPrintIssueCertificateModalOpen = createStore(false);

export const getIssueCertificateButtonClicked = createEvent();
export const closeIssueCertificateModalButtonClicked = createEvent();
export const printIssueSertificateButtonClicked = createEvent<number>();

export const fetchHomeownerCertificate = createEffect<
  number,
  HomeownerCertificateResponse
>();

export const HomeownerCerificateGate = createGate<{ id: number }>();
