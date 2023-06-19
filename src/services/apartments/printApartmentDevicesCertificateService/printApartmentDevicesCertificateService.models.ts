import { createDomain, guard } from 'effector';
import { createGate } from 'effector-react';
import { HomeownerCertificateResponse } from 'myApi';
import { getHomeownerCertificate } from './printApartmentDevicesCertificateService.api';

const domain = createDomain('printApartmentDevicesCertificateService');

const getIssueCertificateButtonClicked = domain.createEvent();
const closeIssueCertificateModalButtonClicked = domain.createEvent();
const printIssueSertificateButtonClicked = domain.createEvent<number>();

const fetchHomeownerCertificateFx = domain.createEffect<
  string,
  HomeownerCertificateResponse
>(getHomeownerCertificate);

const HomeownerCerificateGate = createGate<{ id: string | null }>();

const $homeownerCertificate =
  domain.createStore<HomeownerCertificateResponse | null>(null);
const $isPrintIssueCertificateModalOpen = domain.createStore(false);

fetchHomeownerCertificateFx.use(getHomeownerCertificate);

$isPrintIssueCertificateModalOpen
  .on(getIssueCertificateButtonClicked, () => true)
  .reset(closeIssueCertificateModalButtonClicked);

$homeownerCertificate.on(
  fetchHomeownerCertificateFx.doneData,
  (_, certificate) => certificate,
);

guard({
  source: HomeownerCerificateGate.state.map((values) => values.id),
  clock: HomeownerCerificateGate.open,
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
