import { getHomeownerCertificate } from './../../../../_api/homeowners';
import {
  getIssueCertificateButtonClicked,
  closeIssueCertificateModalButtonClicked,
  $homeownerCertificatre,
  fetchHomeownerCertificate,
  HomeownerCerificateGate,
} from './index';
import { $isPrintIssueCertificateModalOpen } from '.';
import { guard } from 'effector';

fetchHomeownerCertificate.use(getHomeownerCertificate);

$isPrintIssueCertificateModalOpen
  .on(getIssueCertificateButtonClicked, () => true)
  .reset(closeIssueCertificateModalButtonClicked);

$homeownerCertificatre.on(
  fetchHomeownerCertificate.doneData,
  (_, certificate) => certificate
);

guard({
  source: HomeownerCerificateGate.state.map((values) => values.id),
  clock: HomeownerCerificateGate.state,
  filter: Boolean,
  target: fetchHomeownerCertificate,
});
