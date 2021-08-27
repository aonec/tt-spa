import {
  getIssueCertificateButtonClicked,
  closeIssueCertificateModalButtonClicked,
  printIssueSertificateButtonClicked,
} from './index';
import { $isPrintIssueCertificateModalOpen } from '.';

$isPrintIssueCertificateModalOpen
  .on(getIssueCertificateButtonClicked, () => true)
  .reset(closeIssueCertificateModalButtonClicked);

printIssueSertificateButtonClicked.watch(console.log);
