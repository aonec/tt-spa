import { sample } from 'effector';
import { EReportFormat, EReportType } from 'myApi';
import { displayNodeArchiveService } from './displayNodeArchiveService.models';

displayNodeArchiveService.outputs.$nodeArchiveData.on(
  displayNodeArchiveService.inputs.fetchNodeArchiveDataFx.doneData,
  (_, data) => data
);

sample({
  source: displayNodeArchiveService.outputs.$nodeId,
  clock: displayNodeArchiveService.inputs.loadNodeArchiveData,
  fn: (nodeId, payload) => ({
    NodeId: nodeId,
    ReportFormat: EReportFormat.Consumption,
    ReportType: payload.type || EReportType.Daily,
    From: payload.from,
    To: payload.to,
  }),
  target: displayNodeArchiveService.inputs.fetchNodeArchiveDataFx,
});
