import { sample } from 'effector';
import { EReportFormat } from 'myApi';
import { displayNodeArchiveService } from './displayNodeArchiveService.models';

displayNodeArchiveService.outputs.$nodeArchiveData.on(
  displayNodeArchiveService.inputs.fetchNodeArchiveDataFx.doneData,
  (_, data) => data
);

sample({
  source: displayNodeArchiveService.outputs.$node,
  clock: displayNodeArchiveService.inputs.loadNodeArchiveData,
  fn: (node, payload) => ({
    NodeId: node?.id!,
    ReportFormat: EReportFormat.Consumption,
    ReportType: 'Daily',
    From: payload.from,
    To: payload.to,
  }),
  target: displayNodeArchiveService.inputs.fetchNodeArchiveDataFx,
});
