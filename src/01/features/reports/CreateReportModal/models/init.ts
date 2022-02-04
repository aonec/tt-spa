import { forward } from 'effector';
import { createReportInputs, createReportOutputs } from '.';
import { reportsInputs } from '../../models';

const { openModalButtonClicked } = createReportInputs;
const { $isModalOpen } = createReportOutputs;

$isModalOpen.on(openModalButtonClicked, () => true);

forward({
  from: reportsInputs.createReportButtonClicked,
  to: openModalButtonClicked,
});
