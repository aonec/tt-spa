import { getHomeownerCertificate } from './../../../../_api/homeowners';
import {
  getIssueCertificateButtonClicked,
  closeIssueCertificateModalButtonClicked,
  $homeownerCertificatre,
  fetchHomeownerCertificate,
  HomeownerCerificateGate,
} from './index';
import { $isPrintIssueCertificateModalOpen } from '.';
import { forward } from 'effector';

fetchHomeownerCertificate.use(getHomeownerCertificate);

$isPrintIssueCertificateModalOpen
  .on(getIssueCertificateButtonClicked, () => true)
  .reset(closeIssueCertificateModalButtonClicked);

$homeownerCertificatre.on(
  fetchHomeownerCertificate.doneData,
  (_, certificate) => certificate
);

forward({
  from: HomeownerCerificateGate.open.map((values) => values.id),
  to: fetchHomeownerCertificate,
});
