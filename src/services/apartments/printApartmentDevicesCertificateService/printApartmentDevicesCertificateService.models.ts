import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { HomeownerCertificateResponse } from 'api/types';
import { getHomeownerCertificate } from './printApartmentDevicesCertificateService.api';

const getIssueCertificateButtonClicked = createEvent();
const closeIssueCertificateModalButtonClicked = createEvent();
const printIssueSertificateButtonClicked = createEvent<number>();

const fetchHomeownerCertificateFx = createEffect<
  string,
  HomeownerCertificateResponse
>(getHomeownerCertificate);

const HomeownerCerificateGate = createGate<{ id: string | null }>();

const $isPrintIssueCertificateModalOpen = createStore(false)
  .on(printIssueSertificateButtonClicked, () => true)
  .reset(closeIssueCertificateModalButtonClicked);

const $homeownerCertificate = createStore<HomeownerCertificateResponse | null>(
  null,
).on(fetchHomeownerCertificateFx.doneData, (_, certificate) => certificate);

sample({
  clock: HomeownerCerificateGate.open,
  source: HomeownerCerificateGate.state.map((values) => values.id || null),
  filter: Boolean,
  target: fetchHomeownerCertificateFx,
});

const $isLoading = fetchHomeownerCertificateFx.pending;

export const printApartmentDevicesCertificateService = {
  inputs: {
    getIssueCertificateButtonClicked,
    closeIssueCertificateModalButtonClicked,
    printIssueSertificateButtonClicked,
  },
  outputs: {
    $homeownerCertificate,
    $isPrintIssueCertificateModalOpen,
    $isLoading,
  },
  gates: { HomeownerCerificateGate },
};
